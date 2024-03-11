// Type definitions for the AST nodes
type LiteralType = string | number | boolean

// AST Node types
interface BaseNode {
  tag: string
}

export interface SourceFile extends BaseNode {
  tag: 'src'
  package: string
  imports: string[]
  decls: AstNode[]
}

export interface Literal extends BaseNode {
  tag: 'literal'
  value: LiteralType
}

export interface FunctionLiteral extends BaseNode {
  tag: 'funcLit'
  sig: AstNode
  body: AstNode
}

export interface Identifier extends BaseNode {
  tag: 'ident'
  name: string
}

export interface QualifiedIdentifier extends BaseNode {
  tag: 'qualIdent'
  pkg: string
  ident: string
}

export interface LogicalExpression extends BaseNode {
  tag: 'log'
  sym: string
  frst: AstNode
  scnd: AstNode
}

export interface BinaryOperatorExpression extends BaseNode {
  tag: 'binop'
  sym: string
  frst: AstNode
  scnd: AstNode
}

export interface UnaryExpression extends BaseNode {
  tag: 'unop'
  sym: string
  expr: AstNode
}

export interface PrimaryExprArgument extends BaseNode {
  tag: 'primArg'
  expr: AstNode
  args: AstNode[]
}

export interface PrimaryExprSelector extends BaseNode {
  tag: 'primSel'
  ident: string
}

export interface MethodExpression extends BaseNode {
  tag: 'meth'
  recv: AstNode
  ident: string
}

export interface Arguments extends BaseNode {
  tag: 'args'
  list: AstNode[]
}

export interface Sequence extends BaseNode {
  tag: 'seq'
  stmts: AstNode[]
}

export interface Block extends BaseNode {
  tag: 'block'
  body: AstNode
}

export interface VariableDeclaration extends BaseNode {
  tag: 'varDecl'
  specs: AstNode[]
}

export interface VariableSpecification extends BaseNode {
  tag: 'varSpec'
  syms: string[]
  exprs: AstNode[]
}

export interface SendStatement extends BaseNode {
  tag: 'send'
  chan: AstNode
  msg: AstNode
}

export interface Assignment extends BaseNode {
  tag: 'assmt'
  syms: AstNode[]
  exprs: AstNode[]
}

export interface ShortValDecl extends BaseNode {
  tag: 'shortValDecl'
  syms: string[]
  exprs: AstNode[]
}

export interface ConditionalExpression extends BaseNode {
  tag: 'cond' // dont distinguish stmt and expr
  cond: AstNode
  cons: AstNode
  alt: AstNode
}

export interface ConditionalStatement extends BaseNode {
  tag: 'cond' // dont distinguish stmt and expr
  cond: AstNode
  cons: AstNode
  alt: AstNode
}

export interface FunctionDeclaration extends BaseNode {
  tag: 'func'
  sym: string
  sig: AstNode
  body: AstNode
}

export interface Signature extends BaseNode {
  tag: 'sig'
  parameters: AstNode
  result: AstNode | null
}

export interface Parameters extends BaseNode {
  tag: 'params'
  list: AstNode[]
}

export interface ParameterDeclaration extends BaseNode {
  tag: 'param'
  syms: string[]
  type: AstNode
}

export interface ReturnStatement extends BaseNode {
  tag: 'ret'
  expr: AstNode[]
}

export interface DeferStatement extends BaseNode {
  tag: 'defer'
  expr: AstNode
}

export interface WhileLoop extends BaseNode {
  tag: 'while'
  cond: AstNode
  body: AstNode
}

export interface ForStmt extends BaseNode {
  tag: 'for'
  clause: AstNode
  body: AstNode
}

export interface ForClause extends BaseNode {
  tag: 'forClause'
  init: AstNode
  cond: AstNode
  post: AstNode
}

export interface GoStatement extends BaseNode {
  tag: 'go'
  expr: AstNode
}

export interface Type extends BaseNode {
  tag: 'type'
  type: AstNode
}

export interface TypeName extends BaseNode {
  tag: 'typeName'
  name: string
}

export interface ChannelType extends BaseNode {
  tag: 'chanType'
  elem: AstNode
}

export type AstNode = BaseNode
