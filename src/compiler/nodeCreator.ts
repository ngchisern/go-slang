import {
  ExpressionStatement,
  FunctionDeclaration,
  ShortVarDecl,
  VariableDeclaration
} from "../common/astNode";

export const mainMtdExprStmtNode = (): ExpressionStatement => ({
  tag: 'expStmt',
  exp: {
    tag: 'primArg',
    expr: {
      tag: 'ident',
      name: 'main'
    },
    args: []
  }
})

export const shortVarDeclFuncLitNode = (fun: FunctionDeclaration): ShortVarDecl => ({
  tag: 'shortVarDecl',
  syms: [fun.sym],
  exprs: [{
    tag: 'funcLit',
    sig: {
      tag: 'sig',
      parameters: fun.sig.parameters,
      result: fun.sig.result
    },
    body: fun.body
  }]
})

export const varDeclImNode = (im: string): VariableDeclaration => ({
  tag: 'varDecl',
  specs: [{
    tag: 'varSpec',
    syms: [im],
    exprs: [],
    type: {
      tag: 'type',
      type: {
        tag: 'typeName',
        name: 'bool' // TODO hardcode dummy value
      }
    },
  }]
})
