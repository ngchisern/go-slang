// Type definitions for the AST nodes
type Declaration = FunctionDeclaration | VariableDeclaration

export type LiteralType = string | number | boolean
export type Statement = SimpleStatement | GoStatement | VariableDeclaration
export type SimpleStatement = ShortVarDecl | Assignment | ExpressionStatement | SendStatement
export type Expression =
  | PrimaryExpr
  | UnaryExpression
  | BinaryOperatorExpression
  | LogicalExpression
export type PrimaryExpr = Operand | MethodExpression | PrimaryExprSelector | PrimaryExprArgument
export type Operand = Literal | Identifier | ParenExpression
export type Literal = BasicLiteral | FunctionLiteral

// AST Node types
interface BaseNode {
  tag: string
}

export interface SourceFile extends BaseNode {
  tag: 'src'
  package: string
  imports: string[]
  decls: Declaration[]
}

export interface BasicLiteral extends BaseNode {
  tag: 'literal'
  value: LiteralType
}

export interface FunctionLiteral extends BaseNode {
  tag: 'funcLit'
  sig: Signature
  body: Block
}

export interface Identifier extends BaseNode {
  tag: 'ident'
  name: string
}

export interface LogicalExpression extends BaseNode {
  tag: 'log'
  sym: string
  frst: Expression
  scnd: Expression
}

export interface BinaryOperatorExpression extends BaseNode {
  tag: 'binop'
  sym: string
  frst: Expression
  scnd: Expression
}

export interface UnaryExpression extends BaseNode {
  tag: 'unop'
  sym: string
  expr: Expression
}

export interface PrimaryExprArgument extends BaseNode {
  tag: 'primArg'
  expr: PrimaryExpr
  args: (Expression | Type)[]
}

export interface PrimaryExprSelector extends BaseNode {
  tag: 'primSel'
  sel: PrimaryExpr
  ident: string
}

export interface MethodExpression extends BaseNode {
  tag: 'meth'
  recv: Type
  ident: string
}

export interface Sequence extends BaseNode {
  tag: 'seq'
  stmts: Statement[]
}

export interface Block extends BaseNode {
  tag: 'block'
  body: Sequence
}

export interface VariableDeclaration extends BaseNode {
  tag: 'varDecl'
  specs: VariableSpecification[]
}

export interface VariableSpecification extends BaseNode {
  tag: 'varSpec'
  syms: string[]
  exprs: Expression[]
  type: Type
}

export interface SendStatement extends BaseNode {
  tag: 'send'
  chan: Identifier
  msg: Expression
}

export interface Assignment extends BaseNode {
  tag: 'assmt'
  syms: Identifier[]
  exprs: Expression[]
}

export interface ShortVarDecl extends BaseNode {
  tag: 'shortVarDecl'
  syms: string[]
  exprs: Expression[]
}

export interface ExpressionStatement extends BaseNode {
  tag: 'expStmt'
  exp: Expression
}

export interface ParenExpression extends BaseNode {
  tag: 'parenExp'
  exp: Expression
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
  sig: Signature
  body: Block
}

export interface Signature extends BaseNode {
  tag: 'sig'
  parameters: ParameterDeclaration[]
  result?: Type
}

export interface ParameterDeclaration extends BaseNode {
  tag: 'param'
  syms: string[]
  type: Type
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
  expr: Expression
}

export interface Type extends BaseNode {
  tag: 'type'
  type: TypeName | ChannelType
}

export interface TypeName extends BaseNode {
  tag: 'typeName'
  name: string
}

export interface ChannelType extends BaseNode {
  tag: 'chanType'
  elem: Type
}

export type AstNode = BaseNode
