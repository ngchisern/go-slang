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
  ShortValDecl,
  SourceFile,
  ExpressionStatement,
  BinaryOperatorExpression,
  GoStatement,
  SendStatement,
  UnaryExpression,
  Type,
  ChannelType,
  TypeName
} from '../common/astNode'
import { Instruction, Goto, Call } from '../common/instruction'

let wc: number
let instrs: Instruction[]

const scan = (comp: AstNode): string[] =>
  comp.tag === 'seq'
    ? (comp as Sequence).stmts.reduce((acc, x) => acc.concat(scan(x)), [] as string[])
    : comp.tag === 'shortValDecl'
      ? [(comp as ShortValDecl).syms[0]]
      : []

export const compielGoCode = (ast: AstNode) => {
  wc = 0
  instrs = []
  compile(ast)
  return instrs
}

const compile = (comp: AstNode) => {
  // For debugging.
  // console.log("compiling", comp.tag)
  compile_comp[comp.tag](comp)
  instrs[wc] = { tag: 'DONE' }
}

const compile_comp: { [type: string]: (comp: AstNode) => void } = {
  src: (comp: SourceFile) => {
    comp.decls.map(decl => compile(decl))
    compile({
      tag: 'expStmt',
      exp: {
        tag: 'primArg',
        expr: {
          tag: 'meth',
          ident: 'main'
        } as MethodExpression,
        args: []
      } as PrimaryExprArgument
    } as ExpressionStatement)
  },

  block: (comp: Block) => {
    // TODO not sure if Go scans declarations as per JS
    const locals = scan(comp.body)
    instrs[wc++] = { tag: 'ENTER_SCOPE', syms: locals }

    compile(comp.body)
    instrs[wc++] = { tag: 'EXIT_SCOPE' }
  },

  seq: (comp: Sequence) => {
    // Value producing stmts are responsible for popping their unused value.
    comp.stmts.forEach(stmt => compile(stmt))
  },

  shortValDecl: (comp: ShortValDecl) => {
    compile(comp.exprs[0])
    instrs[wc++] = { tag: 'ASSIGN', sym: comp.syms[0] }
    instrs[wc++] = { tag: 'POP' }
  },

  assmt: (comp: Assignment) => {
    compile(comp.exprs[0])
    instrs[wc++] = { tag: 'ASSIGN', sym: comp.syms[0] }
    instrs[wc++] = { tag: 'POP' }
  },

  send: (comp: SendStatement) => {
    compile(comp.chan)
    compile(comp.msg)
    instrs[wc++] = { tag: 'SEND', chan: comp.chan.name }
  },

  literal: (comp: BasicLiteral) => {
    instrs[wc++] = { tag: 'LDC', val: comp.value }
  },

  funcLit: (comp: FunctionLiteral) => {
    instrs[wc++] = { tag: 'LDF', prms: comp.sig.parameters, addr: wc + 1 }
    // addr: -1 is dummy value.
    const goto_instruction: Goto = { tag: 'GOTO', addr: -1 }
    instrs[wc++] = goto_instruction
    compile(comp.body)
    // Functions that do not have a return value returns undefined.
    instrs[wc++] = { tag: 'LDC', val: undefined }
    instrs[wc++] = { tag: 'RESET' }
    goto_instruction.addr = wc
  },

  func: (comp: FunctionDeclaration) => {
    // Transform FunctionDeclaration to ShortValDecl.
    compile({
      tag: 'shortValDecl',
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
    } as ShortValDecl)
  },

  primArg: (comp: PrimaryExprArgument) => {
    compile(comp.expr)
    comp.args.forEach(arg => compile(arg))
    instrs[wc++] = { tag: 'CALL', arity: comp.args.length }
  },

  go: (comp: GoStatement) => {
    compile(comp.expr)
    instrs[wc - 1] = { tag: 'GO', arity: (instrs[wc - 1] as Call).arity }
  },

  meth: (comp: MethodExpression) => {
    instrs[wc++] = { tag: 'LD', sym: comp.ident }
  },

  primSel: (comp: PrimaryExprSelector) => {
    // TODO better way to get sel?
    const sel = comp.sel.tag === 'ident' ? comp.sel.name : (comp.sel as MethodExpression).ident
    instrs[wc++] = { tag: 'LD', sym: `${sel}.${comp.ident}` }
  },

  ident: (comp: Identifier) => {
    instrs[wc++] = { tag: 'LD', sym: comp.name }
  },

  expStmt: (comp: ExpressionStatement) => {
    compile(comp.exp)
    instrs[wc++] = { tag: 'POP' }
  },

  unop: (comp: UnaryExpression) => {
    compile(comp.expr)
    instrs[wc++] = { tag: 'UNOP', sym: comp.sym }
  },

  binop: (comp: BinaryOperatorExpression) => {
    compile(comp.frst)
    compile(comp.scnd)
    instrs[wc++] = { tag: 'BINOP', sym: comp.sym }
  },

  type: (comp: Type) => {
    const getTypeStr = (type: TypeName | ChannelType): string => {
      return type.tag === "typeName"
        ? type.name
        : `chan ${getTypeStr(type.elem.type)}`
    }
    instrs[wc++] = { tag: 'TYPE', type: getTypeStr(comp.type) }
  }
}
