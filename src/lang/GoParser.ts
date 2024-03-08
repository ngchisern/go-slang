// Generated from GoParser.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
  ATN,
  ATNDeserializer,
  DecisionState,
  DFA,
  FailedPredicateException,
  RecognitionException,
  NoViableAltException,
  BailErrorStrategy,
  Parser,
  ParserATNSimulator,
  RuleContext,
  ParserRuleContext,
  PredictionMode,
  PredictionContextCache,
  TerminalNode,
  RuleNode,
  Token,
  TokenStream,
  Interval,
  IntervalSet
} from 'antlr4'
import GoParserListener from './GoParserListener.js'
import GoParserVisitor from './GoParserVisitor.js'

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number

import GoParserBase from './GoParserBase'

export default class GoParser extends GoParserBase {
  public static readonly BREAK = 1
  public static readonly DEFAULT = 2
  public static readonly FUNC = 3
  public static readonly INTERFACE = 4
  public static readonly SELECT = 5
  public static readonly CASE = 6
  public static readonly DEFER = 7
  public static readonly GO = 8
  public static readonly MAP = 9
  public static readonly STRUCT = 10
  public static readonly CHAN = 11
  public static readonly ELSE = 12
  public static readonly GOTO = 13
  public static readonly PACKAGE = 14
  public static readonly SWITCH = 15
  public static readonly CONST = 16
  public static readonly FALLTHROUGH = 17
  public static readonly IF = 18
  public static readonly RANGE = 19
  public static readonly TYPE = 20
  public static readonly CONTINUE = 21
  public static readonly FOR = 22
  public static readonly IMPORT = 23
  public static readonly RETURN = 24
  public static readonly VAR = 25
  public static readonly NIL_LIT = 26
  public static readonly IDENTIFIER = 27
  public static readonly L_PAREN = 28
  public static readonly R_PAREN = 29
  public static readonly L_CURLY = 30
  public static readonly R_CURLY = 31
  public static readonly L_BRACKET = 32
  public static readonly R_BRACKET = 33
  public static readonly ASSIGN = 34
  public static readonly COMMA = 35
  public static readonly SEMI = 36
  public static readonly COLON = 37
  public static readonly DOT = 38
  public static readonly PLUS_PLUS = 39
  public static readonly MINUS_MINUS = 40
  public static readonly DECLARE_ASSIGN = 41
  public static readonly ELLIPSIS = 42
  public static readonly LOGICAL_OR = 43
  public static readonly LOGICAL_AND = 44
  public static readonly EQUALS = 45
  public static readonly NOT_EQUALS = 46
  public static readonly LESS = 47
  public static readonly LESS_OR_EQUALS = 48
  public static readonly GREATER = 49
  public static readonly GREATER_OR_EQUALS = 50
  public static readonly OR = 51
  public static readonly DIV = 52
  public static readonly MOD = 53
  public static readonly LSHIFT = 54
  public static readonly RSHIFT = 55
  public static readonly BIT_CLEAR = 56
  public static readonly UNDERLYING = 57
  public static readonly EXCLAMATION = 58
  public static readonly PLUS = 59
  public static readonly MINUS = 60
  public static readonly CARET = 61
  public static readonly STAR = 62
  public static readonly AMPERSAND = 63
  public static readonly RECEIVE = 64
  public static readonly DECIMAL_LIT = 65
  public static readonly BINARY_LIT = 66
  public static readonly OCTAL_LIT = 67
  public static readonly HEX_LIT = 68
  public static readonly FLOAT_LIT = 69
  public static readonly DECIMAL_FLOAT_LIT = 70
  public static readonly HEX_FLOAT_LIT = 71
  public static readonly IMAGINARY_LIT = 72
  public static readonly RUNE_LIT = 73
  public static readonly BYTE_VALUE = 74
  public static readonly OCTAL_BYTE_VALUE = 75
  public static readonly HEX_BYTE_VALUE = 76
  public static readonly LITTLE_U_VALUE = 77
  public static readonly BIG_U_VALUE = 78
  public static readonly RAW_STRING_LIT = 79
  public static readonly INTERPRETED_STRING_LIT = 80
  public static readonly WS = 81
  public static readonly COMMENT = 82
  public static readonly TERMINATOR = 83
  public static readonly LINE_COMMENT = 84
  public static readonly WS_NLSEMI = 85
  public static readonly COMMENT_NLSEMI = 86
  public static readonly LINE_COMMENT_NLSEMI = 87
  public static readonly EOS = 88
  public static readonly OTHER = 89
  public static readonly EOF = Token.EOF
  public static readonly RULE_sourceFile = 0
  public static readonly RULE_packageClause = 1
  public static readonly RULE_importDecl = 2
  public static readonly RULE_importSpec = 3
  public static readonly RULE_importPath = 4
  public static readonly RULE_identifierList = 5
  public static readonly RULE_expressionList = 6
  public static readonly RULE_functionDecl = 7
  public static readonly RULE_varDecl = 8
  public static readonly RULE_varSpec = 9
  public static readonly RULE_block = 10
  public static readonly RULE_statementList = 11
  public static readonly RULE_statement = 12
  public static readonly RULE_simpleStmt = 13
  public static readonly RULE_expressionStmt = 14
  public static readonly RULE_sendStmt = 15
  public static readonly RULE_assignment = 16
  public static readonly RULE_shortVarDecl = 17
  public static readonly RULE_returnStmt = 18
  public static readonly RULE_deferStmt = 19
  public static readonly RULE_ifStmt = 20
  public static readonly RULE_recvStmt = 21
  public static readonly RULE_forStmt = 22
  public static readonly RULE_forClause = 23
  public static readonly RULE_rangeClause = 24
  public static readonly RULE_goStmt = 25
  public static readonly RULE_type_ = 26
  public static readonly RULE_typeName = 27
  public static readonly RULE_elementType = 28
  public static readonly RULE_channelType = 29
  public static readonly RULE_signature = 30
  public static readonly RULE_parameters = 31
  public static readonly RULE_parameterDecl = 32
  public static readonly RULE_expression = 33
  public static readonly RULE_primaryExpr = 34
  public static readonly RULE_operand = 35
  public static readonly RULE_literal = 36
  public static readonly RULE_basicLit = 37
  public static readonly RULE_operandName = 38
  public static readonly RULE_qualifiedIdent = 39
  public static readonly RULE_string_ = 40
  public static readonly RULE_functionLit = 41
  public static readonly RULE_arguments = 42
  public static readonly RULE_methodExpr = 43
  public static readonly RULE_eos = 44
  public static readonly literalNames: (string | null)[] = [
    null,
    "'break'",
    "'default'",
    "'func'",
    "'interface'",
    "'select'",
    "'case'",
    "'defer'",
    "'go'",
    "'map'",
    "'struct'",
    "'chan'",
    "'else'",
    "'goto'",
    "'package'",
    "'switch'",
    "'const'",
    "'fallthrough'",
    "'if'",
    "'range'",
    "'type'",
    "'continue'",
    "'for'",
    "'import'",
    "'return'",
    "'var'",
    "'nil'",
    null,
    "'('",
    "')'",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "'='",
    "','",
    "';'",
    "':'",
    "'.'",
    "'++'",
    "'--'",
    "':='",
    "'...'",
    "'||'",
    "'&&'",
    "'=='",
    "'!='",
    "'<'",
    "'<='",
    "'>'",
    "'>='",
    "'|'",
    "'/'",
    "'%'",
    "'<<'",
    "'>>'",
    "'&^'",
    "'~'",
    "'!'",
    "'+'",
    "'-'",
    "'^'",
    "'*'",
    "'&'",
    "'<-'"
  ]
  public static readonly symbolicNames: (string | null)[] = [
    null,
    'BREAK',
    'DEFAULT',
    'FUNC',
    'INTERFACE',
    'SELECT',
    'CASE',
    'DEFER',
    'GO',
    'MAP',
    'STRUCT',
    'CHAN',
    'ELSE',
    'GOTO',
    'PACKAGE',
    'SWITCH',
    'CONST',
    'FALLTHROUGH',
    'IF',
    'RANGE',
    'TYPE',
    'CONTINUE',
    'FOR',
    'IMPORT',
    'RETURN',
    'VAR',
    'NIL_LIT',
    'IDENTIFIER',
    'L_PAREN',
    'R_PAREN',
    'L_CURLY',
    'R_CURLY',
    'L_BRACKET',
    'R_BRACKET',
    'ASSIGN',
    'COMMA',
    'SEMI',
    'COLON',
    'DOT',
    'PLUS_PLUS',
    'MINUS_MINUS',
    'DECLARE_ASSIGN',
    'ELLIPSIS',
    'LOGICAL_OR',
    'LOGICAL_AND',
    'EQUALS',
    'NOT_EQUALS',
    'LESS',
    'LESS_OR_EQUALS',
    'GREATER',
    'GREATER_OR_EQUALS',
    'OR',
    'DIV',
    'MOD',
    'LSHIFT',
    'RSHIFT',
    'BIT_CLEAR',
    'UNDERLYING',
    'EXCLAMATION',
    'PLUS',
    'MINUS',
    'CARET',
    'STAR',
    'AMPERSAND',
    'RECEIVE',
    'DECIMAL_LIT',
    'BINARY_LIT',
    'OCTAL_LIT',
    'HEX_LIT',
    'FLOAT_LIT',
    'DECIMAL_FLOAT_LIT',
    'HEX_FLOAT_LIT',
    'IMAGINARY_LIT',
    'RUNE_LIT',
    'BYTE_VALUE',
    'OCTAL_BYTE_VALUE',
    'HEX_BYTE_VALUE',
    'LITTLE_U_VALUE',
    'BIG_U_VALUE',
    'RAW_STRING_LIT',
    'INTERPRETED_STRING_LIT',
    'WS',
    'COMMENT',
    'TERMINATOR',
    'LINE_COMMENT',
    'WS_NLSEMI',
    'COMMENT_NLSEMI',
    'LINE_COMMENT_NLSEMI',
    'EOS',
    'OTHER'
  ]
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'sourceFile',
    'packageClause',
    'importDecl',
    'importSpec',
    'importPath',
    'identifierList',
    'expressionList',
    'functionDecl',
    'varDecl',
    'varSpec',
    'block',
    'statementList',
    'statement',
    'simpleStmt',
    'expressionStmt',
    'sendStmt',
    'assignment',
    'shortVarDecl',
    'returnStmt',
    'deferStmt',
    'ifStmt',
    'recvStmt',
    'forStmt',
    'forClause',
    'rangeClause',
    'goStmt',
    'type_',
    'typeName',
    'elementType',
    'channelType',
    'signature',
    'parameters',
    'parameterDecl',
    'expression',
    'primaryExpr',
    'operand',
    'literal',
    'basicLit',
    'operandName',
    'qualifiedIdent',
    'string_',
    'functionLit',
    'arguments',
    'methodExpr',
    'eos'
  ]
  public get grammarFileName(): string {
    return 'GoParser.g4'
  }
  public get literalNames(): (string | null)[] {
    return GoParser.literalNames
  }
  public get symbolicNames(): (string | null)[] {
    return GoParser.symbolicNames
  }
  public get ruleNames(): string[] {
    return GoParser.ruleNames
  }
  public get serializedATN(): number[] {
    return GoParser._serializedATN
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string
  ): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message)
  }

  constructor(input: TokenStream) {
    super(input)
    this._interp = new ParserATNSimulator(
      this,
      GoParser._ATN,
      GoParser.DecisionsToDFA,
      new PredictionContextCache()
    )
  }
  // @RuleVersion(0)
  public sourceFile(): SourceFileContext {
    let localctx: SourceFileContext = new SourceFileContext(this, this._ctx, this.state)
    this.enterRule(localctx, 0, GoParser.RULE_sourceFile)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 90
        this.packageClause()
        this.state = 91
        this.eos()
        this.state = 97
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        while (_la === 23) {
          {
            {
              this.state = 92
              this.importDecl()
              this.state = 93
              this.eos()
            }
          }
          this.state = 99
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        }
        this.state = 108
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        while (_la === 3 || _la === 25) {
          {
            {
              this.state = 102
              this._errHandler.sync(this)
              switch (this._input.LA(1)) {
                case 3:
                  {
                    this.state = 100
                    this.functionDecl()
                  }
                  break
                case 25:
                  {
                    this.state = 101
                    this.varDecl()
                  }
                  break
                default:
                  throw new NoViableAltException(this)
              }
              this.state = 104
              this.eos()
            }
          }
          this.state = 110
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        }
        this.state = 111
        this.match(GoParser.EOF)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public packageClause(): PackageClauseContext {
    let localctx: PackageClauseContext = new PackageClauseContext(this, this._ctx, this.state)
    this.enterRule(localctx, 2, GoParser.RULE_packageClause)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 113
        this.match(GoParser.PACKAGE)
        this.state = 114
        localctx._packageName = this.match(GoParser.IDENTIFIER)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public importDecl(): ImportDeclContext {
    let localctx: ImportDeclContext = new ImportDeclContext(this, this._ctx, this.state)
    this.enterRule(localctx, 4, GoParser.RULE_importDecl)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 116
        this.match(GoParser.IMPORT)
        this.state = 128
        this._errHandler.sync(this)
        switch (this._input.LA(1)) {
          case 27:
          case 38:
          case 79:
          case 80:
            {
              this.state = 117
              this.importSpec()
            }
            break
          case 28:
            {
              this.state = 118
              this.match(GoParser.L_PAREN)
              this.state = 124
              this._errHandler.sync(this)
              _la = this._input.LA(1)
              while (_la === 27 || _la === 38 || _la === 79 || _la === 80) {
                {
                  {
                    this.state = 119
                    this.importSpec()
                    this.state = 120
                    this.eos()
                  }
                }
                this.state = 126
                this._errHandler.sync(this)
                _la = this._input.LA(1)
              }
              this.state = 127
              this.match(GoParser.R_PAREN)
            }
            break
          default:
            throw new NoViableAltException(this)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public importSpec(): ImportSpecContext {
    let localctx: ImportSpecContext = new ImportSpecContext(this, this._ctx, this.state)
    this.enterRule(localctx, 6, GoParser.RULE_importSpec)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 131
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === 27 || _la === 38) {
          {
            this.state = 130
            localctx._alias = this._input.LT(1)
            _la = this._input.LA(1)
            if (!(_la === 27 || _la === 38)) {
              localctx._alias = this._errHandler.recoverInline(this)
            } else {
              this._errHandler.reportMatch(this)
              this.consume()
            }
          }
        }

        this.state = 133
        this.importPath()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public importPath(): ImportPathContext {
    let localctx: ImportPathContext = new ImportPathContext(this, this._ctx, this.state)
    this.enterRule(localctx, 8, GoParser.RULE_importPath)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 135
        this.string_()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public identifierList(): IdentifierListContext {
    let localctx: IdentifierListContext = new IdentifierListContext(this, this._ctx, this.state)
    this.enterRule(localctx, 10, GoParser.RULE_identifierList)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 137
        this.match(GoParser.IDENTIFIER)
        this.state = 142
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        while (_la === 35) {
          {
            {
              this.state = 138
              this.match(GoParser.COMMA)
              this.state = 139
              this.match(GoParser.IDENTIFIER)
            }
          }
          this.state = 144
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public expressionList(): ExpressionListContext {
    let localctx: ExpressionListContext = new ExpressionListContext(this, this._ctx, this.state)
    this.enterRule(localctx, 12, GoParser.RULE_expressionList)
    try {
      let _alt: number
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 145
        this.expression(0)
        this.state = 150
        this._errHandler.sync(this)
        _alt = this._interp.adaptivePredict(this._input, 7, this._ctx)
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 146
                this.match(GoParser.COMMA)
                this.state = 147
                this.expression(0)
              }
            }
          }
          this.state = 152
          this._errHandler.sync(this)
          _alt = this._interp.adaptivePredict(this._input, 7, this._ctx)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public functionDecl(): FunctionDeclContext {
    let localctx: FunctionDeclContext = new FunctionDeclContext(this, this._ctx, this.state)
    this.enterRule(localctx, 14, GoParser.RULE_functionDecl)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 153
        this.match(GoParser.FUNC)
        this.state = 154
        this.match(GoParser.IDENTIFIER)
        this.state = 155
        this.signature()
        this.state = 157
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 8, this._ctx)) {
          case 1:
            {
              this.state = 156
              this.block()
            }
            break
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public varDecl(): VarDeclContext {
    let localctx: VarDeclContext = new VarDeclContext(this, this._ctx, this.state)
    this.enterRule(localctx, 16, GoParser.RULE_varDecl)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 159
        this.match(GoParser.VAR)
        this.state = 171
        this._errHandler.sync(this)
        switch (this._input.LA(1)) {
          case 27:
            {
              this.state = 160
              this.varSpec()
            }
            break
          case 28:
            {
              this.state = 161
              this.match(GoParser.L_PAREN)
              this.state = 167
              this._errHandler.sync(this)
              _la = this._input.LA(1)
              while (_la === 27) {
                {
                  {
                    this.state = 162
                    this.varSpec()
                    this.state = 163
                    this.eos()
                  }
                }
                this.state = 169
                this._errHandler.sync(this)
                _la = this._input.LA(1)
              }
              this.state = 170
              this.match(GoParser.R_PAREN)
            }
            break
          default:
            throw new NoViableAltException(this)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public varSpec(): VarSpecContext {
    let localctx: VarSpecContext = new VarSpecContext(this, this._ctx, this.state)
    this.enterRule(localctx, 18, GoParser.RULE_varSpec)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 173
        this.identifierList()
        this.state = 181
        this._errHandler.sync(this)
        switch (this._input.LA(1)) {
          case 11:
          case 27:
            {
              this.state = 174
              this.type_()
              this.state = 177
              this._errHandler.sync(this)
              switch (this._interp.adaptivePredict(this._input, 11, this._ctx)) {
                case 1:
                  {
                    this.state = 175
                    this.match(GoParser.ASSIGN)
                    this.state = 176
                    this.expressionList()
                  }
                  break
              }
            }
            break
          case 34:
            {
              this.state = 179
              this.match(GoParser.ASSIGN)
              this.state = 180
              this.expressionList()
            }
            break
          default:
            throw new NoViableAltException(this)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public block(): BlockContext {
    let localctx: BlockContext = new BlockContext(this, this._ctx, this.state)
    this.enterRule(localctx, 20, GoParser.RULE_block)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 183
        this.match(GoParser.L_CURLY)
        this.state = 185
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 13, this._ctx)) {
          case 1:
            {
              this.state = 184
              this.statementList()
            }
            break
        }
        this.state = 187
        this.match(GoParser.R_CURLY)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public statementList(): StatementListContext {
    let localctx: StatementListContext = new StatementListContext(this, this._ctx, this.state)
    this.enterRule(localctx, 22, GoParser.RULE_statementList)
    let _la: number
    try {
      let _alt: number
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 201
        this._errHandler.sync(this)
        _alt = 1
        do {
          switch (_alt) {
            case 1:
              {
                {
                  this.state = 196
                  this._errHandler.sync(this)
                  switch (this._interp.adaptivePredict(this._input, 16, this._ctx)) {
                    case 1:
                      {
                        this.state = 190
                        this._errHandler.sync(this)
                        _la = this._input.LA(1)
                        if (_la === 36) {
                          {
                            this.state = 189
                            this.match(GoParser.SEMI)
                          }
                        }
                      }
                      break
                    case 2:
                      {
                        this.state = 193
                        this._errHandler.sync(this)
                        _la = this._input.LA(1)
                        if (_la === 88) {
                          {
                            this.state = 192
                            this.match(GoParser.EOS)
                          }
                        }
                      }
                      break
                    case 3:
                      {
                        this.state = 195
                        if (!this.closingBracket()) {
                          throw this.createFailedPredicateException('this.closingBracket()')
                        }
                      }
                      break
                  }
                  this.state = 198
                  this.statement()
                  this.state = 199
                  this.eos()
                }
              }
              break
            default:
              throw new NoViableAltException(this)
          }
          this.state = 203
          this._errHandler.sync(this)
          _alt = this._interp.adaptivePredict(this._input, 17, this._ctx)
        } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public statement(): StatementContext {
    let localctx: StatementContext = new StatementContext(this, this._ctx, this.state)
    this.enterRule(localctx, 24, GoParser.RULE_statement)
    try {
      this.state = 213
      this._errHandler.sync(this)
      switch (this._input.LA(1)) {
        case 25:
          this.enterOuterAlt(localctx, 1)
          {
            this.state = 205
            this.varDecl()
          }
          break
        case 3:
        case 11:
        case 26:
        case 27:
        case 28:
        case 64:
        case 65:
        case 79:
        case 80:
          this.enterOuterAlt(localctx, 2)
          {
            this.state = 206
            this.simpleStmt()
          }
          break
        case 8:
          this.enterOuterAlt(localctx, 3)
          {
            this.state = 207
            this.goStmt()
          }
          break
        case 24:
          this.enterOuterAlt(localctx, 4)
          {
            this.state = 208
            this.returnStmt()
          }
          break
        case 30:
          this.enterOuterAlt(localctx, 5)
          {
            this.state = 209
            this.block()
          }
          break
        case 18:
          this.enterOuterAlt(localctx, 6)
          {
            this.state = 210
            this.ifStmt()
          }
          break
        case 22:
          this.enterOuterAlt(localctx, 7)
          {
            this.state = 211
            this.forStmt()
          }
          break
        case 7:
          this.enterOuterAlt(localctx, 8)
          {
            this.state = 212
            this.deferStmt()
          }
          break
        default:
          throw new NoViableAltException(this)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public simpleStmt(): SimpleStmtContext {
    let localctx: SimpleStmtContext = new SimpleStmtContext(this, this._ctx, this.state)
    this.enterRule(localctx, 26, GoParser.RULE_simpleStmt)
    try {
      this.state = 219
      this._errHandler.sync(this)
      switch (this._interp.adaptivePredict(this._input, 19, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1)
          {
            this.state = 215
            this.sendStmt()
          }
          break
        case 2:
          this.enterOuterAlt(localctx, 2)
          {
            this.state = 216
            this.assignment()
          }
          break
        case 3:
          this.enterOuterAlt(localctx, 3)
          {
            this.state = 217
            this.expressionStmt()
          }
          break
        case 4:
          this.enterOuterAlt(localctx, 4)
          {
            this.state = 218
            this.shortVarDecl()
          }
          break
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public expressionStmt(): ExpressionStmtContext {
    let localctx: ExpressionStmtContext = new ExpressionStmtContext(this, this._ctx, this.state)
    this.enterRule(localctx, 28, GoParser.RULE_expressionStmt)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 221
        this.expression(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public sendStmt(): SendStmtContext {
    let localctx: SendStmtContext = new SendStmtContext(this, this._ctx, this.state)
    this.enterRule(localctx, 30, GoParser.RULE_sendStmt)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 223
        localctx._channel = this.expression(0)
        this.state = 224
        this.match(GoParser.RECEIVE)
        this.state = 225
        this.expression(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public assignment(): AssignmentContext {
    let localctx: AssignmentContext = new AssignmentContext(this, this._ctx, this.state)
    this.enterRule(localctx, 32, GoParser.RULE_assignment)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 227
        this.expressionList()
        this.state = 228
        this.match(GoParser.ASSIGN)
        this.state = 229
        this.expressionList()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public shortVarDecl(): ShortVarDeclContext {
    let localctx: ShortVarDeclContext = new ShortVarDeclContext(this, this._ctx, this.state)
    this.enterRule(localctx, 34, GoParser.RULE_shortVarDecl)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 231
        this.identifierList()
        this.state = 232
        this.match(GoParser.DECLARE_ASSIGN)
        this.state = 233
        this.expressionList()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public returnStmt(): ReturnStmtContext {
    let localctx: ReturnStmtContext = new ReturnStmtContext(this, this._ctx, this.state)
    this.enterRule(localctx, 36, GoParser.RULE_returnStmt)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 235
        this.match(GoParser.RETURN)
        this.state = 237
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 20, this._ctx)) {
          case 1:
            {
              this.state = 236
              this.expressionList()
            }
            break
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public deferStmt(): DeferStmtContext {
    let localctx: DeferStmtContext = new DeferStmtContext(this, this._ctx, this.state)
    this.enterRule(localctx, 38, GoParser.RULE_deferStmt)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 239
        this.match(GoParser.DEFER)
        this.state = 240
        this.expression(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public ifStmt(): IfStmtContext {
    let localctx: IfStmtContext = new IfStmtContext(this, this._ctx, this.state)
    this.enterRule(localctx, 40, GoParser.RULE_ifStmt)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 242
        this.match(GoParser.IF)
        this.state = 251
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 21, this._ctx)) {
          case 1:
            {
              this.state = 243
              this.expression(0)
            }
            break
          case 2:
            {
              this.state = 244
              this.eos()
              this.state = 245
              this.expression(0)
            }
            break
          case 3:
            {
              this.state = 247
              this.simpleStmt()
              this.state = 248
              this.eos()
              this.state = 249
              this.expression(0)
            }
            break
        }
        this.state = 253
        this.block()
        this.state = 259
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 23, this._ctx)) {
          case 1:
            {
              this.state = 254
              this.match(GoParser.ELSE)
              this.state = 257
              this._errHandler.sync(this)
              switch (this._input.LA(1)) {
                case 18:
                  {
                    this.state = 255
                    this.ifStmt()
                  }
                  break
                case 30:
                  {
                    this.state = 256
                    this.block()
                  }
                  break
                default:
                  throw new NoViableAltException(this)
              }
            }
            break
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public recvStmt(): RecvStmtContext {
    let localctx: RecvStmtContext = new RecvStmtContext(this, this._ctx, this.state)
    this.enterRule(localctx, 42, GoParser.RULE_recvStmt)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 267
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 24, this._ctx)) {
          case 1:
            {
              this.state = 261
              this.expressionList()
              this.state = 262
              this.match(GoParser.ASSIGN)
            }
            break
          case 2:
            {
              this.state = 264
              this.identifierList()
              this.state = 265
              this.match(GoParser.DECLARE_ASSIGN)
            }
            break
        }
        this.state = 269
        localctx._recvExpr = this.expression(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public forStmt(): ForStmtContext {
    let localctx: ForStmtContext = new ForStmtContext(this, this._ctx, this.state)
    this.enterRule(localctx, 44, GoParser.RULE_forStmt)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 271
        this.match(GoParser.FOR)
        this.state = 279
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 27, this._ctx)) {
          case 1:
            {
              this.state = 273
              this._errHandler.sync(this)
              _la = this._input.LA(1)
              if (
                ((_la & ~0x1f) === 0 && ((1 << _la) & 469764104) !== 0) ||
                (((_la - 64) & ~0x1f) === 0 && ((1 << (_la - 64)) & 98307) !== 0)
              ) {
                {
                  this.state = 272
                  this.expression(0)
                }
              }
            }
            break
          case 2:
            {
              this.state = 275
              this.forClause()
            }
            break
          case 3:
            {
              this.state = 277
              this._errHandler.sync(this)
              _la = this._input.LA(1)
              if (
                ((_la & ~0x1f) === 0 && ((1 << _la) & 470288392) !== 0) ||
                (((_la - 64) & ~0x1f) === 0 && ((1 << (_la - 64)) & 98307) !== 0)
              ) {
                {
                  this.state = 276
                  this.rangeClause()
                }
              }
            }
            break
        }
        this.state = 281
        this.block()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public forClause(): ForClauseContext {
    let localctx: ForClauseContext = new ForClauseContext(this, this._ctx, this.state)
    this.enterRule(localctx, 46, GoParser.RULE_forClause)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 284
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 28, this._ctx)) {
          case 1:
            {
              this.state = 283
              localctx._initStmt = this.simpleStmt()
            }
            break
        }
        this.state = 286
        this.eos()
        this.state = 288
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 29, this._ctx)) {
          case 1:
            {
              this.state = 287
              this.expression(0)
            }
            break
        }
        this.state = 290
        this.eos()
        this.state = 292
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 469764104) !== 0) ||
          (((_la - 64) & ~0x1f) === 0 && ((1 << (_la - 64)) & 98307) !== 0)
        ) {
          {
            this.state = 291
            localctx._postStmt = this.simpleStmt()
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public rangeClause(): RangeClauseContext {
    let localctx: RangeClauseContext = new RangeClauseContext(this, this._ctx, this.state)
    this.enterRule(localctx, 48, GoParser.RULE_rangeClause)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 300
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 31, this._ctx)) {
          case 1:
            {
              this.state = 294
              this.expressionList()
              this.state = 295
              this.match(GoParser.ASSIGN)
            }
            break
          case 2:
            {
              this.state = 297
              this.identifierList()
              this.state = 298
              this.match(GoParser.DECLARE_ASSIGN)
            }
            break
        }
        this.state = 302
        this.match(GoParser.RANGE)
        this.state = 303
        this.expression(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public goStmt(): GoStmtContext {
    let localctx: GoStmtContext = new GoStmtContext(this, this._ctx, this.state)
    this.enterRule(localctx, 50, GoParser.RULE_goStmt)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 305
        this.match(GoParser.GO)
        this.state = 306
        this.expression(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public type_(): Type_Context {
    let localctx: Type_Context = new Type_Context(this, this._ctx, this.state)
    this.enterRule(localctx, 52, GoParser.RULE_type_)
    try {
      this.state = 310
      this._errHandler.sync(this)
      switch (this._input.LA(1)) {
        case 27:
          this.enterOuterAlt(localctx, 1)
          {
            this.state = 308
            this.typeName()
          }
          break
        case 11:
          this.enterOuterAlt(localctx, 2)
          {
            this.state = 309
            this.channelType()
          }
          break
        default:
          throw new NoViableAltException(this)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public typeName(): TypeNameContext {
    let localctx: TypeNameContext = new TypeNameContext(this, this._ctx, this.state)
    this.enterRule(localctx, 54, GoParser.RULE_typeName)
    try {
      this.state = 314
      this._errHandler.sync(this)
      switch (this._interp.adaptivePredict(this._input, 33, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1)
          {
            this.state = 312
            this.qualifiedIdent()
          }
          break
        case 2:
          this.enterOuterAlt(localctx, 2)
          {
            this.state = 313
            this.match(GoParser.IDENTIFIER)
          }
          break
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public elementType(): ElementTypeContext {
    let localctx: ElementTypeContext = new ElementTypeContext(this, this._ctx, this.state)
    this.enterRule(localctx, 56, GoParser.RULE_elementType)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 316
        this.type_()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public channelType(): ChannelTypeContext {
    let localctx: ChannelTypeContext = new ChannelTypeContext(this, this._ctx, this.state)
    this.enterRule(localctx, 58, GoParser.RULE_channelType)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 318
        this.match(GoParser.CHAN)
        this.state = 319
        this.elementType()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public signature(): SignatureContext {
    let localctx: SignatureContext = new SignatureContext(this, this._ctx, this.state)
    this.enterRule(localctx, 60, GoParser.RULE_signature)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 321
        this.parameters()
        this.state = 323
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 34, this._ctx)) {
          case 1:
            {
              this.state = 322
              localctx._result = this.type_()
            }
            break
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public parameters(): ParametersContext {
    let localctx: ParametersContext = new ParametersContext(this, this._ctx, this.state)
    this.enterRule(localctx, 62, GoParser.RULE_parameters)
    let _la: number
    try {
      let _alt: number
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 325
        this.match(GoParser.L_PAREN)
        this.state = 337
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === 11 || _la === 27) {
          {
            this.state = 326
            this.parameterDecl()
            this.state = 331
            this._errHandler.sync(this)
            _alt = this._interp.adaptivePredict(this._input, 35, this._ctx)
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 327
                    this.match(GoParser.COMMA)
                    this.state = 328
                    this.parameterDecl()
                  }
                }
              }
              this.state = 333
              this._errHandler.sync(this)
              _alt = this._interp.adaptivePredict(this._input, 35, this._ctx)
            }
            this.state = 335
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            if (_la === 35) {
              {
                this.state = 334
                this.match(GoParser.COMMA)
              }
            }
          }
        }

        this.state = 339
        this.match(GoParser.R_PAREN)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public parameterDecl(): ParameterDeclContext {
    let localctx: ParameterDeclContext = new ParameterDeclContext(this, this._ctx, this.state)
    this.enterRule(localctx, 64, GoParser.RULE_parameterDecl)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 342
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 38, this._ctx)) {
          case 1:
            {
              this.state = 341
              this.identifierList()
            }
            break
        }
        this.state = 344
        this.type_()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }

  public expression(): ExpressionContext
  public expression(_p: number): ExpressionContext
  // @RuleVersion(0)
  public expression(_p?: number): ExpressionContext {
    if (_p === undefined) {
      _p = 0
    }

    let _parentctx: ParserRuleContext = this._ctx
    let _parentState: number = this.state
    let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, _parentState)
    let _prevctx: ExpressionContext = localctx
    let _startState: number = 66
    this.enterRecursionRule(localctx, 66, GoParser.RULE_expression, _p)
    let _la: number
    try {
      let _alt: number
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 350
        this._errHandler.sync(this)
        switch (this._input.LA(1)) {
          case 3:
          case 11:
          case 26:
          case 27:
          case 28:
          case 65:
          case 79:
          case 80:
            {
              this.state = 347
              this.primaryExpr(0)
            }
            break
          case 64:
            {
              this.state = 348
              localctx._unary_op = this.match(GoParser.RECEIVE)
              this.state = 349
              this.expression(4)
            }
            break
          default:
            throw new NoViableAltException(this)
        }
        this._ctx.stop = this._input.LT(-1)
        this.state = 363
        this._errHandler.sync(this)
        _alt = this._interp.adaptivePredict(this._input, 41, this._ctx)
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent()
            }
            _prevctx = localctx
            {
              this.state = 361
              this._errHandler.sync(this)
              switch (this._interp.adaptivePredict(this._input, 40, this._ctx)) {
                case 1:
                  {
                    localctx = new ExpressionContext(this, _parentctx, _parentState)
                    this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression)
                    this.state = 352
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 3)')
                    }
                    this.state = 353
                    localctx._mul_op = this._input.LT(1)
                    _la = this._input.LA(1)
                    if (!(((_la - 52) & ~0x1f) === 0 && ((1 << (_la - 52)) & 1027) !== 0)) {
                      localctx._mul_op = this._errHandler.recoverInline(this)
                    } else {
                      this._errHandler.reportMatch(this)
                      this.consume()
                    }
                    this.state = 354
                    this.expression(4)
                  }
                  break
                case 2:
                  {
                    localctx = new ExpressionContext(this, _parentctx, _parentState)
                    this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression)
                    this.state = 355
                    if (!this.precpred(this._ctx, 2)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 2)')
                    }
                    this.state = 356
                    localctx._add_op = this._input.LT(1)
                    _la = this._input.LA(1)
                    if (!(_la === 59 || _la === 60)) {
                      localctx._add_op = this._errHandler.recoverInline(this)
                    } else {
                      this._errHandler.reportMatch(this)
                      this.consume()
                    }
                    this.state = 357
                    this.expression(3)
                  }
                  break
                case 3:
                  {
                    localctx = new ExpressionContext(this, _parentctx, _parentState)
                    this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression)
                    this.state = 358
                    if (!this.precpred(this._ctx, 1)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 1)')
                    }
                    this.state = 359
                    localctx._rel_op = this._input.LT(1)
                    _la = this._input.LA(1)
                    if (!(((_la - 45) & ~0x1f) === 0 && ((1 << (_la - 45)) & 63) !== 0)) {
                      localctx._rel_op = this._errHandler.recoverInline(this)
                    } else {
                      this._errHandler.reportMatch(this)
                      this.consume()
                    }
                    this.state = 360
                    this.expression(2)
                  }
                  break
              }
            }
          }
          this.state = 365
          this._errHandler.sync(this)
          _alt = this._interp.adaptivePredict(this._input, 41, this._ctx)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.unrollRecursionContexts(_parentctx)
    }
    return localctx
  }

  public primaryExpr(): PrimaryExprContext
  public primaryExpr(_p: number): PrimaryExprContext
  // @RuleVersion(0)
  public primaryExpr(_p?: number): PrimaryExprContext {
    if (_p === undefined) {
      _p = 0
    }

    let _parentctx: ParserRuleContext = this._ctx
    let _parentState: number = this.state
    let localctx: PrimaryExprContext = new PrimaryExprContext(this, this._ctx, _parentState)
    let _prevctx: PrimaryExprContext = localctx
    let _startState: number = 68
    this.enterRecursionRule(localctx, 68, GoParser.RULE_primaryExpr, _p)
    try {
      let _alt: number
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 369
        this._errHandler.sync(this)
        switch (this._interp.adaptivePredict(this._input, 42, this._ctx)) {
          case 1:
            {
              this.state = 367
              this.operand()
            }
            break
          case 2:
            {
              this.state = 368
              this.methodExpr()
            }
            break
        }
        this._ctx.stop = this._input.LT(-1)
        this.state = 379
        this._errHandler.sync(this)
        _alt = this._interp.adaptivePredict(this._input, 44, this._ctx)
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent()
            }
            _prevctx = localctx
            {
              {
                localctx = new PrimaryExprContext(this, _parentctx, _parentState)
                this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_primaryExpr)
                this.state = 371
                if (!this.precpred(this._ctx, 1)) {
                  throw this.createFailedPredicateException('this.precpred(this._ctx, 1)')
                }
                this.state = 375
                this._errHandler.sync(this)
                switch (this._input.LA(1)) {
                  case 38:
                    {
                      this.state = 372
                      this.match(GoParser.DOT)
                      this.state = 373
                      this.match(GoParser.IDENTIFIER)
                    }
                    break
                  case 28:
                    {
                      this.state = 374
                      this.arguments()
                    }
                    break
                  default:
                    throw new NoViableAltException(this)
                }
              }
            }
          }
          this.state = 381
          this._errHandler.sync(this)
          _alt = this._interp.adaptivePredict(this._input, 44, this._ctx)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.unrollRecursionContexts(_parentctx)
    }
    return localctx
  }
  // @RuleVersion(0)
  public operand(): OperandContext {
    let localctx: OperandContext = new OperandContext(this, this._ctx, this.state)
    this.enterRule(localctx, 70, GoParser.RULE_operand)
    try {
      this.state = 388
      this._errHandler.sync(this)
      switch (this._input.LA(1)) {
        case 3:
        case 26:
        case 65:
        case 79:
        case 80:
          this.enterOuterAlt(localctx, 1)
          {
            this.state = 382
            this.literal()
          }
          break
        case 27:
          this.enterOuterAlt(localctx, 2)
          {
            this.state = 383
            this.operandName()
          }
          break
        case 28:
          this.enterOuterAlt(localctx, 3)
          {
            this.state = 384
            this.match(GoParser.L_PAREN)
            this.state = 385
            this.expression(0)
            this.state = 386
            this.match(GoParser.R_PAREN)
          }
          break
        default:
          throw new NoViableAltException(this)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public literal(): LiteralContext {
    let localctx: LiteralContext = new LiteralContext(this, this._ctx, this.state)
    this.enterRule(localctx, 72, GoParser.RULE_literal)
    try {
      this.state = 392
      this._errHandler.sync(this)
      switch (this._input.LA(1)) {
        case 26:
        case 65:
        case 79:
        case 80:
          this.enterOuterAlt(localctx, 1)
          {
            this.state = 390
            this.basicLit()
          }
          break
        case 3:
          this.enterOuterAlt(localctx, 2)
          {
            this.state = 391
            this.functionLit()
          }
          break
        default:
          throw new NoViableAltException(this)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public basicLit(): BasicLitContext {
    let localctx: BasicLitContext = new BasicLitContext(this, this._ctx, this.state)
    this.enterRule(localctx, 74, GoParser.RULE_basicLit)
    try {
      this.state = 397
      this._errHandler.sync(this)
      switch (this._input.LA(1)) {
        case 26:
          this.enterOuterAlt(localctx, 1)
          {
            this.state = 394
            this.match(GoParser.NIL_LIT)
          }
          break
        case 65:
          this.enterOuterAlt(localctx, 2)
          {
            this.state = 395
            this.match(GoParser.DECIMAL_LIT)
          }
          break
        case 79:
        case 80:
          this.enterOuterAlt(localctx, 3)
          {
            this.state = 396
            this.string_()
          }
          break
        default:
          throw new NoViableAltException(this)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public operandName(): OperandNameContext {
    let localctx: OperandNameContext = new OperandNameContext(this, this._ctx, this.state)
    this.enterRule(localctx, 76, GoParser.RULE_operandName)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 399
        this.match(GoParser.IDENTIFIER)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public qualifiedIdent(): QualifiedIdentContext {
    let localctx: QualifiedIdentContext = new QualifiedIdentContext(this, this._ctx, this.state)
    this.enterRule(localctx, 78, GoParser.RULE_qualifiedIdent)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 401
        this.match(GoParser.IDENTIFIER)
        this.state = 402
        this.match(GoParser.DOT)
        this.state = 403
        this.match(GoParser.IDENTIFIER)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public string_(): String_Context {
    let localctx: String_Context = new String_Context(this, this._ctx, this.state)
    this.enterRule(localctx, 80, GoParser.RULE_string_)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 405
        _la = this._input.LA(1)
        if (!(_la === 79 || _la === 80)) {
          this._errHandler.recoverInline(this)
        } else {
          this._errHandler.reportMatch(this)
          this.consume()
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public functionLit(): FunctionLitContext {
    let localctx: FunctionLitContext = new FunctionLitContext(this, this._ctx, this.state)
    this.enterRule(localctx, 82, GoParser.RULE_functionLit)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 407
        this.match(GoParser.FUNC)
        this.state = 408
        this.signature()
        this.state = 409
        this.block()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public arguments(): ArgumentsContext {
    let localctx: ArgumentsContext = new ArgumentsContext(this, this._ctx, this.state)
    this.enterRule(localctx, 84, GoParser.RULE_arguments)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 411
        this.match(GoParser.L_PAREN)
        this.state = 413
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 469764104) !== 0) ||
          (((_la - 64) & ~0x1f) === 0 && ((1 << (_la - 64)) & 98307) !== 0)
        ) {
          {
            this.state = 412
            this.expressionList()
          }
        }

        this.state = 415
        this.match(GoParser.R_PAREN)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public methodExpr(): MethodExprContext {
    let localctx: MethodExprContext = new MethodExprContext(this, this._ctx, this.state)
    this.enterRule(localctx, 86, GoParser.RULE_methodExpr)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 417
        this.type_()
        this.state = 418
        this.match(GoParser.DOT)
        this.state = 419
        this.match(GoParser.IDENTIFIER)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public eos(): EosContext {
    let localctx: EosContext = new EosContext(this, this._ctx, this.state)
    this.enterRule(localctx, 88, GoParser.RULE_eos)
    try {
      this.state = 425
      this._errHandler.sync(this)
      switch (this._interp.adaptivePredict(this._input, 49, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1)
          {
            this.state = 421
            this.match(GoParser.SEMI)
          }
          break
        case 2:
          this.enterOuterAlt(localctx, 2)
          {
            this.state = 422
            this.match(GoParser.EOF)
          }
          break
        case 3:
          this.enterOuterAlt(localctx, 3)
          {
            this.state = 423
            this.match(GoParser.EOS)
          }
          break
        case 4:
          this.enterOuterAlt(localctx, 4)
          {
            this.state = 424
            if (!this.closingBracket()) {
              throw this.createFailedPredicateException('this.closingBracket()')
            }
          }
          break
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }

  public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
    switch (ruleIndex) {
      case 11:
        return this.statementList_sempred(localctx as StatementListContext, predIndex)
      case 33:
        return this.expression_sempred(localctx as ExpressionContext, predIndex)
      case 34:
        return this.primaryExpr_sempred(localctx as PrimaryExprContext, predIndex)
      case 44:
        return this.eos_sempred(localctx as EosContext, predIndex)
    }
    return true
  }
  private statementList_sempred(localctx: StatementListContext, predIndex: number): boolean {
    switch (predIndex) {
      case 0:
        return this.closingBracket()
    }
    return true
  }
  private expression_sempred(localctx: ExpressionContext, predIndex: number): boolean {
    switch (predIndex) {
      case 1:
        return this.precpred(this._ctx, 3)
      case 2:
        return this.precpred(this._ctx, 2)
      case 3:
        return this.precpred(this._ctx, 1)
    }
    return true
  }
  private primaryExpr_sempred(localctx: PrimaryExprContext, predIndex: number): boolean {
    switch (predIndex) {
      case 4:
        return this.precpred(this._ctx, 1)
    }
    return true
  }
  private eos_sempred(localctx: EosContext, predIndex: number): boolean {
    switch (predIndex) {
      case 5:
        return this.closingBracket()
    }
    return true
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 89, 428, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7,
    6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2, 11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13,
    2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7, 16, 2, 17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20, 7,
    20, 2, 21, 7, 21, 2, 22, 7, 22, 2, 23, 7, 23, 2, 24, 7, 24, 2, 25, 7, 25, 2, 26, 7, 26, 2, 27,
    7, 27, 2, 28, 7, 28, 2, 29, 7, 29, 2, 30, 7, 30, 2, 31, 7, 31, 2, 32, 7, 32, 2, 33, 7, 33, 2,
    34, 7, 34, 2, 35, 7, 35, 2, 36, 7, 36, 2, 37, 7, 37, 2, 38, 7, 38, 2, 39, 7, 39, 2, 40, 7, 40,
    2, 41, 7, 41, 2, 42, 7, 42, 2, 43, 7, 43, 2, 44, 7, 44, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 5, 0, 96,
    8, 0, 10, 0, 12, 0, 99, 9, 0, 1, 0, 1, 0, 3, 0, 103, 8, 0, 1, 0, 1, 0, 5, 0, 107, 8, 0, 10, 0,
    12, 0, 110, 9, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 123,
    8, 2, 10, 2, 12, 2, 126, 9, 2, 1, 2, 3, 2, 129, 8, 2, 1, 3, 3, 3, 132, 8, 3, 1, 3, 1, 3, 1, 4,
    1, 4, 1, 5, 1, 5, 1, 5, 5, 5, 141, 8, 5, 10, 5, 12, 5, 144, 9, 5, 1, 6, 1, 6, 1, 6, 5, 6, 149,
    8, 6, 10, 6, 12, 6, 152, 9, 6, 1, 7, 1, 7, 1, 7, 1, 7, 3, 7, 158, 8, 7, 1, 8, 1, 8, 1, 8, 1, 8,
    1, 8, 1, 8, 5, 8, 166, 8, 8, 10, 8, 12, 8, 169, 9, 8, 1, 8, 3, 8, 172, 8, 8, 1, 9, 1, 9, 1, 9,
    1, 9, 3, 9, 178, 8, 9, 1, 9, 1, 9, 3, 9, 182, 8, 9, 1, 10, 1, 10, 3, 10, 186, 8, 10, 1, 10, 1,
    10, 1, 11, 3, 11, 191, 8, 11, 1, 11, 3, 11, 194, 8, 11, 1, 11, 3, 11, 197, 8, 11, 1, 11, 1, 11,
    1, 11, 4, 11, 202, 8, 11, 11, 11, 12, 11, 203, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12,
    1, 12, 3, 12, 214, 8, 12, 1, 13, 1, 13, 1, 13, 1, 13, 3, 13, 220, 8, 13, 1, 14, 1, 14, 1, 15, 1,
    15, 1, 15, 1, 15, 1, 16, 1, 16, 1, 16, 1, 16, 1, 17, 1, 17, 1, 17, 1, 17, 1, 18, 1, 18, 3, 18,
    238, 8, 18, 1, 19, 1, 19, 1, 19, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20,
    3, 20, 252, 8, 20, 1, 20, 1, 20, 1, 20, 1, 20, 3, 20, 258, 8, 20, 3, 20, 260, 8, 20, 1, 21, 1,
    21, 1, 21, 1, 21, 1, 21, 1, 21, 3, 21, 268, 8, 21, 1, 21, 1, 21, 1, 22, 1, 22, 3, 22, 274, 8,
    22, 1, 22, 1, 22, 3, 22, 278, 8, 22, 3, 22, 280, 8, 22, 1, 22, 1, 22, 1, 23, 3, 23, 285, 8, 23,
    1, 23, 1, 23, 3, 23, 289, 8, 23, 1, 23, 1, 23, 3, 23, 293, 8, 23, 1, 24, 1, 24, 1, 24, 1, 24, 1,
    24, 1, 24, 3, 24, 301, 8, 24, 1, 24, 1, 24, 1, 24, 1, 25, 1, 25, 1, 25, 1, 26, 1, 26, 3, 26,
    311, 8, 26, 1, 27, 1, 27, 3, 27, 315, 8, 27, 1, 28, 1, 28, 1, 29, 1, 29, 1, 29, 1, 30, 1, 30, 3,
    30, 324, 8, 30, 1, 31, 1, 31, 1, 31, 1, 31, 5, 31, 330, 8, 31, 10, 31, 12, 31, 333, 9, 31, 1,
    31, 3, 31, 336, 8, 31, 3, 31, 338, 8, 31, 1, 31, 1, 31, 1, 32, 3, 32, 343, 8, 32, 1, 32, 1, 32,
    1, 33, 1, 33, 1, 33, 1, 33, 3, 33, 351, 8, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33,
    1, 33, 1, 33, 5, 33, 362, 8, 33, 10, 33, 12, 33, 365, 9, 33, 1, 34, 1, 34, 1, 34, 3, 34, 370, 8,
    34, 1, 34, 1, 34, 1, 34, 1, 34, 3, 34, 376, 8, 34, 5, 34, 378, 8, 34, 10, 34, 12, 34, 381, 9,
    34, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 1, 35, 3, 35, 389, 8, 35, 1, 36, 1, 36, 3, 36, 393, 8,
    36, 1, 37, 1, 37, 1, 37, 3, 37, 398, 8, 37, 1, 38, 1, 38, 1, 39, 1, 39, 1, 39, 1, 39, 1, 40, 1,
    40, 1, 41, 1, 41, 1, 41, 1, 41, 1, 42, 1, 42, 3, 42, 414, 8, 42, 1, 42, 1, 42, 1, 43, 1, 43, 1,
    43, 1, 43, 1, 44, 1, 44, 1, 44, 1, 44, 3, 44, 426, 8, 44, 1, 44, 0, 2, 66, 68, 45, 0, 2, 4, 6,
    8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54,
    56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 0, 5, 2, 0, 27, 27, 38, 38,
    2, 0, 52, 53, 62, 62, 1, 0, 59, 60, 1, 0, 45, 50, 1, 0, 79, 80, 450, 0, 90, 1, 0, 0, 0, 2, 113,
    1, 0, 0, 0, 4, 116, 1, 0, 0, 0, 6, 131, 1, 0, 0, 0, 8, 135, 1, 0, 0, 0, 10, 137, 1, 0, 0, 0, 12,
    145, 1, 0, 0, 0, 14, 153, 1, 0, 0, 0, 16, 159, 1, 0, 0, 0, 18, 173, 1, 0, 0, 0, 20, 183, 1, 0,
    0, 0, 22, 201, 1, 0, 0, 0, 24, 213, 1, 0, 0, 0, 26, 219, 1, 0, 0, 0, 28, 221, 1, 0, 0, 0, 30,
    223, 1, 0, 0, 0, 32, 227, 1, 0, 0, 0, 34, 231, 1, 0, 0, 0, 36, 235, 1, 0, 0, 0, 38, 239, 1, 0,
    0, 0, 40, 242, 1, 0, 0, 0, 42, 267, 1, 0, 0, 0, 44, 271, 1, 0, 0, 0, 46, 284, 1, 0, 0, 0, 48,
    300, 1, 0, 0, 0, 50, 305, 1, 0, 0, 0, 52, 310, 1, 0, 0, 0, 54, 314, 1, 0, 0, 0, 56, 316, 1, 0,
    0, 0, 58, 318, 1, 0, 0, 0, 60, 321, 1, 0, 0, 0, 62, 325, 1, 0, 0, 0, 64, 342, 1, 0, 0, 0, 66,
    350, 1, 0, 0, 0, 68, 369, 1, 0, 0, 0, 70, 388, 1, 0, 0, 0, 72, 392, 1, 0, 0, 0, 74, 397, 1, 0,
    0, 0, 76, 399, 1, 0, 0, 0, 78, 401, 1, 0, 0, 0, 80, 405, 1, 0, 0, 0, 82, 407, 1, 0, 0, 0, 84,
    411, 1, 0, 0, 0, 86, 417, 1, 0, 0, 0, 88, 425, 1, 0, 0, 0, 90, 91, 3, 2, 1, 0, 91, 97, 3, 88,
    44, 0, 92, 93, 3, 4, 2, 0, 93, 94, 3, 88, 44, 0, 94, 96, 1, 0, 0, 0, 95, 92, 1, 0, 0, 0, 96, 99,
    1, 0, 0, 0, 97, 95, 1, 0, 0, 0, 97, 98, 1, 0, 0, 0, 98, 108, 1, 0, 0, 0, 99, 97, 1, 0, 0, 0,
    100, 103, 3, 14, 7, 0, 101, 103, 3, 16, 8, 0, 102, 100, 1, 0, 0, 0, 102, 101, 1, 0, 0, 0, 103,
    104, 1, 0, 0, 0, 104, 105, 3, 88, 44, 0, 105, 107, 1, 0, 0, 0, 106, 102, 1, 0, 0, 0, 107, 110,
    1, 0, 0, 0, 108, 106, 1, 0, 0, 0, 108, 109, 1, 0, 0, 0, 109, 111, 1, 0, 0, 0, 110, 108, 1, 0, 0,
    0, 111, 112, 5, 0, 0, 1, 112, 1, 1, 0, 0, 0, 113, 114, 5, 14, 0, 0, 114, 115, 5, 27, 0, 0, 115,
    3, 1, 0, 0, 0, 116, 128, 5, 23, 0, 0, 117, 129, 3, 6, 3, 0, 118, 124, 5, 28, 0, 0, 119, 120, 3,
    6, 3, 0, 120, 121, 3, 88, 44, 0, 121, 123, 1, 0, 0, 0, 122, 119, 1, 0, 0, 0, 123, 126, 1, 0, 0,
    0, 124, 122, 1, 0, 0, 0, 124, 125, 1, 0, 0, 0, 125, 127, 1, 0, 0, 0, 126, 124, 1, 0, 0, 0, 127,
    129, 5, 29, 0, 0, 128, 117, 1, 0, 0, 0, 128, 118, 1, 0, 0, 0, 129, 5, 1, 0, 0, 0, 130, 132, 7,
    0, 0, 0, 131, 130, 1, 0, 0, 0, 131, 132, 1, 0, 0, 0, 132, 133, 1, 0, 0, 0, 133, 134, 3, 8, 4, 0,
    134, 7, 1, 0, 0, 0, 135, 136, 3, 80, 40, 0, 136, 9, 1, 0, 0, 0, 137, 142, 5, 27, 0, 0, 138, 139,
    5, 35, 0, 0, 139, 141, 5, 27, 0, 0, 140, 138, 1, 0, 0, 0, 141, 144, 1, 0, 0, 0, 142, 140, 1, 0,
    0, 0, 142, 143, 1, 0, 0, 0, 143, 11, 1, 0, 0, 0, 144, 142, 1, 0, 0, 0, 145, 150, 3, 66, 33, 0,
    146, 147, 5, 35, 0, 0, 147, 149, 3, 66, 33, 0, 148, 146, 1, 0, 0, 0, 149, 152, 1, 0, 0, 0, 150,
    148, 1, 0, 0, 0, 150, 151, 1, 0, 0, 0, 151, 13, 1, 0, 0, 0, 152, 150, 1, 0, 0, 0, 153, 154, 5,
    3, 0, 0, 154, 155, 5, 27, 0, 0, 155, 157, 3, 60, 30, 0, 156, 158, 3, 20, 10, 0, 157, 156, 1, 0,
    0, 0, 157, 158, 1, 0, 0, 0, 158, 15, 1, 0, 0, 0, 159, 171, 5, 25, 0, 0, 160, 172, 3, 18, 9, 0,
    161, 167, 5, 28, 0, 0, 162, 163, 3, 18, 9, 0, 163, 164, 3, 88, 44, 0, 164, 166, 1, 0, 0, 0, 165,
    162, 1, 0, 0, 0, 166, 169, 1, 0, 0, 0, 167, 165, 1, 0, 0, 0, 167, 168, 1, 0, 0, 0, 168, 170, 1,
    0, 0, 0, 169, 167, 1, 0, 0, 0, 170, 172, 5, 29, 0, 0, 171, 160, 1, 0, 0, 0, 171, 161, 1, 0, 0,
    0, 172, 17, 1, 0, 0, 0, 173, 181, 3, 10, 5, 0, 174, 177, 3, 52, 26, 0, 175, 176, 5, 34, 0, 0,
    176, 178, 3, 12, 6, 0, 177, 175, 1, 0, 0, 0, 177, 178, 1, 0, 0, 0, 178, 182, 1, 0, 0, 0, 179,
    180, 5, 34, 0, 0, 180, 182, 3, 12, 6, 0, 181, 174, 1, 0, 0, 0, 181, 179, 1, 0, 0, 0, 182, 19, 1,
    0, 0, 0, 183, 185, 5, 30, 0, 0, 184, 186, 3, 22, 11, 0, 185, 184, 1, 0, 0, 0, 185, 186, 1, 0, 0,
    0, 186, 187, 1, 0, 0, 0, 187, 188, 5, 31, 0, 0, 188, 21, 1, 0, 0, 0, 189, 191, 5, 36, 0, 0, 190,
    189, 1, 0, 0, 0, 190, 191, 1, 0, 0, 0, 191, 197, 1, 0, 0, 0, 192, 194, 5, 88, 0, 0, 193, 192, 1,
    0, 0, 0, 193, 194, 1, 0, 0, 0, 194, 197, 1, 0, 0, 0, 195, 197, 4, 11, 0, 0, 196, 190, 1, 0, 0,
    0, 196, 193, 1, 0, 0, 0, 196, 195, 1, 0, 0, 0, 197, 198, 1, 0, 0, 0, 198, 199, 3, 24, 12, 0,
    199, 200, 3, 88, 44, 0, 200, 202, 1, 0, 0, 0, 201, 196, 1, 0, 0, 0, 202, 203, 1, 0, 0, 0, 203,
    201, 1, 0, 0, 0, 203, 204, 1, 0, 0, 0, 204, 23, 1, 0, 0, 0, 205, 214, 3, 16, 8, 0, 206, 214, 3,
    26, 13, 0, 207, 214, 3, 50, 25, 0, 208, 214, 3, 36, 18, 0, 209, 214, 3, 20, 10, 0, 210, 214, 3,
    40, 20, 0, 211, 214, 3, 44, 22, 0, 212, 214, 3, 38, 19, 0, 213, 205, 1, 0, 0, 0, 213, 206, 1, 0,
    0, 0, 213, 207, 1, 0, 0, 0, 213, 208, 1, 0, 0, 0, 213, 209, 1, 0, 0, 0, 213, 210, 1, 0, 0, 0,
    213, 211, 1, 0, 0, 0, 213, 212, 1, 0, 0, 0, 214, 25, 1, 0, 0, 0, 215, 220, 3, 30, 15, 0, 216,
    220, 3, 32, 16, 0, 217, 220, 3, 28, 14, 0, 218, 220, 3, 34, 17, 0, 219, 215, 1, 0, 0, 0, 219,
    216, 1, 0, 0, 0, 219, 217, 1, 0, 0, 0, 219, 218, 1, 0, 0, 0, 220, 27, 1, 0, 0, 0, 221, 222, 3,
    66, 33, 0, 222, 29, 1, 0, 0, 0, 223, 224, 3, 66, 33, 0, 224, 225, 5, 64, 0, 0, 225, 226, 3, 66,
    33, 0, 226, 31, 1, 0, 0, 0, 227, 228, 3, 12, 6, 0, 228, 229, 5, 34, 0, 0, 229, 230, 3, 12, 6, 0,
    230, 33, 1, 0, 0, 0, 231, 232, 3, 10, 5, 0, 232, 233, 5, 41, 0, 0, 233, 234, 3, 12, 6, 0, 234,
    35, 1, 0, 0, 0, 235, 237, 5, 24, 0, 0, 236, 238, 3, 12, 6, 0, 237, 236, 1, 0, 0, 0, 237, 238, 1,
    0, 0, 0, 238, 37, 1, 0, 0, 0, 239, 240, 5, 7, 0, 0, 240, 241, 3, 66, 33, 0, 241, 39, 1, 0, 0, 0,
    242, 251, 5, 18, 0, 0, 243, 252, 3, 66, 33, 0, 244, 245, 3, 88, 44, 0, 245, 246, 3, 66, 33, 0,
    246, 252, 1, 0, 0, 0, 247, 248, 3, 26, 13, 0, 248, 249, 3, 88, 44, 0, 249, 250, 3, 66, 33, 0,
    250, 252, 1, 0, 0, 0, 251, 243, 1, 0, 0, 0, 251, 244, 1, 0, 0, 0, 251, 247, 1, 0, 0, 0, 252,
    253, 1, 0, 0, 0, 253, 259, 3, 20, 10, 0, 254, 257, 5, 12, 0, 0, 255, 258, 3, 40, 20, 0, 256,
    258, 3, 20, 10, 0, 257, 255, 1, 0, 0, 0, 257, 256, 1, 0, 0, 0, 258, 260, 1, 0, 0, 0, 259, 254,
    1, 0, 0, 0, 259, 260, 1, 0, 0, 0, 260, 41, 1, 0, 0, 0, 261, 262, 3, 12, 6, 0, 262, 263, 5, 34,
    0, 0, 263, 268, 1, 0, 0, 0, 264, 265, 3, 10, 5, 0, 265, 266, 5, 41, 0, 0, 266, 268, 1, 0, 0, 0,
    267, 261, 1, 0, 0, 0, 267, 264, 1, 0, 0, 0, 267, 268, 1, 0, 0, 0, 268, 269, 1, 0, 0, 0, 269,
    270, 3, 66, 33, 0, 270, 43, 1, 0, 0, 0, 271, 279, 5, 22, 0, 0, 272, 274, 3, 66, 33, 0, 273, 272,
    1, 0, 0, 0, 273, 274, 1, 0, 0, 0, 274, 280, 1, 0, 0, 0, 275, 280, 3, 46, 23, 0, 276, 278, 3, 48,
    24, 0, 277, 276, 1, 0, 0, 0, 277, 278, 1, 0, 0, 0, 278, 280, 1, 0, 0, 0, 279, 273, 1, 0, 0, 0,
    279, 275, 1, 0, 0, 0, 279, 277, 1, 0, 0, 0, 280, 281, 1, 0, 0, 0, 281, 282, 3, 20, 10, 0, 282,
    45, 1, 0, 0, 0, 283, 285, 3, 26, 13, 0, 284, 283, 1, 0, 0, 0, 284, 285, 1, 0, 0, 0, 285, 286, 1,
    0, 0, 0, 286, 288, 3, 88, 44, 0, 287, 289, 3, 66, 33, 0, 288, 287, 1, 0, 0, 0, 288, 289, 1, 0,
    0, 0, 289, 290, 1, 0, 0, 0, 290, 292, 3, 88, 44, 0, 291, 293, 3, 26, 13, 0, 292, 291, 1, 0, 0,
    0, 292, 293, 1, 0, 0, 0, 293, 47, 1, 0, 0, 0, 294, 295, 3, 12, 6, 0, 295, 296, 5, 34, 0, 0, 296,
    301, 1, 0, 0, 0, 297, 298, 3, 10, 5, 0, 298, 299, 5, 41, 0, 0, 299, 301, 1, 0, 0, 0, 300, 294,
    1, 0, 0, 0, 300, 297, 1, 0, 0, 0, 300, 301, 1, 0, 0, 0, 301, 302, 1, 0, 0, 0, 302, 303, 5, 19,
    0, 0, 303, 304, 3, 66, 33, 0, 304, 49, 1, 0, 0, 0, 305, 306, 5, 8, 0, 0, 306, 307, 3, 66, 33, 0,
    307, 51, 1, 0, 0, 0, 308, 311, 3, 54, 27, 0, 309, 311, 3, 58, 29, 0, 310, 308, 1, 0, 0, 0, 310,
    309, 1, 0, 0, 0, 311, 53, 1, 0, 0, 0, 312, 315, 3, 78, 39, 0, 313, 315, 5, 27, 0, 0, 314, 312,
    1, 0, 0, 0, 314, 313, 1, 0, 0, 0, 315, 55, 1, 0, 0, 0, 316, 317, 3, 52, 26, 0, 317, 57, 1, 0, 0,
    0, 318, 319, 5, 11, 0, 0, 319, 320, 3, 56, 28, 0, 320, 59, 1, 0, 0, 0, 321, 323, 3, 62, 31, 0,
    322, 324, 3, 52, 26, 0, 323, 322, 1, 0, 0, 0, 323, 324, 1, 0, 0, 0, 324, 61, 1, 0, 0, 0, 325,
    337, 5, 28, 0, 0, 326, 331, 3, 64, 32, 0, 327, 328, 5, 35, 0, 0, 328, 330, 3, 64, 32, 0, 329,
    327, 1, 0, 0, 0, 330, 333, 1, 0, 0, 0, 331, 329, 1, 0, 0, 0, 331, 332, 1, 0, 0, 0, 332, 335, 1,
    0, 0, 0, 333, 331, 1, 0, 0, 0, 334, 336, 5, 35, 0, 0, 335, 334, 1, 0, 0, 0, 335, 336, 1, 0, 0,
    0, 336, 338, 1, 0, 0, 0, 337, 326, 1, 0, 0, 0, 337, 338, 1, 0, 0, 0, 338, 339, 1, 0, 0, 0, 339,
    340, 5, 29, 0, 0, 340, 63, 1, 0, 0, 0, 341, 343, 3, 10, 5, 0, 342, 341, 1, 0, 0, 0, 342, 343, 1,
    0, 0, 0, 343, 344, 1, 0, 0, 0, 344, 345, 3, 52, 26, 0, 345, 65, 1, 0, 0, 0, 346, 347, 6, 33, -1,
    0, 347, 351, 3, 68, 34, 0, 348, 349, 5, 64, 0, 0, 349, 351, 3, 66, 33, 4, 350, 346, 1, 0, 0, 0,
    350, 348, 1, 0, 0, 0, 351, 363, 1, 0, 0, 0, 352, 353, 10, 3, 0, 0, 353, 354, 7, 1, 0, 0, 354,
    362, 3, 66, 33, 4, 355, 356, 10, 2, 0, 0, 356, 357, 7, 2, 0, 0, 357, 362, 3, 66, 33, 3, 358,
    359, 10, 1, 0, 0, 359, 360, 7, 3, 0, 0, 360, 362, 3, 66, 33, 2, 361, 352, 1, 0, 0, 0, 361, 355,
    1, 0, 0, 0, 361, 358, 1, 0, 0, 0, 362, 365, 1, 0, 0, 0, 363, 361, 1, 0, 0, 0, 363, 364, 1, 0, 0,
    0, 364, 67, 1, 0, 0, 0, 365, 363, 1, 0, 0, 0, 366, 367, 6, 34, -1, 0, 367, 370, 3, 70, 35, 0,
    368, 370, 3, 86, 43, 0, 369, 366, 1, 0, 0, 0, 369, 368, 1, 0, 0, 0, 370, 379, 1, 0, 0, 0, 371,
    375, 10, 1, 0, 0, 372, 373, 5, 38, 0, 0, 373, 376, 5, 27, 0, 0, 374, 376, 3, 84, 42, 0, 375,
    372, 1, 0, 0, 0, 375, 374, 1, 0, 0, 0, 376, 378, 1, 0, 0, 0, 377, 371, 1, 0, 0, 0, 378, 381, 1,
    0, 0, 0, 379, 377, 1, 0, 0, 0, 379, 380, 1, 0, 0, 0, 380, 69, 1, 0, 0, 0, 381, 379, 1, 0, 0, 0,
    382, 389, 3, 72, 36, 0, 383, 389, 3, 76, 38, 0, 384, 385, 5, 28, 0, 0, 385, 386, 3, 66, 33, 0,
    386, 387, 5, 29, 0, 0, 387, 389, 1, 0, 0, 0, 388, 382, 1, 0, 0, 0, 388, 383, 1, 0, 0, 0, 388,
    384, 1, 0, 0, 0, 389, 71, 1, 0, 0, 0, 390, 393, 3, 74, 37, 0, 391, 393, 3, 82, 41, 0, 392, 390,
    1, 0, 0, 0, 392, 391, 1, 0, 0, 0, 393, 73, 1, 0, 0, 0, 394, 398, 5, 26, 0, 0, 395, 398, 5, 65,
    0, 0, 396, 398, 3, 80, 40, 0, 397, 394, 1, 0, 0, 0, 397, 395, 1, 0, 0, 0, 397, 396, 1, 0, 0, 0,
    398, 75, 1, 0, 0, 0, 399, 400, 5, 27, 0, 0, 400, 77, 1, 0, 0, 0, 401, 402, 5, 27, 0, 0, 402,
    403, 5, 38, 0, 0, 403, 404, 5, 27, 0, 0, 404, 79, 1, 0, 0, 0, 405, 406, 7, 4, 0, 0, 406, 81, 1,
    0, 0, 0, 407, 408, 5, 3, 0, 0, 408, 409, 3, 60, 30, 0, 409, 410, 3, 20, 10, 0, 410, 83, 1, 0, 0,
    0, 411, 413, 5, 28, 0, 0, 412, 414, 3, 12, 6, 0, 413, 412, 1, 0, 0, 0, 413, 414, 1, 0, 0, 0,
    414, 415, 1, 0, 0, 0, 415, 416, 5, 29, 0, 0, 416, 85, 1, 0, 0, 0, 417, 418, 3, 52, 26, 0, 418,
    419, 5, 38, 0, 0, 419, 420, 5, 27, 0, 0, 420, 87, 1, 0, 0, 0, 421, 426, 5, 36, 0, 0, 422, 426,
    5, 0, 0, 1, 423, 426, 5, 88, 0, 0, 424, 426, 4, 44, 5, 0, 425, 421, 1, 0, 0, 0, 425, 422, 1, 0,
    0, 0, 425, 423, 1, 0, 0, 0, 425, 424, 1, 0, 0, 0, 426, 89, 1, 0, 0, 0, 50, 97, 102, 108, 124,
    128, 131, 142, 150, 157, 167, 171, 177, 181, 185, 190, 193, 196, 203, 213, 219, 237, 251, 257,
    259, 267, 273, 277, 279, 284, 288, 292, 300, 310, 314, 323, 331, 335, 337, 342, 350, 361, 363,
    369, 375, 379, 388, 392, 397, 413, 425
  ]

  private static __ATN: ATN
  public static get _ATN(): ATN {
    if (!GoParser.__ATN) {
      GoParser.__ATN = new ATNDeserializer().deserialize(GoParser._serializedATN)
    }

    return GoParser.__ATN
  }

  static DecisionsToDFA = GoParser._ATN.decisionToState.map(
    (ds: DecisionState, index: number) => new DFA(ds, index)
  )
}

export class SourceFileContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public packageClause(): PackageClauseContext {
    return this.getTypedRuleContext(PackageClauseContext, 0) as PackageClauseContext
  }
  public eos_list(): EosContext[] {
    return this.getTypedRuleContexts(EosContext) as EosContext[]
  }
  public eos(i: number): EosContext {
    return this.getTypedRuleContext(EosContext, i) as EosContext
  }
  public EOF(): TerminalNode {
    return this.getToken(GoParser.EOF, 0)
  }
  public importDecl_list(): ImportDeclContext[] {
    return this.getTypedRuleContexts(ImportDeclContext) as ImportDeclContext[]
  }
  public importDecl(i: number): ImportDeclContext {
    return this.getTypedRuleContext(ImportDeclContext, i) as ImportDeclContext
  }
  public functionDecl_list(): FunctionDeclContext[] {
    return this.getTypedRuleContexts(FunctionDeclContext) as FunctionDeclContext[]
  }
  public functionDecl(i: number): FunctionDeclContext {
    return this.getTypedRuleContext(FunctionDeclContext, i) as FunctionDeclContext
  }
  public varDecl_list(): VarDeclContext[] {
    return this.getTypedRuleContexts(VarDeclContext) as VarDeclContext[]
  }
  public varDecl(i: number): VarDeclContext {
    return this.getTypedRuleContext(VarDeclContext, i) as VarDeclContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_sourceFile
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterSourceFile) {
      listener.enterSourceFile(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitSourceFile) {
      listener.exitSourceFile(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSourceFile) {
      return visitor.visitSourceFile(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class PackageClauseContext extends ParserRuleContext {
  public _packageName!: Token
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public PACKAGE(): TerminalNode {
    return this.getToken(GoParser.PACKAGE, 0)
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_packageClause
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterPackageClause) {
      listener.enterPackageClause(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitPackageClause) {
      listener.exitPackageClause(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitPackageClause) {
      return visitor.visitPackageClause(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ImportDeclContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public IMPORT(): TerminalNode {
    return this.getToken(GoParser.IMPORT, 0)
  }
  public importSpec_list(): ImportSpecContext[] {
    return this.getTypedRuleContexts(ImportSpecContext) as ImportSpecContext[]
  }
  public importSpec(i: number): ImportSpecContext {
    return this.getTypedRuleContext(ImportSpecContext, i) as ImportSpecContext
  }
  public L_PAREN(): TerminalNode {
    return this.getToken(GoParser.L_PAREN, 0)
  }
  public R_PAREN(): TerminalNode {
    return this.getToken(GoParser.R_PAREN, 0)
  }
  public eos_list(): EosContext[] {
    return this.getTypedRuleContexts(EosContext) as EosContext[]
  }
  public eos(i: number): EosContext {
    return this.getTypedRuleContext(EosContext, i) as EosContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_importDecl
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterImportDecl) {
      listener.enterImportDecl(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitImportDecl) {
      listener.exitImportDecl(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitImportDecl) {
      return visitor.visitImportDecl(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ImportSpecContext extends ParserRuleContext {
  public _alias!: Token
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public importPath(): ImportPathContext {
    return this.getTypedRuleContext(ImportPathContext, 0) as ImportPathContext
  }
  public DOT(): TerminalNode {
    return this.getToken(GoParser.DOT, 0)
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_importSpec
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterImportSpec) {
      listener.enterImportSpec(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitImportSpec) {
      listener.exitImportSpec(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitImportSpec) {
      return visitor.visitImportSpec(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ImportPathContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public string_(): String_Context {
    return this.getTypedRuleContext(String_Context, 0) as String_Context
  }
  public get ruleIndex(): number {
    return GoParser.RULE_importPath
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterImportPath) {
      listener.enterImportPath(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitImportPath) {
      listener.exitImportPath(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitImportPath) {
      return visitor.visitImportPath(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class IdentifierListContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public IDENTIFIER_list(): TerminalNode[] {
    return this.getTokens(GoParser.IDENTIFIER)
  }
  public IDENTIFIER(i: number): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, i)
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(GoParser.COMMA)
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(GoParser.COMMA, i)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_identifierList
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterIdentifierList) {
      listener.enterIdentifierList(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitIdentifierList) {
      listener.exitIdentifierList(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitIdentifierList) {
      return visitor.visitIdentifierList(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ExpressionListContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public expression_list(): ExpressionContext[] {
    return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[]
  }
  public expression(i: number): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(GoParser.COMMA)
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(GoParser.COMMA, i)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_expressionList
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterExpressionList) {
      listener.enterExpressionList(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitExpressionList) {
      listener.exitExpressionList(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitExpressionList) {
      return visitor.visitExpressionList(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class FunctionDeclContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public FUNC(): TerminalNode {
    return this.getToken(GoParser.FUNC, 0)
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0)
  }
  public signature(): SignatureContext {
    return this.getTypedRuleContext(SignatureContext, 0) as SignatureContext
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_functionDecl
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterFunctionDecl) {
      listener.enterFunctionDecl(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitFunctionDecl) {
      listener.exitFunctionDecl(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitFunctionDecl) {
      return visitor.visitFunctionDecl(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class VarDeclContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public VAR(): TerminalNode {
    return this.getToken(GoParser.VAR, 0)
  }
  public varSpec_list(): VarSpecContext[] {
    return this.getTypedRuleContexts(VarSpecContext) as VarSpecContext[]
  }
  public varSpec(i: number): VarSpecContext {
    return this.getTypedRuleContext(VarSpecContext, i) as VarSpecContext
  }
  public L_PAREN(): TerminalNode {
    return this.getToken(GoParser.L_PAREN, 0)
  }
  public R_PAREN(): TerminalNode {
    return this.getToken(GoParser.R_PAREN, 0)
  }
  public eos_list(): EosContext[] {
    return this.getTypedRuleContexts(EosContext) as EosContext[]
  }
  public eos(i: number): EosContext {
    return this.getTypedRuleContext(EosContext, i) as EosContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_varDecl
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterVarDecl) {
      listener.enterVarDecl(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitVarDecl) {
      listener.exitVarDecl(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitVarDecl) {
      return visitor.visitVarDecl(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class VarSpecContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public identifierList(): IdentifierListContext {
    return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext
  }
  public type_(): Type_Context {
    return this.getTypedRuleContext(Type_Context, 0) as Type_Context
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(GoParser.ASSIGN, 0)
  }
  public expressionList(): ExpressionListContext {
    return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_varSpec
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterVarSpec) {
      listener.enterVarSpec(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitVarSpec) {
      listener.exitVarSpec(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitVarSpec) {
      return visitor.visitVarSpec(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class BlockContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public L_CURLY(): TerminalNode {
    return this.getToken(GoParser.L_CURLY, 0)
  }
  public R_CURLY(): TerminalNode {
    return this.getToken(GoParser.R_CURLY, 0)
  }
  public statementList(): StatementListContext {
    return this.getTypedRuleContext(StatementListContext, 0) as StatementListContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_block
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterBlock) {
      listener.enterBlock(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitBlock) {
      listener.exitBlock(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitBlock) {
      return visitor.visitBlock(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class StatementListContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public statement_list(): StatementContext[] {
    return this.getTypedRuleContexts(StatementContext) as StatementContext[]
  }
  public statement(i: number): StatementContext {
    return this.getTypedRuleContext(StatementContext, i) as StatementContext
  }
  public eos_list(): EosContext[] {
    return this.getTypedRuleContexts(EosContext) as EosContext[]
  }
  public eos(i: number): EosContext {
    return this.getTypedRuleContext(EosContext, i) as EosContext
  }
  public SEMI_list(): TerminalNode[] {
    return this.getTokens(GoParser.SEMI)
  }
  public SEMI(i: number): TerminalNode {
    return this.getToken(GoParser.SEMI, i)
  }
  public EOS_list(): TerminalNode[] {
    return this.getTokens(GoParser.EOS)
  }
  public EOS(i: number): TerminalNode {
    return this.getToken(GoParser.EOS, i)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_statementList
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterStatementList) {
      listener.enterStatementList(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitStatementList) {
      listener.exitStatementList(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitStatementList) {
      return visitor.visitStatementList(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class StatementContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public varDecl(): VarDeclContext {
    return this.getTypedRuleContext(VarDeclContext, 0) as VarDeclContext
  }
  public simpleStmt(): SimpleStmtContext {
    return this.getTypedRuleContext(SimpleStmtContext, 0) as SimpleStmtContext
  }
  public goStmt(): GoStmtContext {
    return this.getTypedRuleContext(GoStmtContext, 0) as GoStmtContext
  }
  public returnStmt(): ReturnStmtContext {
    return this.getTypedRuleContext(ReturnStmtContext, 0) as ReturnStmtContext
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext
  }
  public ifStmt(): IfStmtContext {
    return this.getTypedRuleContext(IfStmtContext, 0) as IfStmtContext
  }
  public forStmt(): ForStmtContext {
    return this.getTypedRuleContext(ForStmtContext, 0) as ForStmtContext
  }
  public deferStmt(): DeferStmtContext {
    return this.getTypedRuleContext(DeferStmtContext, 0) as DeferStmtContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_statement
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterStatement) {
      listener.enterStatement(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitStatement) {
      listener.exitStatement(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitStatement) {
      return visitor.visitStatement(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class SimpleStmtContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public sendStmt(): SendStmtContext {
    return this.getTypedRuleContext(SendStmtContext, 0) as SendStmtContext
  }
  public assignment(): AssignmentContext {
    return this.getTypedRuleContext(AssignmentContext, 0) as AssignmentContext
  }
  public expressionStmt(): ExpressionStmtContext {
    return this.getTypedRuleContext(ExpressionStmtContext, 0) as ExpressionStmtContext
  }
  public shortVarDecl(): ShortVarDeclContext {
    return this.getTypedRuleContext(ShortVarDeclContext, 0) as ShortVarDeclContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_simpleStmt
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterSimpleStmt) {
      listener.enterSimpleStmt(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitSimpleStmt) {
      listener.exitSimpleStmt(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSimpleStmt) {
      return visitor.visitSimpleStmt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ExpressionStmtContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_expressionStmt
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterExpressionStmt) {
      listener.enterExpressionStmt(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitExpressionStmt) {
      listener.exitExpressionStmt(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitExpressionStmt) {
      return visitor.visitExpressionStmt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class SendStmtContext extends ParserRuleContext {
  public _channel!: ExpressionContext
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public RECEIVE(): TerminalNode {
    return this.getToken(GoParser.RECEIVE, 0)
  }
  public expression_list(): ExpressionContext[] {
    return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[]
  }
  public expression(i: number): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_sendStmt
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterSendStmt) {
      listener.enterSendStmt(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitSendStmt) {
      listener.exitSendStmt(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSendStmt) {
      return visitor.visitSendStmt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class AssignmentContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public expressionList_list(): ExpressionListContext[] {
    return this.getTypedRuleContexts(ExpressionListContext) as ExpressionListContext[]
  }
  public expressionList(i: number): ExpressionListContext {
    return this.getTypedRuleContext(ExpressionListContext, i) as ExpressionListContext
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(GoParser.ASSIGN, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_assignment
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterAssignment) {
      listener.enterAssignment(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitAssignment) {
      listener.exitAssignment(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitAssignment) {
      return visitor.visitAssignment(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ShortVarDeclContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public identifierList(): IdentifierListContext {
    return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext
  }
  public DECLARE_ASSIGN(): TerminalNode {
    return this.getToken(GoParser.DECLARE_ASSIGN, 0)
  }
  public expressionList(): ExpressionListContext {
    return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_shortVarDecl
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterShortVarDecl) {
      listener.enterShortVarDecl(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitShortVarDecl) {
      listener.exitShortVarDecl(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitShortVarDecl) {
      return visitor.visitShortVarDecl(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ReturnStmtContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public RETURN(): TerminalNode {
    return this.getToken(GoParser.RETURN, 0)
  }
  public expressionList(): ExpressionListContext {
    return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_returnStmt
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterReturnStmt) {
      listener.enterReturnStmt(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitReturnStmt) {
      listener.exitReturnStmt(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitReturnStmt) {
      return visitor.visitReturnStmt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class DeferStmtContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public DEFER(): TerminalNode {
    return this.getToken(GoParser.DEFER, 0)
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_deferStmt
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterDeferStmt) {
      listener.enterDeferStmt(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitDeferStmt) {
      listener.exitDeferStmt(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitDeferStmt) {
      return visitor.visitDeferStmt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class IfStmtContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public IF(): TerminalNode {
    return this.getToken(GoParser.IF, 0)
  }
  public block_list(): BlockContext[] {
    return this.getTypedRuleContexts(BlockContext) as BlockContext[]
  }
  public block(i: number): BlockContext {
    return this.getTypedRuleContext(BlockContext, i) as BlockContext
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext
  }
  public eos(): EosContext {
    return this.getTypedRuleContext(EosContext, 0) as EosContext
  }
  public simpleStmt(): SimpleStmtContext {
    return this.getTypedRuleContext(SimpleStmtContext, 0) as SimpleStmtContext
  }
  public ELSE(): TerminalNode {
    return this.getToken(GoParser.ELSE, 0)
  }
  public ifStmt(): IfStmtContext {
    return this.getTypedRuleContext(IfStmtContext, 0) as IfStmtContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_ifStmt
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterIfStmt) {
      listener.enterIfStmt(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitIfStmt) {
      listener.exitIfStmt(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitIfStmt) {
      return visitor.visitIfStmt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class RecvStmtContext extends ParserRuleContext {
  public _recvExpr!: ExpressionContext
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext
  }
  public expressionList(): ExpressionListContext {
    return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(GoParser.ASSIGN, 0)
  }
  public identifierList(): IdentifierListContext {
    return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext
  }
  public DECLARE_ASSIGN(): TerminalNode {
    return this.getToken(GoParser.DECLARE_ASSIGN, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_recvStmt
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterRecvStmt) {
      listener.enterRecvStmt(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitRecvStmt) {
      listener.exitRecvStmt(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitRecvStmt) {
      return visitor.visitRecvStmt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ForStmtContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public FOR(): TerminalNode {
    return this.getToken(GoParser.FOR, 0)
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext
  }
  public forClause(): ForClauseContext {
    return this.getTypedRuleContext(ForClauseContext, 0) as ForClauseContext
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext
  }
  public rangeClause(): RangeClauseContext {
    return this.getTypedRuleContext(RangeClauseContext, 0) as RangeClauseContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_forStmt
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterForStmt) {
      listener.enterForStmt(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitForStmt) {
      listener.exitForStmt(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitForStmt) {
      return visitor.visitForStmt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ForClauseContext extends ParserRuleContext {
  public _initStmt!: SimpleStmtContext
  public _postStmt!: SimpleStmtContext
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public eos_list(): EosContext[] {
    return this.getTypedRuleContexts(EosContext) as EosContext[]
  }
  public eos(i: number): EosContext {
    return this.getTypedRuleContext(EosContext, i) as EosContext
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext
  }
  public simpleStmt_list(): SimpleStmtContext[] {
    return this.getTypedRuleContexts(SimpleStmtContext) as SimpleStmtContext[]
  }
  public simpleStmt(i: number): SimpleStmtContext {
    return this.getTypedRuleContext(SimpleStmtContext, i) as SimpleStmtContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_forClause
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterForClause) {
      listener.enterForClause(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitForClause) {
      listener.exitForClause(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitForClause) {
      return visitor.visitForClause(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class RangeClauseContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public RANGE(): TerminalNode {
    return this.getToken(GoParser.RANGE, 0)
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext
  }
  public expressionList(): ExpressionListContext {
    return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(GoParser.ASSIGN, 0)
  }
  public identifierList(): IdentifierListContext {
    return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext
  }
  public DECLARE_ASSIGN(): TerminalNode {
    return this.getToken(GoParser.DECLARE_ASSIGN, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_rangeClause
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterRangeClause) {
      listener.enterRangeClause(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitRangeClause) {
      listener.exitRangeClause(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitRangeClause) {
      return visitor.visitRangeClause(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class GoStmtContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public GO(): TerminalNode {
    return this.getToken(GoParser.GO, 0)
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_goStmt
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterGoStmt) {
      listener.enterGoStmt(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitGoStmt) {
      listener.exitGoStmt(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitGoStmt) {
      return visitor.visitGoStmt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Type_Context extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public typeName(): TypeNameContext {
    return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext
  }
  public channelType(): ChannelTypeContext {
    return this.getTypedRuleContext(ChannelTypeContext, 0) as ChannelTypeContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_type_
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterType_) {
      listener.enterType_(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitType_) {
      listener.exitType_(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitType_) {
      return visitor.visitType_(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class TypeNameContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public qualifiedIdent(): QualifiedIdentContext {
    return this.getTypedRuleContext(QualifiedIdentContext, 0) as QualifiedIdentContext
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_typeName
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterTypeName) {
      listener.enterTypeName(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitTypeName) {
      listener.exitTypeName(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitTypeName) {
      return visitor.visitTypeName(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ElementTypeContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public type_(): Type_Context {
    return this.getTypedRuleContext(Type_Context, 0) as Type_Context
  }
  public get ruleIndex(): number {
    return GoParser.RULE_elementType
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterElementType) {
      listener.enterElementType(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitElementType) {
      listener.exitElementType(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitElementType) {
      return visitor.visitElementType(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ChannelTypeContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public CHAN(): TerminalNode {
    return this.getToken(GoParser.CHAN, 0)
  }
  public elementType(): ElementTypeContext {
    return this.getTypedRuleContext(ElementTypeContext, 0) as ElementTypeContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_channelType
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterChannelType) {
      listener.enterChannelType(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitChannelType) {
      listener.exitChannelType(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitChannelType) {
      return visitor.visitChannelType(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class SignatureContext extends ParserRuleContext {
  public _result!: Type_Context
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public parameters(): ParametersContext {
    return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext
  }
  public type_(): Type_Context {
    return this.getTypedRuleContext(Type_Context, 0) as Type_Context
  }
  public get ruleIndex(): number {
    return GoParser.RULE_signature
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterSignature) {
      listener.enterSignature(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitSignature) {
      listener.exitSignature(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSignature) {
      return visitor.visitSignature(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ParametersContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public L_PAREN(): TerminalNode {
    return this.getToken(GoParser.L_PAREN, 0)
  }
  public R_PAREN(): TerminalNode {
    return this.getToken(GoParser.R_PAREN, 0)
  }
  public parameterDecl_list(): ParameterDeclContext[] {
    return this.getTypedRuleContexts(ParameterDeclContext) as ParameterDeclContext[]
  }
  public parameterDecl(i: number): ParameterDeclContext {
    return this.getTypedRuleContext(ParameterDeclContext, i) as ParameterDeclContext
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(GoParser.COMMA)
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(GoParser.COMMA, i)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_parameters
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterParameters) {
      listener.enterParameters(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitParameters) {
      listener.exitParameters(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitParameters) {
      return visitor.visitParameters(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ParameterDeclContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public type_(): Type_Context {
    return this.getTypedRuleContext(Type_Context, 0) as Type_Context
  }
  public identifierList(): IdentifierListContext {
    return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_parameterDecl
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterParameterDecl) {
      listener.enterParameterDecl(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitParameterDecl) {
      listener.exitParameterDecl(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitParameterDecl) {
      return visitor.visitParameterDecl(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ExpressionContext extends ParserRuleContext {
  public _unary_op!: Token
  public _mul_op!: Token
  public _add_op!: Token
  public _rel_op!: Token
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public primaryExpr(): PrimaryExprContext {
    return this.getTypedRuleContext(PrimaryExprContext, 0) as PrimaryExprContext
  }
  public expression_list(): ExpressionContext[] {
    return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[]
  }
  public expression(i: number): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext
  }
  public RECEIVE(): TerminalNode {
    return this.getToken(GoParser.RECEIVE, 0)
  }
  public STAR(): TerminalNode {
    return this.getToken(GoParser.STAR, 0)
  }
  public DIV(): TerminalNode {
    return this.getToken(GoParser.DIV, 0)
  }
  public MOD(): TerminalNode {
    return this.getToken(GoParser.MOD, 0)
  }
  public PLUS(): TerminalNode {
    return this.getToken(GoParser.PLUS, 0)
  }
  public MINUS(): TerminalNode {
    return this.getToken(GoParser.MINUS, 0)
  }
  public EQUALS(): TerminalNode {
    return this.getToken(GoParser.EQUALS, 0)
  }
  public NOT_EQUALS(): TerminalNode {
    return this.getToken(GoParser.NOT_EQUALS, 0)
  }
  public LESS(): TerminalNode {
    return this.getToken(GoParser.LESS, 0)
  }
  public LESS_OR_EQUALS(): TerminalNode {
    return this.getToken(GoParser.LESS_OR_EQUALS, 0)
  }
  public GREATER(): TerminalNode {
    return this.getToken(GoParser.GREATER, 0)
  }
  public GREATER_OR_EQUALS(): TerminalNode {
    return this.getToken(GoParser.GREATER_OR_EQUALS, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_expression
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterExpression) {
      listener.enterExpression(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitExpression) {
      listener.exitExpression(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitExpression) {
      return visitor.visitExpression(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class PrimaryExprContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public operand(): OperandContext {
    return this.getTypedRuleContext(OperandContext, 0) as OperandContext
  }
  public methodExpr(): MethodExprContext {
    return this.getTypedRuleContext(MethodExprContext, 0) as MethodExprContext
  }
  public primaryExpr(): PrimaryExprContext {
    return this.getTypedRuleContext(PrimaryExprContext, 0) as PrimaryExprContext
  }
  public DOT(): TerminalNode {
    return this.getToken(GoParser.DOT, 0)
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0)
  }
  public arguments(): ArgumentsContext {
    return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_primaryExpr
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterPrimaryExpr) {
      listener.enterPrimaryExpr(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitPrimaryExpr) {
      listener.exitPrimaryExpr(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitPrimaryExpr) {
      return visitor.visitPrimaryExpr(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class OperandContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public literal(): LiteralContext {
    return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext
  }
  public operandName(): OperandNameContext {
    return this.getTypedRuleContext(OperandNameContext, 0) as OperandNameContext
  }
  public L_PAREN(): TerminalNode {
    return this.getToken(GoParser.L_PAREN, 0)
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext
  }
  public R_PAREN(): TerminalNode {
    return this.getToken(GoParser.R_PAREN, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_operand
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterOperand) {
      listener.enterOperand(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitOperand) {
      listener.exitOperand(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitOperand) {
      return visitor.visitOperand(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class LiteralContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public basicLit(): BasicLitContext {
    return this.getTypedRuleContext(BasicLitContext, 0) as BasicLitContext
  }
  public functionLit(): FunctionLitContext {
    return this.getTypedRuleContext(FunctionLitContext, 0) as FunctionLitContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_literal
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterLiteral) {
      listener.enterLiteral(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitLiteral) {
      listener.exitLiteral(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitLiteral) {
      return visitor.visitLiteral(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class BasicLitContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public NIL_LIT(): TerminalNode {
    return this.getToken(GoParser.NIL_LIT, 0)
  }
  public DECIMAL_LIT(): TerminalNode {
    return this.getToken(GoParser.DECIMAL_LIT, 0)
  }
  public string_(): String_Context {
    return this.getTypedRuleContext(String_Context, 0) as String_Context
  }
  public get ruleIndex(): number {
    return GoParser.RULE_basicLit
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterBasicLit) {
      listener.enterBasicLit(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitBasicLit) {
      listener.exitBasicLit(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitBasicLit) {
      return visitor.visitBasicLit(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class OperandNameContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_operandName
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterOperandName) {
      listener.enterOperandName(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitOperandName) {
      listener.exitOperandName(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitOperandName) {
      return visitor.visitOperandName(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class QualifiedIdentContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public IDENTIFIER_list(): TerminalNode[] {
    return this.getTokens(GoParser.IDENTIFIER)
  }
  public IDENTIFIER(i: number): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, i)
  }
  public DOT(): TerminalNode {
    return this.getToken(GoParser.DOT, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_qualifiedIdent
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterQualifiedIdent) {
      listener.enterQualifiedIdent(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitQualifiedIdent) {
      listener.exitQualifiedIdent(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitQualifiedIdent) {
      return visitor.visitQualifiedIdent(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class String_Context extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public RAW_STRING_LIT(): TerminalNode {
    return this.getToken(GoParser.RAW_STRING_LIT, 0)
  }
  public INTERPRETED_STRING_LIT(): TerminalNode {
    return this.getToken(GoParser.INTERPRETED_STRING_LIT, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_string_
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterString_) {
      listener.enterString_(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitString_) {
      listener.exitString_(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitString_) {
      return visitor.visitString_(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class FunctionLitContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public FUNC(): TerminalNode {
    return this.getToken(GoParser.FUNC, 0)
  }
  public signature(): SignatureContext {
    return this.getTypedRuleContext(SignatureContext, 0) as SignatureContext
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_functionLit
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterFunctionLit) {
      listener.enterFunctionLit(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitFunctionLit) {
      listener.exitFunctionLit(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitFunctionLit) {
      return visitor.visitFunctionLit(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ArgumentsContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public L_PAREN(): TerminalNode {
    return this.getToken(GoParser.L_PAREN, 0)
  }
  public R_PAREN(): TerminalNode {
    return this.getToken(GoParser.R_PAREN, 0)
  }
  public expressionList(): ExpressionListContext {
    return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext
  }
  public get ruleIndex(): number {
    return GoParser.RULE_arguments
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterArguments) {
      listener.enterArguments(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitArguments) {
      listener.exitArguments(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitArguments) {
      return visitor.visitArguments(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class MethodExprContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public type_(): Type_Context {
    return this.getTypedRuleContext(Type_Context, 0) as Type_Context
  }
  public DOT(): TerminalNode {
    return this.getToken(GoParser.DOT, 0)
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_methodExpr
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterMethodExpr) {
      listener.enterMethodExpr(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitMethodExpr) {
      listener.exitMethodExpr(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitMethodExpr) {
      return visitor.visitMethodExpr(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class EosContext extends ParserRuleContext {
  constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
    super(parent, invokingState)
    this.parser = parser
  }
  public SEMI(): TerminalNode {
    return this.getToken(GoParser.SEMI, 0)
  }
  public EOF(): TerminalNode {
    return this.getToken(GoParser.EOF, 0)
  }
  public EOS(): TerminalNode {
    return this.getToken(GoParser.EOS, 0)
  }
  public get ruleIndex(): number {
    return GoParser.RULE_eos
  }
  public enterRule(listener: GoParserListener): void {
    if (listener.enterEos) {
      listener.enterEos(this)
    }
  }
  public exitRule(listener: GoParserListener): void {
    if (listener.exitEos) {
      listener.exitEos(this)
    }
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitEos) {
      return visitor.visitEos(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}
