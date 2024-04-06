import {
  Assignment,
  AstNode,
  Block,
  FunctionDeclaration,
  FunctionLiteral,
  Identifier,
  BasicLiteral,
  MethodExpression,
  PrimaryExprArgument,
  PrimaryExprSelector,
  Sequence,
  ShortVarDecl,
  SourceFile,
  ExpressionStatement,
  BinaryOperatorExpression,
  GoStatement,
  SendStatement,
  UnaryExpression,
  Type,
  ChannelType,
  TypeName,
  VariableDeclaration
} from '../common/astNode'
import { Instruction, Goto, Call, Ldc, Ld } from '../common/instruction'
import { compile_time_environment_position, is_boolean, is_number } from '../vm/utils'
import { Memory } from '../vm/memory'
import { GoLit, GoTag } from '../common/types'
import { error } from 'console'

// compile-time frames only need synbols (keys), no values
const global_compile_frame = Object.keys(new Memory().primitive_object)
const global_compile_environment = [global_compile_frame]

const compile_time_environment_extend = (vs: string[], e: string[][]) => {
  return e.concat([vs])
}

let wc: number
let instrs: Instruction[]

const scan = (comp: AstNode): string[] =>
  comp.tag === 'seq'
    ? (comp as Sequence).stmts.reduce((acc, x) => acc.concat(scan(x)), [] as string[])
    : comp.tag === 'shortVarDecl'
      ? [(comp as ShortVarDecl).syms[0]]
      : []

export const compileGoCode = (ast: AstNode) => {
  wc = 0
  instrs = []
  compile(ast, global_compile_environment)
  return instrs
}

const compile = (comp: AstNode, ce: string[][]) => {
  // For debugging.
  // console.log("compiling", comp.tag)
  compile_comp[comp.tag](comp, ce)
  instrs[wc] = { tag: 'DONE' }
}

const compile_comp: { [type: string]: (comp: AstNode, ce: string[][]) => void } = {
  src: (comp: SourceFile, ce: string[][]) => {
    const names: string[] = []
    comp.imports.forEach(name => names.push(name.substring(1, name.length - 1)))

    comp.decls.forEach(decl => {
      if (decl.tag === 'func') {
        names.push((decl as FunctionDeclaration).sym)
      } else {
        ;(decl as VariableDeclaration).specs.forEach(spec => {
          names.push(...spec.syms)
        })
      }
    })
    const new_env = compile_time_environment_extend(names, ce)

    // ENTER SCOPE first
    instrs[wc++] = { tag: 'ENTER_SCOPE', syms: names }

    comp.imports.forEach(name => {
      const val = name.substring(1, name.length - 1)
      instrs[wc++] = { tag: 'LDC', val: { tag: GoTag.Boolean, val: true } } // TODO: string is not supported: dunmy value
      instrs[wc++] = { tag: 'ASSIGN', pos: compile_time_environment_position(new_env, val) }
    })

    comp.decls.map(decl => compile(decl, new_env))
    compile(
      {
        tag: 'expStmt',
        exp: {
          tag: 'primArg',
          expr: {
            tag: 'meth',
            ident: 'main'
          } as MethodExpression,
          args: []
        } as PrimaryExprArgument
      } as ExpressionStatement,
      new_env
    )
    instrs[wc++] = { tag: 'EXIT_SCOPE' }
  },

  block: (comp: Block, ce: string[][]) => {
    // TODO not sure if Go scans declarations as per JS
    const locals = scan(comp.body)
    instrs[wc++] = { tag: 'ENTER_SCOPE', syms: locals }

    compile(comp.body, compile_time_environment_extend(locals, ce))
    instrs[wc++] = { tag: 'EXIT_SCOPE' }
  },

  seq: (comp: Sequence, ce: string[][]) => {
    // Value producing stmts are responsible for popping their unused value.
    comp.stmts.forEach(stmt => compile(stmt, ce))
  },

  varDecl: (comp: VariableDeclaration, ce: string[][]) => {
    comp.specs.forEach(spec => {
      // TODO spec.type should be stored and needed somewhere.
      for (let i = 0; i < spec.syms.length; i++) {
        // varDecl without expr has undefined as expr.
        spec.exprs[i]
          ? compile(spec.exprs[i], ce)
          : spec.type
            ? compile(spec.type, ce)
            : (instrs[wc++] = { tag: 'LDC', val: undefined })
        instrs[wc++] = { tag: 'ASSIGN', pos: compile_time_environment_position(ce, spec.syms[i]) }
        instrs[wc++] = { tag: 'POP' }
      }
    })
  },

  shortVarDecl: (comp: ShortVarDecl, ce: string[][]) => {
    compile(comp.exprs[0], ce)
    instrs[wc++] = { tag: 'ASSIGN', pos: compile_time_environment_position(ce, comp.syms[0]) }
    instrs[wc++] = { tag: 'POP' }
  },

  assmt: (comp: Assignment, ce: string[][]) => {
    compile(comp.exprs[0], ce)
    instrs[wc++] = { tag: 'ASSIGN', pos: compile_time_environment_position(ce, comp.syms[0].name) }
    instrs[wc++] = { tag: 'POP' }
  },

  send: (comp: SendStatement, ce: string[][]) => {
    compile(comp.chan, ce)
    compile(comp.msg, ce)
    instrs[wc++] = { tag: 'SEND' }
  },

  literal: (comp: BasicLiteral, ce: string[][]) => {
    const val: GoLit = is_boolean(comp.value)
      ? { tag: GoTag.Boolean, val: comp.value as boolean }
      : is_number(comp.value)
        ? { tag: GoTag.Int, val: comp.value as number }
        : { tag: GoTag.String, val: comp.value as string }

    instrs[wc++] = { tag: 'LDC', val: val }
  },

  funcLit: (comp: FunctionLiteral, ce: string[][]) => {
    instrs[wc++] = { tag: 'LDF', prms: comp.sig.parameters, addr: wc + 1 }
    // addr: -1 is dummy value.
    const goto_instruction: Goto = { tag: 'GOTO', addr: -1 }
    instrs[wc++] = goto_instruction
    const parameters = comp.sig.parameters.map(p => p.syms).reduce((acc, x) => acc.concat(x), [])
    compile(comp.body, compile_time_environment_extend(parameters, ce))
    // Functions that do not have a return value returns undefined.
    instrs[wc++] = { tag: 'LDC', val: undefined }
    instrs[wc++] = { tag: 'RESET' }
    goto_instruction.addr = wc
  },

  func: (comp: FunctionDeclaration, ce: string[][]) => {
    // Transform FunctionDeclaration to ShortVarDecl.
    compile(
      {
        tag: 'shortVarDecl',
        syms: [comp.sym],
        exprs: [
          {
            tag: 'funcLit',
            sig: {
              tag: 'sig',
              parameters: comp.sig.parameters,
              result: comp.sig.result
            },
            body: comp.body
          }
        ]
      } as ShortVarDecl,
      ce
    )
  },

  primArg: (comp: PrimaryExprArgument, ce: string[][]) => {
    compile(comp.expr, ce)
    comp.args.forEach(arg => compile(arg, ce))
    instrs[wc++] = { tag: 'CALL', arity: comp.args.length }
  },

  go: (comp: GoStatement, ce: string[][]) => {
    instrs[wc++] = { tag: 'GO' }
    const goto: Goto = { tag: 'GOTO', addr: -1 }
    instrs[wc++] = goto
    compile(comp.expr, ce)
    instrs[wc++] = { tag: 'GO_DONE' }
    goto.addr = wc
  },

  meth: (comp: MethodExpression, ce: string[][]) => {
    instrs[wc++] = {
      tag: 'LD',
      sel: undefined,
      pos: compile_time_environment_position(ce, comp.ident)
    }
  },

  primSel: (comp: PrimaryExprSelector, ce: string[][]) => {
    // TODO better way to get sel?
    const sel = comp.sel.tag === 'ident' ? comp.sel.name : (comp.sel as MethodExpression).ident
    instrs[wc++] = {
      tag: 'LD',
      sel: compile_time_environment_position(ce, sel),
      pos: compile_time_environment_position(ce, comp.ident)
    }
  },

  ident: (comp: Identifier, ce: string[][]) => {
    instrs[wc++] = {
      tag: 'LD',
      sel: undefined,
      pos: compile_time_environment_position(ce, comp.name)
    }
  },

  expStmt: (comp: ExpressionStatement, ce: string[][]) => {
    compile(comp.exp, ce)
    instrs[wc++] = { tag: 'POP' }
  },

  unop: (comp: UnaryExpression, ce: string[][]) => {
    compile(comp.expr, ce)
    instrs[wc++] = { tag: 'UNOP', sym: comp.sym }
  },

  binop: (comp: BinaryOperatorExpression, ce: string[][]) => {
    compile(comp.frst, ce)
    compile(comp.scnd, ce)
    instrs[wc++] = { tag: 'BINOP', sym: comp.sym }
  },

  type: (comp: Type, ce: string[][]) => {
    let instr: GoLit

    if (comp.type.tag === 'chanType') {
      compile(comp.type.elem, ce)
      const prev = instrs.pop() as Ldc
      wc--
      instr = { tag: GoTag.Channel, type: prev.val?.tag as GoTag }
    } else if (comp.type.name == 'int') {
      instr = { tag: GoTag.Int }
    } else if (comp.type.name == 'sync.Mutex') {
      instr = { tag: GoTag.Mutex }
    } else if (comp.type.name == 'sync.WaitGroup') {
      instr = { tag: GoTag.WaitGroup }
    } else if (comp.type.name == 'bool') {
      instr = { tag: GoTag.Boolean }
    } else if (comp.type.name === 'string') {
      instr = { tag: GoTag.String }
    } else {
      error('unknown type')
      instr = { tag: GoTag.Int } // dummy value
    }

    instrs[wc++] = { tag: 'LDC', val: instr }
  }
}
