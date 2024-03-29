import GoParserVisitor from '../lang/GoParserVisitor'
import {
  Assignment,
  AstNode,
  Block,
  ChannelType,
  ConditionalStatement,
  DeferStatement,
  Expression,
  ExpressionStatement,
  ForClause,
  ForStmt,
  FunctionDeclaration,
  FunctionLiteral,
  GoStatement,
  Identifier,
  BasicLiteral,
  MethodExpression,
  Operand,
  ParameterDeclaration,
  PrimaryExpr,
  ReturnStatement,
  SendStatement,
  Sequence,
  ShortVarDecl,
  Signature,
  SourceFile,
  Type,
  TypeName,
  VariableDeclaration,
  VariableSpecification,
  Literal,
  SimpleStatement,
  Statement,
} from '../common/astNode'

import { SourceFileContext } from '../lang/GoParser'
import { PackageClauseContext } from '../lang/GoParser'
import { ImportDeclContext } from '../lang/GoParser'
import { ImportSpecContext } from '../lang/GoParser'
import { ImportPathContext } from '../lang/GoParser'
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

  visitSourceFile: (ctx: SourceFileContext) => SourceFile = ctx => {
    const pkg = ctx.packageClause()._packageName.text
    const imports = ctx
      .importDecl_list()
      .map(imp =>
        imp.importSpec_list().map(spec => {
          const ctx = spec.importPath().string_()
          const path = (ctx.RAW_STRING_LIT() || ctx.INTERPRETED_STRING_LIT()).symbol.text
          return path
        })
      )
      .flat()

    const funcDecls = ctx.functionDecl_list().map(decl => this.visitFunctionDecl(decl))
    const varDecls = ctx.varDecl_list().map(decl => this.visitVarDecl(decl))

    return {
      tag: 'src',
      package: pkg,
      imports: imports,
      decls: [...funcDecls, ...varDecls]
    }
  }

  visitPackageClause: (ctx: PackageClauseContext) => AstNode = ctx => {
    return {
      tag: 'package',
      name: ctx._packageName.text
    }
  }

  visitImportDecl: (ctx: ImportDeclContext) => AstNode = ctx => {
    const specs = ctx.importSpec_list().map(spec => spec.accept(this))
    return {
      tag: 'importDecl',
      specs: specs
    }
  }

  visitImportSpec: (ctx: ImportSpecContext) => AstNode = ctx => {
    return {
      tag: 'importSpec',
      path: ctx.importPath().accept(this)
    }
  }

  visitImportPath: (ctx: ImportPathContext) => AstNode = ctx => {
    return {
      tag: 'importPath',
      path: ctx.string_().accept(this)
    }
  }

  visitFunctionDecl: (ctx: FunctionDeclContext) => FunctionDeclaration = ctx => {
    const name = ctx.IDENTIFIER().symbol.text
    const sig = this.visitSignature(ctx.signature())
    const body = this.visitBlock(ctx.block())
    return {
      tag: 'func',
      sym: name,
      sig: sig,
      body: body
    }
  }

  visitVarDecl: (ctx: VarDeclContext) => VariableDeclaration = ctx => {
    const specs = ctx.varSpec_list().map(spec => this.visitVarSpec(spec))
    return {
      tag: 'varDecl',
      specs: specs
    }
  }

  visitVarSpec: (ctx: VarSpecContext) => VariableSpecification = ctx => {
    // ONLY SUPPORTS ASSIGNMENT NOW
    const syms = ctx
      .identifierList()
      .IDENTIFIER_list()
      .map(id => id.symbol.text)
    const exprs = ctx.expressionList()
      ? ctx.expressionList().expression_list().map(exp => this.visitExpression(exp))
      : []
    return {
      tag: 'varSpec',
      syms: syms,
      exprs: exprs,
      type: this.visitType_(ctx.type_())
    }
  }

  visitBlock: (ctx: BlockContext) => Block = ctx => {
    const body = this.visitStatementList(ctx.statementList())
    return {
      tag: 'block',
      body: body
    }
  }

  visitStatementList: (ctx: StatementListContext) => Sequence = ctx => {
    return {
      tag: 'seq',
      stmts: ctx.statement_list().map(stmt => this.visitStatement(stmt))
    }
  }

  visitStatement: (ctx: StatementContext) => Statement = ctx => {
    if (ctx.simpleStmt()) {
      return this.visitSimpleStmt(ctx.simpleStmt())
    } else if (ctx.goStmt()) {
      return this.visitGoStmt(ctx.goStmt());
    } else if (ctx.varDecl()) {
      return this.visitVarDecl(ctx.varDecl())
      // TODO update ltr when supporting these constructs
      // } else if (ctx.returnStmt()) {
      //   return ctx.returnStmt().accept(this);
      // } else if (ctx.block()) {
      //   return ctx.block().accept(this);
      // } else if (ctx.ifStmt()) {
      //   return ctx.ifStmt().accept(this);
      // } else if (ctx.forStmt()) {
      //   return ctx.forStmt().accept(this);
      // } else if (ctx.deferStmt()) {
      //   return ctx.deferStmt().accept(this);
    } else {
      throw new Error('Unknown statement type')
    }
  }

  visitSimpleStmt: (ctx: SimpleStmtContext) => SimpleStatement = ctx => {
    if (ctx.expressionStmt()) {
      return this.visitExpressionStmt(ctx.expressionStmt())
    } else if (ctx.sendStmt()) {
      return this.visitSendStmt(ctx.sendStmt())
    } else if (ctx.assignment()) {
      return this.visitAssignment(ctx.assignment())
    } else if (ctx.shortVarDecl()) {
      return this.visitShortVarDecl(ctx.shortVarDecl())
    } else {
      throw new Error('Unknown simple statement type')
    }
  }

  visitExpressionStmt: (ctx: ExpressionStmtContext) => ExpressionStatement = ctx => {
    return {
      tag: 'expStmt',
      exp: this.visitExpression(ctx.expression())
    }
  }

  visitSendStmt: (ctx: SendStmtContext) => SendStatement = ctx => {
    const chan = this.visitExpression(ctx.expression(0)) as Identifier
    const msg = this.visitExpression(ctx.expression(1))
    return {
      tag: 'send',
      chan: chan,
      msg: msg
    }
  }

  visitAssignment: (ctx: AssignmentContext) => Assignment = ctx => {
    const syms = ctx
      .expressionList(0)
      .expression_list()
      .map(exp => this.visitExpression(exp)) as Identifier[]
    const exprs = ctx
      .expressionList(1)
      .expression_list()
      .map(exp => this.visitExpression(exp))
    return {
      tag: 'assmt',
      syms: syms,
      exprs: exprs
    }
  }

  visitShortVarDecl: (ctx: ShortVarDeclContext) => ShortVarDecl = ctx => {
    const syms = ctx
      .identifierList()
      .IDENTIFIER_list()
      .map(id => id.symbol.text)
    const exprs = ctx
      .expressionList()
      .expression_list()
      .map(exp => this.visitExpression(exp))
    return {
      tag: 'shortVarDecl',
      syms: syms,
      exprs: exprs
    }
  }

  visitReturnStmt: (ctx: ReturnStmtContext) => ReturnStatement = ctx => {
    const exprs = ctx
      .expressionList()
      .expression_list()
      .map(exp => exp.accept(this))
    return {
      tag: 'ret',
      expr: exprs
    }
  }

  visitDeferStmt: (ctx: DeferStmtContext) => DeferStatement = ctx => {
    return {
      tag: 'defer',
      expr: ctx.expression().accept(this)
    }
  }

  visitIfStmt: (ctx: IfStmtContext) => ConditionalStatement = ctx => {
    const cond = ctx.expression().accept(this)
    const cons = ctx.block(0).accept(this)
    const alt = ctx.block(1).accept(this)
    return {
      tag: 'cond',
      cond: cond,
      cons: cons,
      alt: alt
    }
  }

  visitRecvStmt: (ctx: RecvStmtContext) => AstNode = ctx => {
    throw new Error('Not implemented')
  }

  visitForStmt: (ctx: ForStmtContext) => ForStmt = ctx => {
    const clause = ctx.forClause().accept(this)
    const body = ctx.block().accept(this)

    return {
      tag: 'for',
      clause: clause,
      body: body
    }
  }

  visitForClause: (ctx: ForClauseContext) => ForClause = ctx => {
    return {
      tag: 'forClause',
      init: ctx.simpleStmt(0).accept(this),
      cond: ctx.expression().accept(this),
      post: ctx.simpleStmt(1).accept(this)
    }
  }

  visitRangeClause?: (ctx: RangeClauseContext) => AstNode = ctx => {
    // Don't support range clause yet
    throw new Error('Not implemented')
  }

  visitGoStmt: (ctx: GoStmtContext) => GoStatement = ctx => {
    return {
      tag: 'go',
      expr: this.visitExpression(ctx.expression())
    }
  }

  visitType_: (ctx: Type_Context) => Type = ctx => {
    const type = ctx.channelType()
      ? this.visitChannelType(ctx.channelType())
      : this.visitTypeName(ctx.typeName())
    return {
      tag: 'type',
      type
    }
  }

  visitTypeName: (ctx: TypeNameContext) => TypeName = ctx => {
    // Don't support qualified ident yet
    const name = ctx.qualifiedIdent()
      ? ctx.qualifiedIdent().IDENTIFIER_list().join('.')
      : ctx.IDENTIFIER().symbol.text
    return {
      tag: 'typeName',
      name
    }
  }

  visitElementType: (ctx: ElementTypeContext) => Type = ctx => {
    return this.visitType_(ctx.type_())
  }

  visitChannelType: (ctx: ChannelTypeContext) => ChannelType = ctx => {
    return {
      tag: 'chanType',
      elem: this.visitElementType(ctx.elementType())
    }
  }

  visitSignature: (ctx: SignatureContext) => Signature = ctx => {
    const prms = ctx
      .parameters()
      .parameterDecl_list()
      .map(decl => this.visitParameterDecl(decl))
    const result = ctx._result ? this.visitType_(ctx._result) : undefined
    return {
      tag: 'sig',
      parameters: prms,
      result: result
    }
  }

  visitParameterDecl: (ctx: ParameterDeclContext) => ParameterDeclaration = ctx => {
    const syms = ctx
      .identifierList()
      .IDENTIFIER_list()
      .map(id => id.symbol.text)
    const type = this.visitType_(ctx.type_())
    return {
      tag: 'param',
      syms: syms,
      type: type
    }
  }

  visitExpression: (ctx: ExpressionContext) => Expression = ctx => {
    if (ctx.primaryExpr()) {
      return this.visitPrimaryExpr(ctx.primaryExpr())
    } else if (ctx._unary_op) {
      return {
        tag: 'unop',
        sym: ctx._unary_op.text,
        expr: this.visitExpression(ctx.expression(0))
      }
    } else if (ctx._mul_op || ctx._add_op) {
      return {
        tag: 'binop',
        sym: (ctx._mul_op || ctx._add_op).text,
        frst: this.visitExpression(ctx.expression(0)),
        scnd: this.visitExpression(ctx.expression(1))
      }
    } else if (ctx._rel_op) {
      return {
        tag: 'log',
        sym: ctx._rel_op.text,
        frst: this.visitExpression(ctx.expression(0)),
        scnd: this.visitExpression(ctx.expression(1))
      }
    } else {
      throw new Error('Unknown expression type')
    }
  }

  visitPrimaryExpr: (ctx: PrimaryExprContext) => PrimaryExpr = ctx => {
    if (ctx.operand()) {
      return this.visitOperand(ctx.operand())
    } else if (ctx.methodExpr()) {
      return this.visitMethodExpr(ctx.methodExpr())
    } else if (ctx.IDENTIFIER()) {
      return {
        tag: 'primSel',
        sel: this.visitPrimaryExpr(ctx.primaryExpr()),
        ident: ctx.IDENTIFIER().symbol.text
      }
    } else if (ctx.arguments()) {
      const args = []
      if (ctx.arguments().type_()) {
        args.push(this.visitType_(ctx.arguments().type_()))
      }
      if (ctx.arguments().expressionList()) {
        ctx.arguments().expressionList().expression_list().map(arg => args.push(this.visitExpression(arg)))
      }
      return {
        tag: 'primArg',
        expr: this.visitPrimaryExpr(ctx.primaryExpr()),
        args
      }
    } else {
      throw new Error('Unknown primary expression type')
    }
  }

  visitOperand: (ctx: OperandContext) => Operand = ctx => {
    if (ctx.literal()) {
      return this.visitLiteral(ctx.literal())
    } else if (ctx.operandName()) {
      return this.visitOperandName(ctx.operandName())
    } else if (ctx.expression()) {
      return {
        tag: 'parenExp',
        exp: this.visitExpression(ctx.expression())
      }
    } else {
      throw new Error('Unknown operand type')
    }
  }

  visitLiteral: (ctx: LiteralContext) => Literal = ctx => {
    if (ctx.basicLit()) {
      return this.visitBasicLit(ctx.basicLit())
    } else if (ctx.functionLit()) {
      return this.visitFunctionLit(ctx.functionLit())
    } else {
      throw new Error('Unknown literal type')
    }
  }

  visitBasicLit: (ctx: BasicLitContext) => BasicLiteral = ctx => {
    const value = (
      ctx.DECIMAL_LIT() ||
      ctx.NIL_LIT() ||
      ctx.string_().RAW_STRING_LIT() ||
      ctx.string_().INTERPRETED_STRING_LIT()
    ).symbol.text

    return {
      tag: 'literal',
      value: ctx.DECIMAL_LIT() ? Number(value) : value
    }
  }

  visitOperandName: (ctx: OperandNameContext) => Identifier = ctx => {
    return {
      tag: 'ident',
      name: ctx.IDENTIFIER().symbol.text
    }
  }

  visitString_: (ctx: String_Context) => BasicLiteral = ctx => {
    const value = (ctx.RAW_STRING_LIT() || ctx.INTERPRETED_STRING_LIT()).symbol.text
    return {
      tag: 'literal',
      value: value
    }
  }

  visitFunctionLit: (ctx: FunctionLitContext) => FunctionLiteral = ctx => {
    const sig = this.visitSignature(ctx.signature())
    const body = this.visitBlock(ctx.block())
    return {
      tag: 'funcLit',
      sig: sig,
      body: body
    }
  }

  visitMethodExpr: (ctx: MethodExprContext) => MethodExpression = ctx => {
    return {
      tag: 'meth',
      recv: this.visitType_(ctx.type_()),
      ident: ctx.IDENTIFIER().symbol.text
    }
  }

  visitEos: (ctx: EosContext) => AstNode = ctx => {
    throw new Error('Not implemented')
  }
}
