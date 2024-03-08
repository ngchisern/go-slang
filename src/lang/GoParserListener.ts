// Generated from GoParser.g4 by ANTLR 4.13.1

import { ParseTreeListener } from 'antlr4'

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
 * This interface defines a complete listener for a parse tree produced by
 * `GoParser`.
 */
export default class GoParserListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by `GoParser.sourceFile`.
   * @param ctx the parse tree
   */
  enterSourceFile?: (ctx: SourceFileContext) => void
  /**
   * Exit a parse tree produced by `GoParser.sourceFile`.
   * @param ctx the parse tree
   */
  exitSourceFile?: (ctx: SourceFileContext) => void
  /**
   * Enter a parse tree produced by `GoParser.packageClause`.
   * @param ctx the parse tree
   */
  enterPackageClause?: (ctx: PackageClauseContext) => void
  /**
   * Exit a parse tree produced by `GoParser.packageClause`.
   * @param ctx the parse tree
   */
  exitPackageClause?: (ctx: PackageClauseContext) => void
  /**
   * Enter a parse tree produced by `GoParser.importDecl`.
   * @param ctx the parse tree
   */
  enterImportDecl?: (ctx: ImportDeclContext) => void
  /**
   * Exit a parse tree produced by `GoParser.importDecl`.
   * @param ctx the parse tree
   */
  exitImportDecl?: (ctx: ImportDeclContext) => void
  /**
   * Enter a parse tree produced by `GoParser.importSpec`.
   * @param ctx the parse tree
   */
  enterImportSpec?: (ctx: ImportSpecContext) => void
  /**
   * Exit a parse tree produced by `GoParser.importSpec`.
   * @param ctx the parse tree
   */
  exitImportSpec?: (ctx: ImportSpecContext) => void
  /**
   * Enter a parse tree produced by `GoParser.importPath`.
   * @param ctx the parse tree
   */
  enterImportPath?: (ctx: ImportPathContext) => void
  /**
   * Exit a parse tree produced by `GoParser.importPath`.
   * @param ctx the parse tree
   */
  exitImportPath?: (ctx: ImportPathContext) => void
  /**
   * Enter a parse tree produced by `GoParser.identifierList`.
   * @param ctx the parse tree
   */
  enterIdentifierList?: (ctx: IdentifierListContext) => void
  /**
   * Exit a parse tree produced by `GoParser.identifierList`.
   * @param ctx the parse tree
   */
  exitIdentifierList?: (ctx: IdentifierListContext) => void
  /**
   * Enter a parse tree produced by `GoParser.expressionList`.
   * @param ctx the parse tree
   */
  enterExpressionList?: (ctx: ExpressionListContext) => void
  /**
   * Exit a parse tree produced by `GoParser.expressionList`.
   * @param ctx the parse tree
   */
  exitExpressionList?: (ctx: ExpressionListContext) => void
  /**
   * Enter a parse tree produced by `GoParser.functionDecl`.
   * @param ctx the parse tree
   */
  enterFunctionDecl?: (ctx: FunctionDeclContext) => void
  /**
   * Exit a parse tree produced by `GoParser.functionDecl`.
   * @param ctx the parse tree
   */
  exitFunctionDecl?: (ctx: FunctionDeclContext) => void
  /**
   * Enter a parse tree produced by `GoParser.varDecl`.
   * @param ctx the parse tree
   */
  enterVarDecl?: (ctx: VarDeclContext) => void
  /**
   * Exit a parse tree produced by `GoParser.varDecl`.
   * @param ctx the parse tree
   */
  exitVarDecl?: (ctx: VarDeclContext) => void
  /**
   * Enter a parse tree produced by `GoParser.varSpec`.
   * @param ctx the parse tree
   */
  enterVarSpec?: (ctx: VarSpecContext) => void
  /**
   * Exit a parse tree produced by `GoParser.varSpec`.
   * @param ctx the parse tree
   */
  exitVarSpec?: (ctx: VarSpecContext) => void
  /**
   * Enter a parse tree produced by `GoParser.block`.
   * @param ctx the parse tree
   */
  enterBlock?: (ctx: BlockContext) => void
  /**
   * Exit a parse tree produced by `GoParser.block`.
   * @param ctx the parse tree
   */
  exitBlock?: (ctx: BlockContext) => void
  /**
   * Enter a parse tree produced by `GoParser.statementList`.
   * @param ctx the parse tree
   */
  enterStatementList?: (ctx: StatementListContext) => void
  /**
   * Exit a parse tree produced by `GoParser.statementList`.
   * @param ctx the parse tree
   */
  exitStatementList?: (ctx: StatementListContext) => void
  /**
   * Enter a parse tree produced by `GoParser.statement`.
   * @param ctx the parse tree
   */
  enterStatement?: (ctx: StatementContext) => void
  /**
   * Exit a parse tree produced by `GoParser.statement`.
   * @param ctx the parse tree
   */
  exitStatement?: (ctx: StatementContext) => void
  /**
   * Enter a parse tree produced by `GoParser.simpleStmt`.
   * @param ctx the parse tree
   */
  enterSimpleStmt?: (ctx: SimpleStmtContext) => void
  /**
   * Exit a parse tree produced by `GoParser.simpleStmt`.
   * @param ctx the parse tree
   */
  exitSimpleStmt?: (ctx: SimpleStmtContext) => void
  /**
   * Enter a parse tree produced by `GoParser.expressionStmt`.
   * @param ctx the parse tree
   */
  enterExpressionStmt?: (ctx: ExpressionStmtContext) => void
  /**
   * Exit a parse tree produced by `GoParser.expressionStmt`.
   * @param ctx the parse tree
   */
  exitExpressionStmt?: (ctx: ExpressionStmtContext) => void
  /**
   * Enter a parse tree produced by `GoParser.sendStmt`.
   * @param ctx the parse tree
   */
  enterSendStmt?: (ctx: SendStmtContext) => void
  /**
   * Exit a parse tree produced by `GoParser.sendStmt`.
   * @param ctx the parse tree
   */
  exitSendStmt?: (ctx: SendStmtContext) => void
  /**
   * Enter a parse tree produced by `GoParser.assignment`.
   * @param ctx the parse tree
   */
  enterAssignment?: (ctx: AssignmentContext) => void
  /**
   * Exit a parse tree produced by `GoParser.assignment`.
   * @param ctx the parse tree
   */
  exitAssignment?: (ctx: AssignmentContext) => void
  /**
   * Enter a parse tree produced by `GoParser.shortVarDecl`.
   * @param ctx the parse tree
   */
  enterShortVarDecl?: (ctx: ShortVarDeclContext) => void
  /**
   * Exit a parse tree produced by `GoParser.shortVarDecl`.
   * @param ctx the parse tree
   */
  exitShortVarDecl?: (ctx: ShortVarDeclContext) => void
  /**
   * Enter a parse tree produced by `GoParser.returnStmt`.
   * @param ctx the parse tree
   */
  enterReturnStmt?: (ctx: ReturnStmtContext) => void
  /**
   * Exit a parse tree produced by `GoParser.returnStmt`.
   * @param ctx the parse tree
   */
  exitReturnStmt?: (ctx: ReturnStmtContext) => void
  /**
   * Enter a parse tree produced by `GoParser.deferStmt`.
   * @param ctx the parse tree
   */
  enterDeferStmt?: (ctx: DeferStmtContext) => void
  /**
   * Exit a parse tree produced by `GoParser.deferStmt`.
   * @param ctx the parse tree
   */
  exitDeferStmt?: (ctx: DeferStmtContext) => void
  /**
   * Enter a parse tree produced by `GoParser.ifStmt`.
   * @param ctx the parse tree
   */
  enterIfStmt?: (ctx: IfStmtContext) => void
  /**
   * Exit a parse tree produced by `GoParser.ifStmt`.
   * @param ctx the parse tree
   */
  exitIfStmt?: (ctx: IfStmtContext) => void
  /**
   * Enter a parse tree produced by `GoParser.recvStmt`.
   * @param ctx the parse tree
   */
  enterRecvStmt?: (ctx: RecvStmtContext) => void
  /**
   * Exit a parse tree produced by `GoParser.recvStmt`.
   * @param ctx the parse tree
   */
  exitRecvStmt?: (ctx: RecvStmtContext) => void
  /**
   * Enter a parse tree produced by `GoParser.forStmt`.
   * @param ctx the parse tree
   */
  enterForStmt?: (ctx: ForStmtContext) => void
  /**
   * Exit a parse tree produced by `GoParser.forStmt`.
   * @param ctx the parse tree
   */
  exitForStmt?: (ctx: ForStmtContext) => void
  /**
   * Enter a parse tree produced by `GoParser.forClause`.
   * @param ctx the parse tree
   */
  enterForClause?: (ctx: ForClauseContext) => void
  /**
   * Exit a parse tree produced by `GoParser.forClause`.
   * @param ctx the parse tree
   */
  exitForClause?: (ctx: ForClauseContext) => void
  /**
   * Enter a parse tree produced by `GoParser.rangeClause`.
   * @param ctx the parse tree
   */
  enterRangeClause?: (ctx: RangeClauseContext) => void
  /**
   * Exit a parse tree produced by `GoParser.rangeClause`.
   * @param ctx the parse tree
   */
  exitRangeClause?: (ctx: RangeClauseContext) => void
  /**
   * Enter a parse tree produced by `GoParser.goStmt`.
   * @param ctx the parse tree
   */
  enterGoStmt?: (ctx: GoStmtContext) => void
  /**
   * Exit a parse tree produced by `GoParser.goStmt`.
   * @param ctx the parse tree
   */
  exitGoStmt?: (ctx: GoStmtContext) => void
  /**
   * Enter a parse tree produced by `GoParser.type_`.
   * @param ctx the parse tree
   */
  enterType_?: (ctx: Type_Context) => void
  /**
   * Exit a parse tree produced by `GoParser.type_`.
   * @param ctx the parse tree
   */
  exitType_?: (ctx: Type_Context) => void
  /**
   * Enter a parse tree produced by `GoParser.typeName`.
   * @param ctx the parse tree
   */
  enterTypeName?: (ctx: TypeNameContext) => void
  /**
   * Exit a parse tree produced by `GoParser.typeName`.
   * @param ctx the parse tree
   */
  exitTypeName?: (ctx: TypeNameContext) => void
  /**
   * Enter a parse tree produced by `GoParser.elementType`.
   * @param ctx the parse tree
   */
  enterElementType?: (ctx: ElementTypeContext) => void
  /**
   * Exit a parse tree produced by `GoParser.elementType`.
   * @param ctx the parse tree
   */
  exitElementType?: (ctx: ElementTypeContext) => void
  /**
   * Enter a parse tree produced by `GoParser.channelType`.
   * @param ctx the parse tree
   */
  enterChannelType?: (ctx: ChannelTypeContext) => void
  /**
   * Exit a parse tree produced by `GoParser.channelType`.
   * @param ctx the parse tree
   */
  exitChannelType?: (ctx: ChannelTypeContext) => void
  /**
   * Enter a parse tree produced by `GoParser.signature`.
   * @param ctx the parse tree
   */
  enterSignature?: (ctx: SignatureContext) => void
  /**
   * Exit a parse tree produced by `GoParser.signature`.
   * @param ctx the parse tree
   */
  exitSignature?: (ctx: SignatureContext) => void
  /**
   * Enter a parse tree produced by `GoParser.parameters`.
   * @param ctx the parse tree
   */
  enterParameters?: (ctx: ParametersContext) => void
  /**
   * Exit a parse tree produced by `GoParser.parameters`.
   * @param ctx the parse tree
   */
  exitParameters?: (ctx: ParametersContext) => void
  /**
   * Enter a parse tree produced by `GoParser.parameterDecl`.
   * @param ctx the parse tree
   */
  enterParameterDecl?: (ctx: ParameterDeclContext) => void
  /**
   * Exit a parse tree produced by `GoParser.parameterDecl`.
   * @param ctx the parse tree
   */
  exitParameterDecl?: (ctx: ParameterDeclContext) => void
  /**
   * Enter a parse tree produced by `GoParser.expression`.
   * @param ctx the parse tree
   */
  enterExpression?: (ctx: ExpressionContext) => void
  /**
   * Exit a parse tree produced by `GoParser.expression`.
   * @param ctx the parse tree
   */
  exitExpression?: (ctx: ExpressionContext) => void
  /**
   * Enter a parse tree produced by `GoParser.primaryExpr`.
   * @param ctx the parse tree
   */
  enterPrimaryExpr?: (ctx: PrimaryExprContext) => void
  /**
   * Exit a parse tree produced by `GoParser.primaryExpr`.
   * @param ctx the parse tree
   */
  exitPrimaryExpr?: (ctx: PrimaryExprContext) => void
  /**
   * Enter a parse tree produced by `GoParser.operand`.
   * @param ctx the parse tree
   */
  enterOperand?: (ctx: OperandContext) => void
  /**
   * Exit a parse tree produced by `GoParser.operand`.
   * @param ctx the parse tree
   */
  exitOperand?: (ctx: OperandContext) => void
  /**
   * Enter a parse tree produced by `GoParser.literal`.
   * @param ctx the parse tree
   */
  enterLiteral?: (ctx: LiteralContext) => void
  /**
   * Exit a parse tree produced by `GoParser.literal`.
   * @param ctx the parse tree
   */
  exitLiteral?: (ctx: LiteralContext) => void
  /**
   * Enter a parse tree produced by `GoParser.basicLit`.
   * @param ctx the parse tree
   */
  enterBasicLit?: (ctx: BasicLitContext) => void
  /**
   * Exit a parse tree produced by `GoParser.basicLit`.
   * @param ctx the parse tree
   */
  exitBasicLit?: (ctx: BasicLitContext) => void
  /**
   * Enter a parse tree produced by `GoParser.operandName`.
   * @param ctx the parse tree
   */
  enterOperandName?: (ctx: OperandNameContext) => void
  /**
   * Exit a parse tree produced by `GoParser.operandName`.
   * @param ctx the parse tree
   */
  exitOperandName?: (ctx: OperandNameContext) => void
  /**
   * Enter a parse tree produced by `GoParser.qualifiedIdent`.
   * @param ctx the parse tree
   */
  enterQualifiedIdent?: (ctx: QualifiedIdentContext) => void
  /**
   * Exit a parse tree produced by `GoParser.qualifiedIdent`.
   * @param ctx the parse tree
   */
  exitQualifiedIdent?: (ctx: QualifiedIdentContext) => void
  /**
   * Enter a parse tree produced by `GoParser.string_`.
   * @param ctx the parse tree
   */
  enterString_?: (ctx: String_Context) => void
  /**
   * Exit a parse tree produced by `GoParser.string_`.
   * @param ctx the parse tree
   */
  exitString_?: (ctx: String_Context) => void
  /**
   * Enter a parse tree produced by `GoParser.functionLit`.
   * @param ctx the parse tree
   */
  enterFunctionLit?: (ctx: FunctionLitContext) => void
  /**
   * Exit a parse tree produced by `GoParser.functionLit`.
   * @param ctx the parse tree
   */
  exitFunctionLit?: (ctx: FunctionLitContext) => void
  /**
   * Enter a parse tree produced by `GoParser.arguments`.
   * @param ctx the parse tree
   */
  enterArguments?: (ctx: ArgumentsContext) => void
  /**
   * Exit a parse tree produced by `GoParser.arguments`.
   * @param ctx the parse tree
   */
  exitArguments?: (ctx: ArgumentsContext) => void
  /**
   * Enter a parse tree produced by `GoParser.methodExpr`.
   * @param ctx the parse tree
   */
  enterMethodExpr?: (ctx: MethodExprContext) => void
  /**
   * Exit a parse tree produced by `GoParser.methodExpr`.
   * @param ctx the parse tree
   */
  exitMethodExpr?: (ctx: MethodExprContext) => void
  /**
   * Enter a parse tree produced by `GoParser.eos`.
   * @param ctx the parse tree
   */
  enterEos?: (ctx: EosContext) => void
  /**
   * Exit a parse tree produced by `GoParser.eos`.
   * @param ctx the parse tree
   */
  exitEos?: (ctx: EosContext) => void
}
