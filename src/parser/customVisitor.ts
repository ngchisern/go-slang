import GoParserVisitor from '../lang/GoParserVisitor'
import { AstNode, BaseNode } from './astNode'

import { SourceFileContext } from '../lang/GoParser'
import { PackageClauseContext } from '../lang/GoParser'
import { ImportDeclContext } from '../lang/GoParser'
import { ImportSpecContext } from '../lang/GoParser'
import { ImportPathContext } from '../lang/GoParser'
import { IdentifierListContext } from '../lang/GoParser'
import { ExpressionListContext } from '../lang/GoParser'
import { FunctionDeclContext } from '../lang/GoParser'
import { VarDeclContext } from '../lang/GoParser'
import { VarSpecContext } from '../lang/GoParser'
import { BlockContext } from '../lang/GoParser'
import { StatementListContext } from '../lang/GoParser'
import { StatementContext } from '../lang/GoParser'
import { SimpleStmtContext } from '../lang/GoParser'
import { ExpressionStmtContext } from '../lang/GoParser'
import { SendStmtContext } from '../lang/GoParser'
import { AssignmentContext } from '../lang/GoParser'
import { ShortVarDeclContext } from '../lang/GoParser'
import { ReturnStmtContext } from '../lang/GoParser'
import { DeferStmtContext } from '../lang/GoParser'
import { IfStmtContext } from '../lang/GoParser'
import { RecvStmtContext } from '../lang/GoParser'
import { ForStmtContext } from '../lang/GoParser'
import { ForClauseContext } from '../lang/GoParser'
import { RangeClauseContext } from '../lang/GoParser'
import { GoStmtContext } from '../lang/GoParser'
import { Type_Context } from '../lang/GoParser'
import { TypeNameContext } from '../lang/GoParser'
import { ElementTypeContext } from '../lang/GoParser'
import { ChannelTypeContext } from '../lang/GoParser'
import { SignatureContext } from '../lang/GoParser'
import { ParametersContext } from '../lang/GoParser'
import { ParameterDeclContext } from '../lang/GoParser'
import { ExpressionContext } from '../lang/GoParser'
import { PrimaryExprContext } from '../lang/GoParser'
import { OperandContext } from '../lang/GoParser'
import { LiteralContext } from '../lang/GoParser'
import { BasicLitContext } from '../lang/GoParser'
import { OperandNameContext } from '../lang/GoParser'
import { QualifiedIdentContext } from '../lang/GoParser'
import { String_Context } from '../lang/GoParser'
import { FunctionLitContext } from '../lang/GoParser'
import { ArgumentsContext } from '../lang/GoParser'
import { MethodExprContext } from '../lang/GoParser'
import { EosContext } from '../lang/GoParser'
import { ErrorNode, ParseTree, RuleNode, TerminalNode } from 'antlr4'

// TODO: extend each method to return the correct type
export class CustomVisitor extends GoParserVisitor<AstNode> {
  // Base functions for visiting the parse tree
  visit(tree: ParseTree): BaseNode {
    console.log(tree);
    return { type: tree.getText() }
  }

  visitChildren: (node: RuleNode) => AstNode

  visitTerminal: (node: TerminalNode) => AstNode

  visitErrorNode: (node: ErrorNode) => AstNode

  /**
   * Visit a parse tree produced by `GoParser.sourceFile`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitSourceFile?: (ctx: SourceFileContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.packageClause`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitPackageClause?: (ctx: PackageClauseContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.importDecl`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitImportDecl?: (ctx: ImportDeclContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.importSpec`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitImportSpec?: (ctx: ImportSpecContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.importPath`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitImportPath?: (ctx: ImportPathContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.identifierList`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitIdentifierList?: (ctx: IdentifierListContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.expressionList`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitExpressionList?: (ctx: ExpressionListContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.functionDecl`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitFunctionDecl?: (ctx: FunctionDeclContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.varDecl`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitVarDecl?: (ctx: VarDeclContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.varSpec`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitVarSpec?: (ctx: VarSpecContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.block`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitBlock?: (ctx: BlockContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.statementList`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitStatementList?: (ctx: StatementListContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.statement`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitStatement?: (ctx: StatementContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.simpleStmt`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitSimpleStmt?: (ctx: SimpleStmtContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.expressionStmt`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitExpressionStmt?: (ctx: ExpressionStmtContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.sendStmt`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitSendStmt?: (ctx: SendStmtContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.assignment`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitAssignment?: (ctx: AssignmentContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.shortVarDecl`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitShortVarDecl?: (ctx: ShortVarDeclContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.returnStmt`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitReturnStmt?: (ctx: ReturnStmtContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.deferStmt`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitDeferStmt?: (ctx: DeferStmtContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.ifStmt`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitIfStmt?: (ctx: IfStmtContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.recvStmt`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitRecvStmt?: (ctx: RecvStmtContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.forStmt`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitForStmt?: (ctx: ForStmtContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.forClause`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitForClause?: (ctx: ForClauseContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.rangeClause`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitRangeClause?: (ctx: RangeClauseContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.goStmt`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitGoStmt?: (ctx: GoStmtContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.type_`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitType_?: (ctx: Type_Context) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.typeName`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitTypeName?: (ctx: TypeNameContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.elementType`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitElementType?: (ctx: ElementTypeContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.channelType`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitChannelType?: (ctx: ChannelTypeContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.signature`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitSignature?: (ctx: SignatureContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.parameters`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitParameters?: (ctx: ParametersContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.parameterDecl`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitParameterDecl?: (ctx: ParameterDeclContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.expression`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitExpression?: (ctx: ExpressionContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.primaryExpr`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitPrimaryExpr?: (ctx: PrimaryExprContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.operand`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitOperand?: (ctx: OperandContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.literal`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitLiteral?: (ctx: LiteralContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.basicLit`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitBasicLit?: (ctx: BasicLitContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.operandName`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitOperandName?: (ctx: OperandNameContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.qualifiedIdent`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitQualifiedIdent?: (ctx: QualifiedIdentContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.string_`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitString_?: (ctx: String_Context) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.functionLit`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitFunctionLit?: (ctx: FunctionLitContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.arguments`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitArguments?: (ctx: ArgumentsContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.methodExpr`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitMethodExpr?: (ctx: MethodExprContext) => AstNode
  /**
   * Visit a parse tree produced by `GoParser.eos`.
   * @param ctx the parse tree
   * @return the visitor AstNode
   */
  visitEos?: (ctx: EosContext) => AstNode
}
