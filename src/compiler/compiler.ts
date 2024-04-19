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
import { GoLit, GoTag } from '../common/types'
import { SingleMemory } from '../vm/memory/singleMemory'
import * as node from './nodeCreator'

// compile-time frames only need synbols (keys), no values
const global_compile_frame = Object.keys(new SingleMemory().primitive_object)
const global_compile_environment = [global_compile_frame]

const compile_time_environment_extend = (vs: string[], e: string[][]) => {
  return e.concat([vs])
}

let wc: number
let instrs: Instruction[]

const scan = (comp: AstNode): string[] =>
  comp.tag === 'seq'
    ? (comp as Sequence).stmts.flatMap(stmt => scan(stmt))
    : comp.tag === 'shortVarDecl'
      ? (comp as ShortVarDecl).syms
      : comp.tag === 'varDecl'
        ? (comp as VariableDeclaration).specs.flatMap(spec => spec.syms)
        : comp.tag === 'src'
          ? [...(comp as SourceFile).decls.flatMap(decl => scan(decl))]
          : comp.tag === 'func'
            ? [(comp as FunctionDeclaration).sym]
            : []

export const compileGoCode = (ast: AstNode) => {
  wc = 0
  instrs = []
  // May throw err here.
  compile(ast, global_compile_environment)
  instrs[wc] = { tag: 'DONE' }
  return instrs
}

const compile = (comp: AstNode, ce: string[][]) => {
  // For debugging.
  // console.log("compiling", comp.tag)
  compile_comp[comp.tag](comp, ce)
}

const compile_comp: { [type: string]: (comp: AstNode, ce: string[][]) => void } = {
  src: (comp: SourceFile, ce: string[][]) => {
    // Transform imports to varDecl with empty exprs.
    const imToVarDecls = comp.imports.map(im => node.varDeclImNode(im))
    comp.decls.unshift(...imToVarDecls)

    // Extend env with global names.
    const globals: string[] = scan(comp)
    const new_env = compile_time_environment_extend(globals, ce)

    // Enter scope.
    instrs[wc++] = { tag: 'ENTER_SCOPE', syms: globals }
    // Compile decls.
    comp.decls.map(decl => compile(decl, new_env))
    // Compile main mtd invocation.
    compile(node.mainMtdExprStmtNode(), new_env)
    // Exit scope.
    instrs[wc++] = { tag: 'EXIT_SCOPE' }
  },

  block: (comp: Block, ce: string[][]) => {
    // Extend env with local names.
    const locals = scan(comp.body)
    const new_env = compile_time_environment_extend(locals, ce)

    // Enter scope.
    instrs[wc++] = { tag: 'ENTER_SCOPE', syms: locals }
    // Compile body.
    compile(comp.body, new_env)
    // Exit scope.
    instrs[wc++] = { tag: 'EXIT_SCOPE' }
  },

  seq: (comp: Sequence, ce: string[][]) => {
    // Value producing stmts are responsible for popping their unused value.
    comp.stmts.forEach(stmt => compile(stmt, ce))
  },

  varDecl: (comp: VariableDeclaration, ce: string[][]) => {
    comp.specs.forEach(spec => {
      for (let i = 0; i < spec.syms.length; i++) {
        // var is initialized to initializer if present, else default value,
        // both with encoded type info in GoLit.
        spec.exprs[i] ? compile(spec.exprs[i], ce) : compile(spec.type, ce)
        instrs[wc++] = { tag: 'ASSIGN', pos: compile_time_environment_position(ce, spec.syms[i]) }
        instrs[wc++] = { tag: 'POP' }
      }
    })
  },

  shortVarDecl: (comp: ShortVarDecl, ce: string[][]) => {
    // TODO only 1 expr is supported
    compile(comp.exprs[0], ce)
    instrs[wc++] = { tag: 'ASSIGN', pos: compile_time_environment_position(ce, comp.syms[0]) }
    instrs[wc++] = { tag: 'POP' }
  },

  assmt: (comp: Assignment, ce: string[][]) => {
    // TODO only 1 expr is supported
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
    // Type inference.
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
    compile(node.shortVarDeclFuncLitNode(comp), ce)
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

  // Qualified mtd names, e.g., fmt.Println(), wg.Wait().
  primSel: (comp: PrimaryExprSelector, ce: string[][]) => {
    instrs[wc++] = {
      tag: 'LD',
      pos: compile_time_environment_position(ce, (comp.sel as Identifier).name),
    }
    instrs[wc++] = {
      tag: 'LD',
      pos: compile_time_environment_position(ce, comp.ident)
    }
  },

  // Simple mtd/var names, e.g., minus(42), x.
  ident: (comp: Identifier, ce: string[][]) => {
    instrs[wc++] = {
      tag: 'LD',
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
    const checkSyncPkgImported = () => {
      compile_time_environment_position(ce, "sync")
    }

    let val: GoLit

    if (comp.type.tag === 'chanType') {
      compile(comp.type.elem, ce)
      const prev = instrs.pop() as Ldc
      wc--
      val = { tag: GoTag.Channel, type: prev.val?.tag as GoTag }
    } else if (comp.type.name == 'int') {
      val = { tag: GoTag.Int }
    } else if (comp.type.name == 'sync.Mutex') {
      checkSyncPkgImported()
      val = { tag: GoTag.Mutex }
    } else if (comp.type.name == 'sync.WaitGroup') {
      checkSyncPkgImported()
      val = { tag: GoTag.WaitGroup }
    } else if (comp.type.name == 'bool') {
      val = { tag: GoTag.Boolean }
    } else if (comp.type.name === 'string') {
      val = { tag: GoTag.String }
    } else {
      console.log('unknown type')
      val = { tag: GoTag.Int } // dummy value
    }

    instrs[wc++] = { tag: 'LDC', val: val }
  }
}
