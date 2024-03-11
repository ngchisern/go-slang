import GoParserVisitor from '../lang/GoParserVisitor'
import { Arguments, Assignment, AstNode, Block, ChannelType, ConditionalStatement, DeferStatement, ForClause, ForStmt, FunctionDeclaration, FunctionLiteral, GoStatement, Identifier, Literal, MethodExpression, ParameterDeclaration, Parameters, QualifiedIdentifier, ReturnStatement, SendStatement, Sequence, ShortValDecl, Signature, SourceFile, Type, TypeName, VariableDeclaration, VariableSpecification } from './astNode'

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
  visit: (tree: ParseTree) => AstNode

  visitChildren: (node: RuleNode) => AstNode

  visitTerminal: (node: TerminalNode) => AstNode

  visitErrorNode: (node: ErrorNode) => AstNode

  visitSourceFile: (ctx: SourceFileContext) => SourceFile = (ctx) => {
    const pkg = ctx.packageClause()._packageName.text;
    const imports = ctx.importDecl_list().map((imp) => imp.importSpec_list().map((spec) => spec._alias.text)).flat();

    const funcDecls = ctx.functionDecl_list().map((decl) => decl.accept(this));
    const varDecls = ctx.varDecl_list().map((decl) => decl.accept(this));
    const decls = funcDecls.concat(varDecls);

    return {
      tag: 'src',
      package: pkg,
      imports: imports,
      decls: decls,
    }
  }

  visitPackageClause: (ctx: PackageClauseContext) => AstNode = (ctx) => {
    return {
      tag: 'package',
      name: ctx._packageName.text,
    }
  }

  visitImportDecl: (ctx: ImportDeclContext) => AstNode = (ctx) => {
    const specs = ctx.importSpec_list().map((spec) => spec.accept(this));
    return {
      tag: 'importDecl',
      specs: specs,
    }
  }

  visitImportSpec: (ctx: ImportSpecContext) => AstNode = (ctx) => {
    const alias = ctx._alias.text;
    const path = ctx.importPath().accept(this);
    return {
      tag: 'importSpec',
      alias: alias,
      path: path,
    }
  }

  visitImportPath: (ctx: ImportPathContext) => AstNode = (ctx) => {
    return {
      tag: 'importPath',
      path: ctx.string_().accept(this),
    }
  }

  visitIdentifierList: (ctx: IdentifierListContext) => AstNode = (ctx) => {
    return {
      tag: 'identifierList',
      names: ctx.IDENTIFIER_list().map((id) => id.symbol.text),
    }
  }


  visitExpressionList: (ctx: ExpressionListContext) => Sequence = (ctx) => {
    return {
      tag: 'seq',
      stmts: ctx.expression_list().map((exp) => exp.accept(this)),
    }
  }

  visitFunctionDecl: (ctx: FunctionDeclContext) => FunctionDeclaration = (ctx) => {
    const name = ctx.IDENTIFIER().symbol.text;
    const sig = ctx.signature().accept(this);
    const body = ctx.block().accept(this);
    return {
      tag: 'func',
      sym: name,
      sig: sig,
      body: body,
    }
  }


  visitVarDecl: (ctx: VarDeclContext) => VariableDeclaration = (ctx) => {
    const specs = ctx.varSpec_list().map((spec) => spec.accept(this));
    return {
      tag: 'varDecl',
      specs: specs,
    }
  }

  visitVarSpec: (ctx: VarSpecContext) => VariableSpecification = (ctx) => {
    // ONLY SUPPORTS ASSIGNMENT NOW
    const syms = ctx.identifierList().IDENTIFIER_list().map((id) => id.symbol.text);
    const exprs = ctx.expressionList().expression_list().map((exp) => exp.accept(this));
    return {
      tag: 'varSpec',
      syms: syms,
      exprs: exprs,
    }
  }

  visitBlock: (ctx: BlockContext) => Block = (ctx) => {
    const body = ctx.statementList().accept(this);
    return {
      tag: 'block',
      body: body
    }
  }

  visitStatementList: (ctx: StatementListContext) => Sequence = (ctx) => {
    return {
      tag: 'seq',
      stmts: ctx.statement_list().map((stmt) => stmt.accept(this)),
    }
  }

  visitStatement: (ctx: StatementContext) => AstNode = (ctx) => {
    if (ctx.simpleStmt()) {
      return ctx.simpleStmt().accept(this);
    } else if (ctx.varDecl()) {
      return ctx.varDecl().accept(this);
    } else if (ctx.goStmt()) {
      return ctx.goStmt().accept(this);
    } else if (ctx.returnStmt()) {
      return ctx.returnStmt().accept(this);
    } else if (ctx.block()) {
      return ctx.block().accept(this);
    } else if (ctx.ifStmt()) {
      return ctx.ifStmt().accept(this);
    } else if (ctx.forStmt()) {
      return ctx.forStmt().accept(this);
    } else if (ctx.deferStmt()) {
      return ctx.deferStmt().accept(this);
    } else {
      throw new Error('Unknown statement type');
    }
  }

  visitSimpleStmt: (ctx: SimpleStmtContext) => AstNode = (ctx) => {
    if (ctx.expressionStmt()) {
      return ctx.expressionStmt().accept(this);
    } else if (ctx.sendStmt()) {
      return ctx.sendStmt().accept(this);
    } else if (ctx.assignment()) {
      return ctx.assignment().accept(this);
    } else if (ctx.shortVarDecl()) {
      return ctx.shortVarDecl().accept(this);
    } else {
      throw new Error('Unknown simple statement type');
    }
  }

  visitExpressionStmt: (ctx: ExpressionStmtContext) => AstNode = (ctx) => {
    return ctx.expression().accept(this);
  }


  visitSendStmt: (ctx: SendStmtContext) => SendStatement = (ctx) => {
    const chan = ctx.expression(0).accept(this);
    const msg = ctx.expression(1).accept(this);
    return {
      tag: 'send',
      chan: chan,
      msg: msg,
    }
  }

  visitAssignment: (ctx: AssignmentContext) => Assignment = (ctx) => {
    const syms = ctx.expressionList(0).expression_list().map((exp) => exp.accept(this));
    const exprs = ctx.expressionList(1).expression_list().map((exp) => exp.accept(this));
    return {
      tag: 'assmt',
      syms: syms,
      exprs: exprs,
    }
  }

  visitShortVarDecl: (ctx: ShortVarDeclContext) => ShortValDecl = (ctx) => {
    const syms = ctx.identifierList().IDENTIFIER_list().map((id) => id.symbol.text);
    const exprs = ctx.expressionList().expression_list().map((exp) => exp.accept(this));
    return {
      tag: 'shortValDecl',
      syms: syms,
      exprs: exprs,
    }
  }

  visitReturnStmt: (ctx: ReturnStmtContext) => ReturnStatement = (ctx) => {
    const exprs = ctx.expressionList().expression_list().map((exp) => exp.accept(this));
    return {
      tag: 'ret',
      expr: exprs,
    }
  }


  visitDeferStmt: (ctx: DeferStmtContext) => DeferStatement = (ctx) => {
    return {
      tag: 'defer',
      expr: ctx.expression().accept(this),
    }
  }

  visitIfStmt: (ctx: IfStmtContext) => ConditionalStatement = (ctx) => {
    const cond = ctx.expression().accept(this);
    const cons = ctx.block(0).accept(this);
    const alt = ctx.block(1).accept(this);
    return {
      tag: 'cond',
      cond: cond,
      cons: cons,
      alt: alt,
    }
  }

  visitRecvStmt: (ctx: RecvStmtContext) => AstNode = (ctx) => {
    throw new Error('Not implemented');
  }

  visitForStmt: (ctx: ForStmtContext) => ForStmt = (ctx) => {
    const clause = ctx.forClause().accept(this);
    const body = ctx.block().accept(this);

    return {
      tag: 'for',
      clause: clause,
      body: body,
    }
  }

  visitForClause: (ctx: ForClauseContext) => ForClause = (ctx) => {
    return {
      tag: 'forClause',
      init: ctx.simpleStmt(0).accept(this),
      cond: ctx.expression().accept(this),
      post: ctx.simpleStmt(1).accept(this),
    }
  }

  visitRangeClause?: (ctx: RangeClauseContext) => AstNode = (ctx) => {
    // Don't support range clause yet
    throw new Error('Not implemented');
  }

  visitGoStmt: (ctx: GoStmtContext) => GoStatement = (ctx) => {
    return {
      tag: 'go',
      expr: ctx.expression().accept(this),
    }
  }

  visitType_: (ctx: Type_Context) => Type = (ctx) => {
    return {
      tag: 'type',
      type: ctx.typeName().accept(this),
    }
  }

  visitTypeName: (ctx: TypeNameContext) => TypeName = (ctx) => {
    // Don't support qualified ident yet
    return {
      tag: 'typeName',
      name: ctx.IDENTIFIER().symbol.text,
    }
  }

  visitElementType: (ctx: ElementTypeContext) => Type = (ctx) => {
    return this.visitType_(ctx.type_());
  }

  visitChannelType: (ctx: ChannelTypeContext) => ChannelType = (ctx) => {
    return {
      tag: 'chanType',
      elem: ctx.elementType().accept(this),
    }
  }

  visitSignature: (ctx: SignatureContext) => Signature = (ctx) => {
    const prms = ctx.parameters().accept(this);
    const result = ctx._result.accept(this);
    return {
      tag: 'sig',
      parameters: prms,
      result: result,
    }
  }

  visitParameters: (ctx: ParametersContext) => Parameters = (ctx) => {
    return {
      tag: 'params',
      list: ctx.parameterDecl_list().map((decl) => decl.accept(this)),
    }
  }

  visitParameterDecl: (ctx: ParameterDeclContext) => ParameterDeclaration = (ctx) => {
    const syms = ctx.identifierList().IDENTIFIER_list().map((id) => id.symbol.text);
    const type = ctx.type_().accept(this);
    return {
      tag: 'param',
      syms: syms,
      type: type,
    }
  }

  visitExpression: (ctx: ExpressionContext) => AstNode = (ctx) => {
    if (ctx.primaryExpr()) {
      return ctx.primaryExpr().accept(this);
    } else if (ctx._unary_op) {
      return {
        tag: 'unop',
        sym: ctx._unary_op.text,
        expr: ctx.expression(0).accept(this),
      };
    } else if (ctx._mul_op || ctx._add_op) {
      return {
        tag: 'binop',
        sym: ctx._mul_op.text || ctx._add_op.text || ctx._rel_op.text,
        frst: ctx.expression(0).accept(this),
        scnd: ctx.expression(1).accept(this),
      };
    } else if (ctx._rel_op) {
      return {
        tag: 'log',
        sym: ctx._rel_op.text,
        frst: ctx.expression(0).accept(this),
        scnd: ctx.expression(1).accept(this),
      };
    } else {
      throw new Error('Unknown expression type');
    }
  }

  visitPrimaryExpr: (ctx: PrimaryExprContext) => AstNode = (ctx) => {
    if (ctx.operand()) {
      return ctx.operand().accept(this);
    } else if (ctx.methodExpr()) {
      return ctx.methodExpr().accept(this);
    } else if (ctx.IDENTIFIER()) {
      return {
        tag: 'primSel',
        ident: ctx.IDENTIFIER().symbol.text,
      }
    } else if (ctx.arguments()) {
      return {
        tag: 'primArg',
        expr: ctx.primaryExpr().accept(this),
        args: ctx.arguments().expressionList().expression_list().map((arg) => arg.accept(this)),
      }
    } else {
      throw new Error('Unknown primary expression type');
    }
  }

  visitOperand?: (ctx: OperandContext) => AstNode = (ctx) => {
    if (ctx.literal()) {
      return ctx.literal().accept(this);
    } else if (ctx.operandName()) {
      return ctx.operandName().accept(this);
    } else if (ctx.expression()) {
      return ctx.expression().accept(this);
    } else {
      throw new Error('Unknown operand type');
    }
  }

  visitLiteral: (ctx: LiteralContext) => AstNode = (ctx) => {
    if (ctx.basicLit()) {
      return ctx.basicLit().accept(this);
    } else if (ctx.functionLit()) {
      return ctx.functionLit().accept(this);
    } else {
      throw new Error('Unknown literal type');
    }
  }

  visitBasicLit: (ctx: BasicLitContext) => Literal = (ctx) => {
    const value = (ctx.DECIMAL_LIT() || ctx.NIL_LIT() || ctx.string_()).symbol.text;
    return {
      tag: 'literal',
      value: value,
    }
  }

  visitOperandName: (ctx: OperandNameContext) => Identifier = (ctx) => {
    return {
      tag: 'ident',
      name: ctx.IDENTIFIER().symbol.text,
    }
  }

  visitQualifiedIdent: (ctx: QualifiedIdentContext) => QualifiedIdentifier = (ctx) => {
    return {
      tag: 'qualIdent',
      pkg: ctx.IDENTIFIER(0).symbol.text,
      ident: ctx.IDENTIFIER(1).symbol.text,
    }
  }

  visitString_: (ctx: String_Context) => Literal = (ctx) => {
    const value = (ctx.RAW_STRING_LIT() || ctx.INTERPRETED_STRING_LIT()).symbol.text;
    return {
      tag: 'literal',
      value: value,
    }
  }

  visitFunctionLit: (ctx: FunctionLitContext) => FunctionLiteral = (ctx) => {
    const sig = ctx.signature().accept(this);
    const body = ctx.block().accept(this);
    return {
      tag: 'funcLit',
      sig: sig,
      body: body,
    }
  }

  visitArguments: (ctx: ArgumentsContext) => Arguments = (ctx) => {
    return {
      tag: 'args',
      list: ctx.expressionList().expression_list().map((exp) => exp.accept(this)),
    }
  }

  visitMethodExpr: (ctx: MethodExprContext) => MethodExpression = (ctx) => {
    return {
      tag: 'meth',
      recv: ctx.type_().accept(this),
      ident: ctx.IDENTIFIER().symbol.text,
    }
  }

  visitEos: (ctx: EosContext) => AstNode = (ctx) => {
    throw new Error('Not implemented');
  }
}
