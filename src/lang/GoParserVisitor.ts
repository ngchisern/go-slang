// Generated from GoParser.g4 by ANTLR 4.13.1

import { ParseTreeVisitor } from 'antlr4'

import { SourceFileContext } from './GoParser'
import { PackageClauseContext } from './GoParser'
import { ImportDeclContext } from './GoParser'
import { ImportSpecContext } from './GoParser'
import { ImportPathContext } from './GoParser'
import { IdentifierListContext } from './GoParser'
import { ExpressionListContext } from './GoParser'
import { FunctionDeclContext } from './GoParser'
import { VarDeclContext } from './GoParser'
import { VarSpecContext } from './GoParser'
import { BlockContext } from './GoParser'
import { StatementListContext } from './GoParser'
import { StatementContext } from './GoParser'
import { SimpleStmtContext } from './GoParser'
import { ExpressionStmtContext } from './GoParser'
import { SendStmtContext } from './GoParser'
import { AssignmentContext } from './GoParser'
import { ShortVarDeclContext } from './GoParser'
import { ReturnStmtContext } from './GoParser'
import { DeferStmtContext } from './GoParser'
import { IfStmtContext } from './GoParser'
import { RecvStmtContext } from './GoParser'
import { ForStmtContext } from './GoParser'
import { ForClauseContext } from './GoParser'
import { RangeClauseContext } from './GoParser'
import { GoStmtContext } from './GoParser'
import { Type_Context } from './GoParser'
import { TypeNameContext } from './GoParser'
import { ElementTypeContext } from './GoParser'
import { ChannelTypeContext } from './GoParser'
import { SignatureContext } from './GoParser'
import { ParametersContext } from './GoParser'
import { ParameterDeclContext } from './GoParser'
import { ExpressionContext } from './GoParser'
import { PrimaryExprContext } from './GoParser'
import { OperandContext } from './GoParser'
import { LiteralContext } from './GoParser'
import { BasicLitContext } from './GoParser'
import { OperandNameContext } from './GoParser'
import { QualifiedIdentContext } from './GoParser'
import { String_Context } from './GoParser'
import { FunctionLitContext } from './GoParser'
import { ArgumentsContext } from './GoParser'
import { MethodExprContext } from './GoParser'
import { EosContext } from './GoParser'

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `GoParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class GoParserVisitor<Result> extends ParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by `GoParser.sourceFile`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSourceFile?: (ctx: SourceFileContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.packageClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPackageClause?: (ctx: PackageClauseContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.importDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitImportDecl?: (ctx: ImportDeclContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.importSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitImportSpec?: (ctx: ImportSpecContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.importPath`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitImportPath?: (ctx: ImportPathContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.identifierList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierList?: (ctx: IdentifierListContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.expressionList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpressionList?: (ctx: ExpressionListContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.functionDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionDecl?: (ctx: FunctionDeclContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.varDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVarDecl?: (ctx: VarDeclContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.varSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVarSpec?: (ctx: VarSpecContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.block`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBlock?: (ctx: BlockContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.statementList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStatementList?: (ctx: StatementListContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStatement?: (ctx: StatementContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.simpleStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSimpleStmt?: (ctx: SimpleStmtContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.expressionStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpressionStmt?: (ctx: ExpressionStmtContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.sendStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSendStmt?: (ctx: SendStmtContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssignment?: (ctx: AssignmentContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.shortVarDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShortVarDecl?: (ctx: ShortVarDeclContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.returnStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReturnStmt?: (ctx: ReturnStmtContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.deferStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDeferStmt?: (ctx: DeferStmtContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.ifStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIfStmt?: (ctx: IfStmtContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.recvStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRecvStmt?: (ctx: RecvStmtContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.forStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitForStmt?: (ctx: ForStmtContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.forClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitForClause?: (ctx: ForClauseContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.rangeClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRangeClause?: (ctx: RangeClauseContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.goStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGoStmt?: (ctx: GoStmtContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.type_`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitType_?: (ctx: Type_Context) => Result
  /**
   * Visit a parse tree produced by `GoParser.typeName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeName?: (ctx: TypeNameContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.elementType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitElementType?: (ctx: ElementTypeContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.channelType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitChannelType?: (ctx: ChannelTypeContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.signature`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSignature?: (ctx: SignatureContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.parameters`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParameters?: (ctx: ParametersContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.parameterDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParameterDecl?: (ctx: ParameterDeclContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpression?: (ctx: ExpressionContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.primaryExpr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPrimaryExpr?: (ctx: PrimaryExprContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.operand`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOperand?: (ctx: OperandContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.literal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLiteral?: (ctx: LiteralContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.basicLit`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBasicLit?: (ctx: BasicLitContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.operandName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOperandName?: (ctx: OperandNameContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.qualifiedIdent`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQualifiedIdent?: (ctx: QualifiedIdentContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.string_`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitString_?: (ctx: String_Context) => Result
  /**
   * Visit a parse tree produced by `GoParser.functionLit`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionLit?: (ctx: FunctionLitContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.arguments`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArguments?: (ctx: ArgumentsContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.methodExpr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMethodExpr?: (ctx: MethodExprContext) => Result
  /**
   * Visit a parse tree produced by `GoParser.eos`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEos?: (ctx: EosContext) => Result
}
