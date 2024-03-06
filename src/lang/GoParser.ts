// Generated from GoParser.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import GoParserListener from "./GoParserListener.js";
import GoParserVisitor from "./GoParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

import GoParserBase from './GoParserBase';

export default class GoParser extends GoParserBase {
	public static readonly MAIN_PACKAGE = 1;
	public static readonly BREAK = 2;
	public static readonly DEFAULT = 3;
	public static readonly FUNC = 4;
	public static readonly INTERFACE = 5;
	public static readonly SELECT = 6;
	public static readonly CASE = 7;
	public static readonly DEFER = 8;
	public static readonly GO = 9;
	public static readonly MAP = 10;
	public static readonly STRUCT = 11;
	public static readonly CHAN = 12;
	public static readonly ELSE = 13;
	public static readonly GOTO = 14;
	public static readonly PACKAGE = 15;
	public static readonly SWITCH = 16;
	public static readonly CONST = 17;
	public static readonly FALLTHROUGH = 18;
	public static readonly IF = 19;
	public static readonly RANGE = 20;
	public static readonly TYPE = 21;
	public static readonly CONTINUE = 22;
	public static readonly FOR = 23;
	public static readonly IMPORT = 24;
	public static readonly RETURN = 25;
	public static readonly VAR = 26;
	public static readonly NIL_LIT = 27;
	public static readonly IDENTIFIER = 28;
	public static readonly L_PAREN = 29;
	public static readonly R_PAREN = 30;
	public static readonly L_CURLY = 31;
	public static readonly R_CURLY = 32;
	public static readonly L_BRACKET = 33;
	public static readonly R_BRACKET = 34;
	public static readonly ASSIGN = 35;
	public static readonly COMMA = 36;
	public static readonly SEMI = 37;
	public static readonly COLON = 38;
	public static readonly DOT = 39;
	public static readonly PLUS_PLUS = 40;
	public static readonly MINUS_MINUS = 41;
	public static readonly DECLARE_ASSIGN = 42;
	public static readonly ELLIPSIS = 43;
	public static readonly LOGICAL_OR = 44;
	public static readonly LOGICAL_AND = 45;
	public static readonly EQUALS = 46;
	public static readonly NOT_EQUALS = 47;
	public static readonly LESS = 48;
	public static readonly LESS_OR_EQUALS = 49;
	public static readonly GREATER = 50;
	public static readonly GREATER_OR_EQUALS = 51;
	public static readonly OR = 52;
	public static readonly DIV = 53;
	public static readonly MOD = 54;
	public static readonly LSHIFT = 55;
	public static readonly RSHIFT = 56;
	public static readonly BIT_CLEAR = 57;
	public static readonly UNDERLYING = 58;
	public static readonly EXCLAMATION = 59;
	public static readonly PLUS = 60;
	public static readonly MINUS = 61;
	public static readonly CARET = 62;
	public static readonly STAR = 63;
	public static readonly AMPERSAND = 64;
	public static readonly RECEIVE = 65;
	public static readonly DECIMAL_LIT = 66;
	public static readonly BINARY_LIT = 67;
	public static readonly OCTAL_LIT = 68;
	public static readonly HEX_LIT = 69;
	public static readonly FLOAT_LIT = 70;
	public static readonly DECIMAL_FLOAT_LIT = 71;
	public static readonly HEX_FLOAT_LIT = 72;
	public static readonly IMAGINARY_LIT = 73;
	public static readonly RUNE_LIT = 74;
	public static readonly BYTE_VALUE = 75;
	public static readonly OCTAL_BYTE_VALUE = 76;
	public static readonly HEX_BYTE_VALUE = 77;
	public static readonly LITTLE_U_VALUE = 78;
	public static readonly BIG_U_VALUE = 79;
	public static readonly RAW_STRING_LIT = 80;
	public static readonly INTERPRETED_STRING_LIT = 81;
	public static readonly WS = 82;
	public static readonly COMMENT = 83;
	public static readonly TERMINATOR = 84;
	public static readonly LINE_COMMENT = 85;
	public static readonly WS_NLSEMI = 86;
	public static readonly COMMENT_NLSEMI = 87;
	public static readonly LINE_COMMENT_NLSEMI = 88;
	public static readonly EOS = 89;
	public static readonly OTHER = 90;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_sourceFile = 0;
	public static readonly RULE_packageClause = 1;
	public static readonly RULE_importDecl = 2;
	public static readonly RULE_importSpec = 3;
	public static readonly RULE_importPath = 4;
	public static readonly RULE_declaration = 5;
	public static readonly RULE_constDecl = 6;
	public static readonly RULE_constSpec = 7;
	public static readonly RULE_identifierList = 8;
	public static readonly RULE_expressionList = 9;
	public static readonly RULE_typeParameters = 10;
	public static readonly RULE_typeParameterDecl = 11;
	public static readonly RULE_typeElement = 12;
	public static readonly RULE_typeTerm = 13;
	public static readonly RULE_functionDecl = 14;
	public static readonly RULE_varDecl = 15;
	public static readonly RULE_varSpec = 16;
	public static readonly RULE_block = 17;
	public static readonly RULE_statementList = 18;
	public static readonly RULE_statement = 19;
	public static readonly RULE_simpleStmt = 20;
	public static readonly RULE_expressionStmt = 21;
	public static readonly RULE_sendStmt = 22;
	public static readonly RULE_incDecStmt = 23;
	public static readonly RULE_assignment = 24;
	public static readonly RULE_assign_op = 25;
	public static readonly RULE_shortVarDecl = 26;
	public static readonly RULE_returnStmt = 27;
	public static readonly RULE_deferStmt = 28;
	public static readonly RULE_ifStmt = 29;
	public static readonly RULE_typeList = 30;
	public static readonly RULE_selectStmt = 31;
	public static readonly RULE_commClause = 32;
	public static readonly RULE_commCase = 33;
	public static readonly RULE_recvStmt = 34;
	public static readonly RULE_forStmt = 35;
	public static readonly RULE_forClause = 36;
	public static readonly RULE_rangeClause = 37;
	public static readonly RULE_goStmt = 38;
	public static readonly RULE_type_ = 39;
	public static readonly RULE_typeArgs = 40;
	public static readonly RULE_typeName = 41;
	public static readonly RULE_typeLit = 42;
	public static readonly RULE_arrayLength = 43;
	public static readonly RULE_elementType = 44;
	public static readonly RULE_channelType = 45;
	public static readonly RULE_signature = 46;
	public static readonly RULE_result = 47;
	public static readonly RULE_parameters = 48;
	public static readonly RULE_parameterDecl = 49;
	public static readonly RULE_expression = 50;
	public static readonly RULE_primaryExpr = 51;
	public static readonly RULE_operand = 52;
	public static readonly RULE_literal = 53;
	public static readonly RULE_basicLit = 54;
	public static readonly RULE_integer = 55;
	public static readonly RULE_operandName = 56;
	public static readonly RULE_qualifiedIdent = 57;
	public static readonly RULE_compositeLit = 58;
	public static readonly RULE_literalType = 59;
	public static readonly RULE_literalValue = 60;
	public static readonly RULE_elementList = 61;
	public static readonly RULE_keyedElement = 62;
	public static readonly RULE_key = 63;
	public static readonly RULE_element = 64;
	public static readonly RULE_string_ = 65;
	public static readonly RULE_embeddedField = 66;
	public static readonly RULE_functionLit = 67;
	public static readonly RULE_index = 68;
	public static readonly RULE_slice_ = 69;
	public static readonly RULE_typeAssertion = 70;
	public static readonly RULE_arguments = 71;
	public static readonly RULE_methodExpr = 72;
	public static readonly RULE_eos = 73;
	public static readonly literalNames: (string | null)[] = [ null, "'main'", 
                                                            "'break'", "'default'", 
                                                            "'func'", "'interface'", 
                                                            "'select'", 
                                                            "'case'", "'defer'", 
                                                            "'go'", "'map'", 
                                                            "'struct'", 
                                                            "'chan'", "'else'", 
                                                            "'goto'", "'package'", 
                                                            "'switch'", 
                                                            "'const'", "'fallthrough'", 
                                                            "'if'", "'range'", 
                                                            "'type'", "'continue'", 
                                                            "'for'", "'import'", 
                                                            "'return'", 
                                                            "'var'", "'nil'", 
                                                            null, "'('", 
                                                            "')'", "'{'", 
                                                            "'}'", "'['", 
                                                            "']'", "'='", 
                                                            "','", "';'", 
                                                            "':'", "'.'", 
                                                            "'++'", "'--'", 
                                                            "':='", "'...'", 
                                                            "'||'", "'&&'", 
                                                            "'=='", "'!='", 
                                                            "'<'", "'<='", 
                                                            "'>'", "'>='", 
                                                            "'|'", "'/'", 
                                                            "'%'", "'<<'", 
                                                            "'>>'", "'&^'", 
                                                            "'~'", "'!'", 
                                                            "'+'", "'-'", 
                                                            "'^'", "'*'", 
                                                            "'&'", "'<-'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "MAIN_PACKAGE", 
                                                             "BREAK", "DEFAULT", 
                                                             "FUNC", "INTERFACE", 
                                                             "SELECT", "CASE", 
                                                             "DEFER", "GO", 
                                                             "MAP", "STRUCT", 
                                                             "CHAN", "ELSE", 
                                                             "GOTO", "PACKAGE", 
                                                             "SWITCH", "CONST", 
                                                             "FALLTHROUGH", 
                                                             "IF", "RANGE", 
                                                             "TYPE", "CONTINUE", 
                                                             "FOR", "IMPORT", 
                                                             "RETURN", "VAR", 
                                                             "NIL_LIT", 
                                                             "IDENTIFIER", 
                                                             "L_PAREN", 
                                                             "R_PAREN", 
                                                             "L_CURLY", 
                                                             "R_CURLY", 
                                                             "L_BRACKET", 
                                                             "R_BRACKET", 
                                                             "ASSIGN", "COMMA", 
                                                             "SEMI", "COLON", 
                                                             "DOT", "PLUS_PLUS", 
                                                             "MINUS_MINUS", 
                                                             "DECLARE_ASSIGN", 
                                                             "ELLIPSIS", 
                                                             "LOGICAL_OR", 
                                                             "LOGICAL_AND", 
                                                             "EQUALS", "NOT_EQUALS", 
                                                             "LESS", "LESS_OR_EQUALS", 
                                                             "GREATER", 
                                                             "GREATER_OR_EQUALS", 
                                                             "OR", "DIV", 
                                                             "MOD", "LSHIFT", 
                                                             "RSHIFT", "BIT_CLEAR", 
                                                             "UNDERLYING", 
                                                             "EXCLAMATION", 
                                                             "PLUS", "MINUS", 
                                                             "CARET", "STAR", 
                                                             "AMPERSAND", 
                                                             "RECEIVE", 
                                                             "DECIMAL_LIT", 
                                                             "BINARY_LIT", 
                                                             "OCTAL_LIT", 
                                                             "HEX_LIT", 
                                                             "FLOAT_LIT", 
                                                             "DECIMAL_FLOAT_LIT", 
                                                             "HEX_FLOAT_LIT", 
                                                             "IMAGINARY_LIT", 
                                                             "RUNE_LIT", 
                                                             "BYTE_VALUE", 
                                                             "OCTAL_BYTE_VALUE", 
                                                             "HEX_BYTE_VALUE", 
                                                             "LITTLE_U_VALUE", 
                                                             "BIG_U_VALUE", 
                                                             "RAW_STRING_LIT", 
                                                             "INTERPRETED_STRING_LIT", 
                                                             "WS", "COMMENT", 
                                                             "TERMINATOR", 
                                                             "LINE_COMMENT", 
                                                             "WS_NLSEMI", 
                                                             "COMMENT_NLSEMI", 
                                                             "LINE_COMMENT_NLSEMI", 
                                                             "EOS", "OTHER" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"sourceFile", "packageClause", "importDecl", "importSpec", "importPath", 
		"declaration", "constDecl", "constSpec", "identifierList", "expressionList", 
		"typeParameters", "typeParameterDecl", "typeElement", "typeTerm", "functionDecl", 
		"varDecl", "varSpec", "block", "statementList", "statement", "simpleStmt", 
		"expressionStmt", "sendStmt", "incDecStmt", "assignment", "assign_op", 
		"shortVarDecl", "returnStmt", "deferStmt", "ifStmt", "typeList", "selectStmt", 
		"commClause", "commCase", "recvStmt", "forStmt", "forClause", "rangeClause", 
		"goStmt", "type_", "typeArgs", "typeName", "typeLit", "arrayLength", "elementType", 
		"channelType", "signature", "result", "parameters", "parameterDecl", "expression", 
		"primaryExpr", "operand", "literal", "basicLit", "integer", "operandName", 
		"qualifiedIdent", "compositeLit", "literalType", "literalValue", "elementList", 
		"keyedElement", "key", "element", "string_", "embeddedField", "functionLit", 
		"index", "slice_", "typeAssertion", "arguments", "methodExpr", "eos",
	];
	public get grammarFileName(): string { return "GoParser.g4"; }
	public get literalNames(): (string | null)[] { return GoParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return GoParser.symbolicNames; }
	public get ruleNames(): string[] { return GoParser.ruleNames; }
	public get serializedATN(): number[] { return GoParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, GoParser._ATN, GoParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public sourceFile(): SourceFileContext {
		let localctx: SourceFileContext = new SourceFileContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, GoParser.RULE_sourceFile);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 148;
			this.packageClause();
			this.state = 149;
			this.eos();
			this.state = 155;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===24) {
				{
				{
				this.state = 150;
				this.importDecl();
				this.state = 151;
				this.eos();
				}
				}
				this.state = 157;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 166;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 67239952) !== 0)) {
				{
				{
				this.state = 160;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 4:
					{
					this.state = 158;
					this.functionDecl();
					}
					break;
				case 17:
				case 26:
					{
					this.state = 159;
					this.declaration();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 162;
				this.eos();
				}
				}
				this.state = 168;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 169;
			this.match(GoParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public packageClause(): PackageClauseContext {
		let localctx: PackageClauseContext = new PackageClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, GoParser.RULE_packageClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 171;
			this.match(GoParser.PACKAGE);
			this.state = 172;
			localctx._packageName = this.match(GoParser.MAIN_PACKAGE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public importDecl(): ImportDeclContext {
		let localctx: ImportDeclContext = new ImportDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, GoParser.RULE_importDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 174;
			this.match(GoParser.IMPORT);
			this.state = 186;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 28:
			case 39:
			case 80:
			case 81:
				{
				this.state = 175;
				this.importSpec();
				}
				break;
			case 29:
				{
				this.state = 176;
				this.match(GoParser.L_PAREN);
				this.state = 182;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===28 || _la===39 || _la===80 || _la===81) {
					{
					{
					this.state = 177;
					this.importSpec();
					this.state = 178;
					this.eos();
					}
					}
					this.state = 184;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 185;
				this.match(GoParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public importSpec(): ImportSpecContext {
		let localctx: ImportSpecContext = new ImportSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, GoParser.RULE_importSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 189;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===28 || _la===39) {
				{
				this.state = 188;
				localctx._alias = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===28 || _la===39)) {
				    localctx._alias = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
			}

			this.state = 191;
			this.importPath();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public importPath(): ImportPathContext {
		let localctx: ImportPathContext = new ImportPathContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, GoParser.RULE_importPath);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 193;
			this.string_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declaration(): DeclarationContext {
		let localctx: DeclarationContext = new DeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, GoParser.RULE_declaration);
		try {
			this.state = 197;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 17:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 195;
				this.constDecl();
				}
				break;
			case 26:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 196;
				this.varDecl();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constDecl(): ConstDeclContext {
		let localctx: ConstDeclContext = new ConstDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, GoParser.RULE_constDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 199;
			this.match(GoParser.CONST);
			this.state = 211;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 28:
				{
				this.state = 200;
				this.constSpec();
				}
				break;
			case 29:
				{
				this.state = 201;
				this.match(GoParser.L_PAREN);
				this.state = 207;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===28) {
					{
					{
					this.state = 202;
					this.constSpec();
					this.state = 203;
					this.eos();
					}
					}
					this.state = 209;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 210;
				this.match(GoParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constSpec(): ConstSpecContext {
		let localctx: ConstSpecContext = new ConstSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, GoParser.RULE_constSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 213;
			this.identifierList();
			this.state = 219;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				this.state = 215;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 805310464) !== 0) || _la===65) {
					{
					this.state = 214;
					this.type_();
					}
				}

				this.state = 217;
				this.match(GoParser.ASSIGN);
				this.state = 218;
				this.expressionList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public identifierList(): IdentifierListContext {
		let localctx: IdentifierListContext = new IdentifierListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, GoParser.RULE_identifierList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 221;
			this.match(GoParser.IDENTIFIER);
			this.state = 226;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 222;
					this.match(GoParser.COMMA);
					this.state = 223;
					this.match(GoParser.IDENTIFIER);
					}
					}
				}
				this.state = 228;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expressionList(): ExpressionListContext {
		let localctx: ExpressionListContext = new ExpressionListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, GoParser.RULE_expressionList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 229;
			this.expression(0);
			this.state = 234;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 230;
					this.match(GoParser.COMMA);
					this.state = 231;
					this.expression(0);
					}
					}
				}
				this.state = 236;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeParameters(): TypeParametersContext {
		let localctx: TypeParametersContext = new TypeParametersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, GoParser.RULE_typeParameters);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 237;
			this.match(GoParser.L_BRACKET);
			this.state = 238;
			this.typeParameterDecl();
			this.state = 243;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===36) {
				{
				{
				this.state = 239;
				this.match(GoParser.COMMA);
				this.state = 240;
				this.typeParameterDecl();
				}
				}
				this.state = 245;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 246;
			this.match(GoParser.R_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeParameterDecl(): TypeParameterDeclContext {
		let localctx: TypeParameterDeclContext = new TypeParameterDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, GoParser.RULE_typeParameterDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 248;
			this.identifierList();
			this.state = 249;
			this.typeElement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeElement(): TypeElementContext {
		let localctx: TypeElementContext = new TypeElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, GoParser.RULE_typeElement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 251;
			this.typeTerm();
			this.state = 256;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===52) {
				{
				{
				this.state = 252;
				this.match(GoParser.OR);
				this.state = 253;
				this.typeTerm();
				}
				}
				this.state = 258;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeTerm(): TypeTermContext {
		let localctx: TypeTermContext = new TypeTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, GoParser.RULE_typeTerm);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 260;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===58) {
				{
				this.state = 259;
				this.match(GoParser.UNDERLYING);
				}
			}

			this.state = 262;
			this.type_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionDecl(): FunctionDeclContext {
		let localctx: FunctionDeclContext = new FunctionDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, GoParser.RULE_functionDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 264;
			this.match(GoParser.FUNC);
			this.state = 265;
			this.match(GoParser.IDENTIFIER);
			this.state = 267;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===33) {
				{
				this.state = 266;
				this.typeParameters();
				}
			}

			this.state = 269;
			this.signature();
			this.state = 271;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				{
				this.state = 270;
				this.block();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public varDecl(): VarDeclContext {
		let localctx: VarDeclContext = new VarDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, GoParser.RULE_varDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 273;
			this.match(GoParser.VAR);
			this.state = 285;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 28:
				{
				this.state = 274;
				this.varSpec();
				}
				break;
			case 29:
				{
				this.state = 275;
				this.match(GoParser.L_PAREN);
				this.state = 281;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===28) {
					{
					{
					this.state = 276;
					this.varSpec();
					this.state = 277;
					this.eos();
					}
					}
					this.state = 283;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 284;
				this.match(GoParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public varSpec(): VarSpecContext {
		let localctx: VarSpecContext = new VarSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, GoParser.RULE_varSpec);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 287;
			this.identifierList();
			this.state = 295;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
			case 28:
			case 29:
			case 65:
				{
				this.state = 288;
				this.type_();
				this.state = 291;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 20, this._ctx) ) {
				case 1:
					{
					this.state = 289;
					this.match(GoParser.ASSIGN);
					this.state = 290;
					this.expressionList();
					}
					break;
				}
				}
				break;
			case 35:
				{
				this.state = 293;
				this.match(GoParser.ASSIGN);
				this.state = 294;
				this.expressionList();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let localctx: BlockContext = new BlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, GoParser.RULE_block);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 297;
			this.match(GoParser.L_CURLY);
			this.state = 299;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 298;
				this.statementList();
				}
				break;
			}
			this.state = 301;
			this.match(GoParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statementList(): StatementListContext {
		let localctx: StatementListContext = new StatementListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, GoParser.RULE_statementList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 315;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 310;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 25, this._ctx) ) {
					case 1:
						{
						this.state = 304;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===37) {
							{
							this.state = 303;
							this.match(GoParser.SEMI);
							}
						}

						}
						break;
					case 2:
						{
						this.state = 307;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===89) {
							{
							this.state = 306;
							this.match(GoParser.EOS);
							}
						}

						}
						break;
					case 3:
						{
						this.state = 309;
						if (!(this.closingBracket())) {
							throw this.createFailedPredicateException("this.closingBracket()");
						}
						}
						break;
					}
					this.state = 312;
					this.statement();
					this.state = 313;
					this.eos();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 317;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, GoParser.RULE_statement);
		try {
			this.state = 328;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 17:
			case 26:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 319;
				this.declaration();
				}
				break;
			case 4:
			case 12:
			case 27:
			case 28:
			case 29:
			case 33:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 73:
			case 74:
			case 80:
			case 81:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 320;
				this.simpleStmt();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 321;
				this.goStmt();
				}
				break;
			case 25:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 322;
				this.returnStmt();
				}
				break;
			case 31:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 323;
				this.block();
				}
				break;
			case 19:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 324;
				this.ifStmt();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 325;
				this.selectStmt();
				}
				break;
			case 23:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 326;
				this.forStmt();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 327;
				this.deferStmt();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public simpleStmt(): SimpleStmtContext {
		let localctx: SimpleStmtContext = new SimpleStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, GoParser.RULE_simpleStmt);
		try {
			this.state = 335;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 330;
				this.sendStmt();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 331;
				this.incDecStmt();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 332;
				this.assignment();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 333;
				this.expressionStmt();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 334;
				this.shortVarDecl();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expressionStmt(): ExpressionStmtContext {
		let localctx: ExpressionStmtContext = new ExpressionStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, GoParser.RULE_expressionStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 337;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sendStmt(): SendStmtContext {
		let localctx: SendStmtContext = new SendStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, GoParser.RULE_sendStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 339;
			localctx._channel = this.expression(0);
			this.state = 340;
			this.match(GoParser.RECEIVE);
			this.state = 341;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public incDecStmt(): IncDecStmtContext {
		let localctx: IncDecStmtContext = new IncDecStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, GoParser.RULE_incDecStmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 343;
			this.expression(0);
			this.state = 344;
			_la = this._input.LA(1);
			if(!(_la===40 || _la===41)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment(): AssignmentContext {
		let localctx: AssignmentContext = new AssignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, GoParser.RULE_assignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 346;
			this.expressionList();
			this.state = 347;
			this.assign_op();
			this.state = 348;
			this.expressionList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assign_op(): Assign_opContext {
		let localctx: Assign_opContext = new Assign_opContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, GoParser.RULE_assign_op);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 350;
			this.match(GoParser.ASSIGN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public shortVarDecl(): ShortVarDeclContext {
		let localctx: ShortVarDeclContext = new ShortVarDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, GoParser.RULE_shortVarDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 352;
			this.identifierList();
			this.state = 353;
			this.match(GoParser.DECLARE_ASSIGN);
			this.state = 354;
			this.expressionList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public returnStmt(): ReturnStmtContext {
		let localctx: ReturnStmtContext = new ReturnStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, GoParser.RULE_returnStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 356;
			this.match(GoParser.RETURN);
			this.state = 358;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				{
				this.state = 357;
				this.expressionList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public deferStmt(): DeferStmtContext {
		let localctx: DeferStmtContext = new DeferStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, GoParser.RULE_deferStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 360;
			this.match(GoParser.DEFER);
			this.state = 361;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ifStmt(): IfStmtContext {
		let localctx: IfStmtContext = new IfStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, GoParser.RULE_ifStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 363;
			this.match(GoParser.IF);
			this.state = 372;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				{
				this.state = 364;
				this.expression(0);
				}
				break;
			case 2:
				{
				this.state = 365;
				this.eos();
				this.state = 366;
				this.expression(0);
				}
				break;
			case 3:
				{
				this.state = 368;
				this.simpleStmt();
				this.state = 369;
				this.eos();
				this.state = 370;
				this.expression(0);
				}
				break;
			}
			this.state = 374;
			this.block();
			this.state = 380;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				{
				this.state = 375;
				this.match(GoParser.ELSE);
				this.state = 378;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 19:
					{
					this.state = 376;
					this.ifStmt();
					}
					break;
				case 31:
					{
					this.state = 377;
					this.block();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeList(): TypeListContext {
		let localctx: TypeListContext = new TypeListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, GoParser.RULE_typeList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 384;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
			case 28:
			case 29:
			case 65:
				{
				this.state = 382;
				this.type_();
				}
				break;
			case 27:
				{
				this.state = 383;
				this.match(GoParser.NIL_LIT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 393;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 35, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 386;
					this.match(GoParser.COMMA);
					this.state = 389;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 12:
					case 28:
					case 29:
					case 65:
						{
						this.state = 387;
						this.type_();
						}
						break;
					case 27:
						{
						this.state = 388;
						this.match(GoParser.NIL_LIT);
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 395;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 35, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public selectStmt(): SelectStmtContext {
		let localctx: SelectStmtContext = new SelectStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, GoParser.RULE_selectStmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 396;
			this.match(GoParser.SELECT);
			this.state = 397;
			this.match(GoParser.L_CURLY);
			this.state = 401;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===3 || _la===7) {
				{
				{
				this.state = 398;
				this.commClause();
				}
				}
				this.state = 403;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 404;
			this.match(GoParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public commClause(): CommClauseContext {
		let localctx: CommClauseContext = new CommClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, GoParser.RULE_commClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 406;
			this.commCase();
			this.state = 407;
			this.match(GoParser.COLON);
			this.state = 409;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				{
				this.state = 408;
				this.statementList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public commCase(): CommCaseContext {
		let localctx: CommCaseContext = new CommCaseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, GoParser.RULE_commCase);
		try {
			this.state = 417;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 7:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 411;
				this.match(GoParser.CASE);
				this.state = 414;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 38, this._ctx) ) {
				case 1:
					{
					this.state = 412;
					this.sendStmt();
					}
					break;
				case 2:
					{
					this.state = 413;
					this.recvStmt();
					}
					break;
				}
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 416;
				this.match(GoParser.DEFAULT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public recvStmt(): RecvStmtContext {
		let localctx: RecvStmtContext = new RecvStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, GoParser.RULE_recvStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 425;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				{
				this.state = 419;
				this.expressionList();
				this.state = 420;
				this.match(GoParser.ASSIGN);
				}
				break;
			case 2:
				{
				this.state = 422;
				this.identifierList();
				this.state = 423;
				this.match(GoParser.DECLARE_ASSIGN);
				}
				break;
			}
			this.state = 427;
			localctx._recvExpr = this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forStmt(): ForStmtContext {
		let localctx: ForStmtContext = new ForStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, GoParser.RULE_forStmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 429;
			this.match(GoParser.FOR);
			this.state = 437;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				{
				this.state = 431;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 595591425) !== 0) || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 6344703) !== 0)) {
					{
					this.state = 430;
					this.expression(0);
					}
				}

				}
				break;
			case 2:
				{
				this.state = 433;
				this.forClause();
				}
				break;
			case 3:
				{
				this.state = 435;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 595656961) !== 0) || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 6344703) !== 0)) {
					{
					this.state = 434;
					this.rangeClause();
					}
				}

				}
				break;
			}
			this.state = 439;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forClause(): ForClauseContext {
		let localctx: ForClauseContext = new ForClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, GoParser.RULE_forClause);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 442;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				{
				this.state = 441;
				localctx._initStmt = this.simpleStmt();
				}
				break;
			}
			this.state = 444;
			this.eos();
			this.state = 446;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 45, this._ctx) ) {
			case 1:
				{
				this.state = 445;
				this.expression(0);
				}
				break;
			}
			this.state = 448;
			this.eos();
			this.state = 450;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 595591425) !== 0) || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 6344703) !== 0)) {
				{
				this.state = 449;
				localctx._postStmt = this.simpleStmt();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public rangeClause(): RangeClauseContext {
		let localctx: RangeClauseContext = new RangeClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, GoParser.RULE_rangeClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 458;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 47, this._ctx) ) {
			case 1:
				{
				this.state = 452;
				this.expressionList();
				this.state = 453;
				this.match(GoParser.ASSIGN);
				}
				break;
			case 2:
				{
				this.state = 455;
				this.identifierList();
				this.state = 456;
				this.match(GoParser.DECLARE_ASSIGN);
				}
				break;
			}
			this.state = 460;
			this.match(GoParser.RANGE);
			this.state = 461;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public goStmt(): GoStmtContext {
		let localctx: GoStmtContext = new GoStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, GoParser.RULE_goStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 463;
			this.match(GoParser.GO);
			this.state = 464;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public type_(): Type_Context {
		let localctx: Type_Context = new Type_Context(this, this._ctx, this.state);
		this.enterRule(localctx, 78, GoParser.RULE_type_);
		try {
			this.state = 475;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 28:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 466;
				this.typeName();
				this.state = 468;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 48, this._ctx) ) {
				case 1:
					{
					this.state = 467;
					this.typeArgs();
					}
					break;
				}
				}
				break;
			case 12:
			case 65:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 470;
				this.typeLit();
				}
				break;
			case 29:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 471;
				this.match(GoParser.L_PAREN);
				this.state = 472;
				this.type_();
				this.state = 473;
				this.match(GoParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeArgs(): TypeArgsContext {
		let localctx: TypeArgsContext = new TypeArgsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, GoParser.RULE_typeArgs);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 477;
			this.match(GoParser.L_BRACKET);
			this.state = 478;
			this.typeList();
			this.state = 480;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===36) {
				{
				this.state = 479;
				this.match(GoParser.COMMA);
				}
			}

			this.state = 482;
			this.match(GoParser.R_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeName(): TypeNameContext {
		let localctx: TypeNameContext = new TypeNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, GoParser.RULE_typeName);
		try {
			this.state = 486;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 484;
				this.qualifiedIdent();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 485;
				this.match(GoParser.IDENTIFIER);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeLit(): TypeLitContext {
		let localctx: TypeLitContext = new TypeLitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, GoParser.RULE_typeLit);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 488;
			this.channelType();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayLength(): ArrayLengthContext {
		let localctx: ArrayLengthContext = new ArrayLengthContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, GoParser.RULE_arrayLength);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 490;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public elementType(): ElementTypeContext {
		let localctx: ElementTypeContext = new ElementTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, GoParser.RULE_elementType);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 492;
			this.type_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public channelType(): ChannelTypeContext {
		let localctx: ChannelTypeContext = new ChannelTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, GoParser.RULE_channelType);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 499;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 52, this._ctx) ) {
			case 1:
				{
				this.state = 494;
				this.match(GoParser.CHAN);
				}
				break;
			case 2:
				{
				this.state = 495;
				this.match(GoParser.CHAN);
				this.state = 496;
				this.match(GoParser.RECEIVE);
				}
				break;
			case 3:
				{
				this.state = 497;
				this.match(GoParser.RECEIVE);
				this.state = 498;
				this.match(GoParser.CHAN);
				}
				break;
			}
			this.state = 501;
			this.elementType();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public signature(): SignatureContext {
		let localctx: SignatureContext = new SignatureContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, GoParser.RULE_signature);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 503;
			this.parameters();
			this.state = 505;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 53, this._ctx) ) {
			case 1:
				{
				this.state = 504;
				this.result();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public result(): ResultContext {
		let localctx: ResultContext = new ResultContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, GoParser.RULE_result);
		try {
			this.state = 509;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 507;
				this.parameters();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 508;
				this.type_();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameters(): ParametersContext {
		let localctx: ParametersContext = new ParametersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, GoParser.RULE_parameters);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 511;
			this.match(GoParser.L_PAREN);
			this.state = 523;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 805310464) !== 0) || _la===43 || _la===65) {
				{
				this.state = 512;
				this.parameterDecl();
				this.state = 517;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 55, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 513;
						this.match(GoParser.COMMA);
						this.state = 514;
						this.parameterDecl();
						}
						}
					}
					this.state = 519;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 55, this._ctx);
				}
				this.state = 521;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===36) {
					{
					this.state = 520;
					this.match(GoParser.COMMA);
					}
				}

				}
			}

			this.state = 525;
			this.match(GoParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameterDecl(): ParameterDeclContext {
		let localctx: ParameterDeclContext = new ParameterDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, GoParser.RULE_parameterDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 528;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 58, this._ctx) ) {
			case 1:
				{
				this.state = 527;
				this.identifierList();
				}
				break;
			}
			this.state = 531;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===43) {
				{
				this.state = 530;
				this.match(GoParser.ELLIPSIS);
				}
			}

			this.state = 533;
			this.type_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, _parentState);
		let _prevctx: ExpressionContext = localctx;
		let _startState: number = 100;
		this.enterRecursionRule(localctx, 100, GoParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 539;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 60, this._ctx) ) {
			case 1:
				{
				this.state = 536;
				this.primaryExpr(0);
				}
				break;
			case 2:
				{
				this.state = 537;
				localctx._unary_op = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 127) !== 0))) {
				    localctx._unary_op = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 538;
				this.expression(6);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 558;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 62, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 556;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 61, this._ctx) ) {
					case 1:
						{
						localctx = new ExpressionContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression);
						this.state = 541;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 542;
						localctx._mul_op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & 3103) !== 0))) {
						    localctx._mul_op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 543;
						this.expression(6);
						}
						break;
					case 2:
						{
						localctx = new ExpressionContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression);
						this.state = 544;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 545;
						localctx._add_op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 1793) !== 0))) {
						    localctx._add_op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 546;
						this.expression(5);
						}
						break;
					case 3:
						{
						localctx = new ExpressionContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression);
						this.state = 547;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 548;
						localctx._rel_op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 63) !== 0))) {
						    localctx._rel_op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 549;
						this.expression(4);
						}
						break;
					case 4:
						{
						localctx = new ExpressionContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression);
						this.state = 550;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 551;
						this.match(GoParser.LOGICAL_AND);
						this.state = 552;
						this.expression(3);
						}
						break;
					case 5:
						{
						localctx = new ExpressionContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression);
						this.state = 553;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 554;
						this.match(GoParser.LOGICAL_OR);
						this.state = 555;
						this.expression(2);
						}
						break;
					}
					}
				}
				this.state = 560;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 62, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}

	public primaryExpr(): PrimaryExprContext;
	public primaryExpr(_p: number): PrimaryExprContext;
	// @RuleVersion(0)
	public primaryExpr(_p?: number): PrimaryExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: PrimaryExprContext = new PrimaryExprContext(this, this._ctx, _parentState);
		let _prevctx: PrimaryExprContext = localctx;
		let _startState: number = 102;
		this.enterRecursionRule(localctx, 102, GoParser.RULE_primaryExpr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 564;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 63, this._ctx) ) {
			case 1:
				{
				this.state = 562;
				this.operand();
				}
				break;
			case 2:
				{
				this.state = 563;
				this.methodExpr();
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 577;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 65, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					{
					localctx = new PrimaryExprContext(this, _parentctx, _parentState);
					this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_primaryExpr);
					this.state = 566;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 573;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 64, this._ctx) ) {
					case 1:
						{
						this.state = 567;
						this.match(GoParser.DOT);
						this.state = 568;
						this.match(GoParser.IDENTIFIER);
						}
						break;
					case 2:
						{
						this.state = 569;
						this.index();
						}
						break;
					case 3:
						{
						this.state = 570;
						this.slice_();
						}
						break;
					case 4:
						{
						this.state = 571;
						this.typeAssertion();
						}
						break;
					case 5:
						{
						this.state = 572;
						this.arguments();
						}
						break;
					}
					}
					}
				}
				this.state = 579;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 65, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public operand(): OperandContext {
		let localctx: OperandContext = new OperandContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, GoParser.RULE_operand);
		try {
			this.state = 589;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 67, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 580;
				this.literal();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 581;
				this.operandName();
				this.state = 583;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 66, this._ctx) ) {
				case 1:
					{
					this.state = 582;
					this.typeArgs();
					}
					break;
				}
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 585;
				this.match(GoParser.L_PAREN);
				this.state = 586;
				this.expression(0);
				this.state = 587;
				this.match(GoParser.R_PAREN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let localctx: LiteralContext = new LiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, GoParser.RULE_literal);
		try {
			this.state = 594;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 27:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 73:
			case 74:
			case 80:
			case 81:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 591;
				this.basicLit();
				}
				break;
			case 28:
			case 33:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 592;
				this.compositeLit();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 593;
				this.functionLit();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public basicLit(): BasicLitContext {
		let localctx: BasicLitContext = new BasicLitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, GoParser.RULE_basicLit);
		try {
			this.state = 600;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 27:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 596;
				this.match(GoParser.NIL_LIT);
				}
				break;
			case 66:
			case 67:
			case 68:
			case 69:
			case 73:
			case 74:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 597;
				this.integer();
				}
				break;
			case 80:
			case 81:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 598;
				this.string_();
				}
				break;
			case 70:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 599;
				this.match(GoParser.FLOAT_LIT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public integer(): IntegerContext {
		let localctx: IntegerContext = new IntegerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, GoParser.RULE_integer);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 602;
			_la = this._input.LA(1);
			if(!(((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 399) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public operandName(): OperandNameContext {
		let localctx: OperandNameContext = new OperandNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, GoParser.RULE_operandName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 604;
			this.match(GoParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public qualifiedIdent(): QualifiedIdentContext {
		let localctx: QualifiedIdentContext = new QualifiedIdentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 114, GoParser.RULE_qualifiedIdent);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 606;
			this.match(GoParser.IDENTIFIER);
			this.state = 607;
			this.match(GoParser.DOT);
			this.state = 608;
			this.match(GoParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public compositeLit(): CompositeLitContext {
		let localctx: CompositeLitContext = new CompositeLitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 116, GoParser.RULE_compositeLit);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 610;
			this.literalType();
			this.state = 611;
			this.literalValue();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public literalType(): LiteralTypeContext {
		let localctx: LiteralTypeContext = new LiteralTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, GoParser.RULE_literalType);
		let _la: number;
		try {
			this.state = 621;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 33:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 613;
				this.match(GoParser.L_BRACKET);
				this.state = 614;
				this.match(GoParser.ELLIPSIS);
				this.state = 615;
				this.match(GoParser.R_BRACKET);
				this.state = 616;
				this.elementType();
				}
				break;
			case 28:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 617;
				this.typeName();
				this.state = 619;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===33) {
					{
					this.state = 618;
					this.typeArgs();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public literalValue(): LiteralValueContext {
		let localctx: LiteralValueContext = new LiteralValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 120, GoParser.RULE_literalValue);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 623;
			this.match(GoParser.L_CURLY);
			this.state = 628;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 729809153) !== 0) || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 6344703) !== 0)) {
				{
				this.state = 624;
				this.elementList();
				this.state = 626;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===36) {
					{
					this.state = 625;
					this.match(GoParser.COMMA);
					}
				}

				}
			}

			this.state = 630;
			this.match(GoParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public elementList(): ElementListContext {
		let localctx: ElementListContext = new ElementListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 122, GoParser.RULE_elementList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 632;
			this.keyedElement();
			this.state = 637;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 74, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 633;
					this.match(GoParser.COMMA);
					this.state = 634;
					this.keyedElement();
					}
					}
				}
				this.state = 639;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 74, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public keyedElement(): KeyedElementContext {
		let localctx: KeyedElementContext = new KeyedElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 124, GoParser.RULE_keyedElement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 643;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 75, this._ctx) ) {
			case 1:
				{
				this.state = 640;
				this.key();
				this.state = 641;
				this.match(GoParser.COLON);
				}
				break;
			}
			this.state = 645;
			this.element();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public key(): KeyContext {
		let localctx: KeyContext = new KeyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 126, GoParser.RULE_key);
		try {
			this.state = 649;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 12:
			case 27:
			case 28:
			case 29:
			case 33:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 73:
			case 74:
			case 80:
			case 81:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 647;
				this.expression(0);
				}
				break;
			case 31:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 648;
				this.literalValue();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public element(): ElementContext {
		let localctx: ElementContext = new ElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 128, GoParser.RULE_element);
		try {
			this.state = 653;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 12:
			case 27:
			case 28:
			case 29:
			case 33:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 73:
			case 74:
			case 80:
			case 81:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 651;
				this.expression(0);
				}
				break;
			case 31:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 652;
				this.literalValue();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public string_(): String_Context {
		let localctx: String_Context = new String_Context(this, this._ctx, this.state);
		this.enterRule(localctx, 130, GoParser.RULE_string_);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 655;
			_la = this._input.LA(1);
			if(!(_la===80 || _la===81)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public embeddedField(): EmbeddedFieldContext {
		let localctx: EmbeddedFieldContext = new EmbeddedFieldContext(this, this._ctx, this.state);
		this.enterRule(localctx, 132, GoParser.RULE_embeddedField);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 658;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===63) {
				{
				this.state = 657;
				this.match(GoParser.STAR);
				}
			}

			this.state = 660;
			this.typeName();
			this.state = 662;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===33) {
				{
				this.state = 661;
				this.typeArgs();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionLit(): FunctionLitContext {
		let localctx: FunctionLitContext = new FunctionLitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 134, GoParser.RULE_functionLit);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 664;
			this.match(GoParser.FUNC);
			this.state = 665;
			this.signature();
			this.state = 666;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public index(): IndexContext {
		let localctx: IndexContext = new IndexContext(this, this._ctx, this.state);
		this.enterRule(localctx, 136, GoParser.RULE_index);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 668;
			this.match(GoParser.L_BRACKET);
			this.state = 669;
			this.expression(0);
			this.state = 670;
			this.match(GoParser.R_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public slice_(): Slice_Context {
		let localctx: Slice_Context = new Slice_Context(this, this._ctx, this.state);
		this.enterRule(localctx, 138, GoParser.RULE_slice_);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 672;
			this.match(GoParser.L_BRACKET);
			this.state = 688;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 83, this._ctx) ) {
			case 1:
				{
				this.state = 674;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 595591425) !== 0) || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 6344703) !== 0)) {
					{
					this.state = 673;
					this.expression(0);
					}
				}

				this.state = 676;
				this.match(GoParser.COLON);
				this.state = 678;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 595591425) !== 0) || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 6344703) !== 0)) {
					{
					this.state = 677;
					this.expression(0);
					}
				}

				}
				break;
			case 2:
				{
				this.state = 681;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 595591425) !== 0) || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 6344703) !== 0)) {
					{
					this.state = 680;
					this.expression(0);
					}
				}

				this.state = 683;
				this.match(GoParser.COLON);
				this.state = 684;
				this.expression(0);
				this.state = 685;
				this.match(GoParser.COLON);
				this.state = 686;
				this.expression(0);
				}
				break;
			}
			this.state = 690;
			this.match(GoParser.R_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeAssertion(): TypeAssertionContext {
		let localctx: TypeAssertionContext = new TypeAssertionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 140, GoParser.RULE_typeAssertion);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 692;
			this.match(GoParser.DOT);
			this.state = 693;
			this.match(GoParser.L_PAREN);
			this.state = 694;
			this.type_();
			this.state = 695;
			this.match(GoParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arguments(): ArgumentsContext {
		let localctx: ArgumentsContext = new ArgumentsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 142, GoParser.RULE_arguments);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 697;
			this.match(GoParser.L_PAREN);
			this.state = 712;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 595591425) !== 0) || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 6344703) !== 0)) {
				{
				this.state = 704;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 85, this._ctx) ) {
				case 1:
					{
					this.state = 698;
					this.expressionList();
					}
					break;
				case 2:
					{
					this.state = 699;
					this.type_();
					this.state = 702;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 84, this._ctx) ) {
					case 1:
						{
						this.state = 700;
						this.match(GoParser.COMMA);
						this.state = 701;
						this.expressionList();
						}
						break;
					}
					}
					break;
				}
				this.state = 707;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===43) {
					{
					this.state = 706;
					this.match(GoParser.ELLIPSIS);
					}
				}

				this.state = 710;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===36) {
					{
					this.state = 709;
					this.match(GoParser.COMMA);
					}
				}

				}
			}

			this.state = 714;
			this.match(GoParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public methodExpr(): MethodExprContext {
		let localctx: MethodExprContext = new MethodExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 144, GoParser.RULE_methodExpr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 716;
			this.type_();
			this.state = 717;
			this.match(GoParser.DOT);
			this.state = 718;
			this.match(GoParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public eos(): EosContext {
		let localctx: EosContext = new EosContext(this, this._ctx, this.state);
		this.enterRule(localctx, 146, GoParser.RULE_eos);
		try {
			this.state = 724;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 89, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 720;
				this.match(GoParser.SEMI);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 721;
				this.match(GoParser.EOF);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 722;
				this.match(GoParser.EOS);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 723;
				if (!(this.closingBracket())) {
					throw this.createFailedPredicateException("this.closingBracket()");
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 18:
			return this.statementList_sempred(localctx as StatementListContext, predIndex);
		case 50:
			return this.expression_sempred(localctx as ExpressionContext, predIndex);
		case 51:
			return this.primaryExpr_sempred(localctx as PrimaryExprContext, predIndex);
		case 73:
			return this.eos_sempred(localctx as EosContext, predIndex);
		}
		return true;
	}
	private statementList_sempred(localctx: StatementListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.closingBracket();
		}
		return true;
	}
	private expression_sempred(localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return this.precpred(this._ctx, 5);
		case 2:
			return this.precpred(this._ctx, 4);
		case 3:
			return this.precpred(this._ctx, 3);
		case 4:
			return this.precpred(this._ctx, 2);
		case 5:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private primaryExpr_sempred(localctx: PrimaryExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 6:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private eos_sempred(localctx: EosContext, predIndex: number): boolean {
		switch (predIndex) {
		case 7:
			return this.closingBracket();
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,90,727,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,
	39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
	7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,7,
	53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,60,
	2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,2,67,7,67,2,
	68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,7,72,2,73,7,73,1,0,1,0,1,0,1,
	0,1,0,5,0,154,8,0,10,0,12,0,157,9,0,1,0,1,0,3,0,161,8,0,1,0,1,0,5,0,165,
	8,0,10,0,12,0,168,9,0,1,0,1,0,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,5,2,181,
	8,2,10,2,12,2,184,9,2,1,2,3,2,187,8,2,1,3,3,3,190,8,3,1,3,1,3,1,4,1,4,1,
	5,1,5,3,5,198,8,5,1,6,1,6,1,6,1,6,1,6,1,6,5,6,206,8,6,10,6,12,6,209,9,6,
	1,6,3,6,212,8,6,1,7,1,7,3,7,216,8,7,1,7,1,7,3,7,220,8,7,1,8,1,8,1,8,5,8,
	225,8,8,10,8,12,8,228,9,8,1,9,1,9,1,9,5,9,233,8,9,10,9,12,9,236,9,9,1,10,
	1,10,1,10,1,10,5,10,242,8,10,10,10,12,10,245,9,10,1,10,1,10,1,11,1,11,1,
	11,1,12,1,12,1,12,5,12,255,8,12,10,12,12,12,258,9,12,1,13,3,13,261,8,13,
	1,13,1,13,1,14,1,14,1,14,3,14,268,8,14,1,14,1,14,3,14,272,8,14,1,15,1,15,
	1,15,1,15,1,15,1,15,5,15,280,8,15,10,15,12,15,283,9,15,1,15,3,15,286,8,
	15,1,16,1,16,1,16,1,16,3,16,292,8,16,1,16,1,16,3,16,296,8,16,1,17,1,17,
	3,17,300,8,17,1,17,1,17,1,18,3,18,305,8,18,1,18,3,18,308,8,18,1,18,3,18,
	311,8,18,1,18,1,18,1,18,4,18,316,8,18,11,18,12,18,317,1,19,1,19,1,19,1,
	19,1,19,1,19,1,19,1,19,1,19,3,19,329,8,19,1,20,1,20,1,20,1,20,1,20,3,20,
	336,8,20,1,21,1,21,1,22,1,22,1,22,1,22,1,23,1,23,1,23,1,24,1,24,1,24,1,
	24,1,25,1,25,1,26,1,26,1,26,1,26,1,27,1,27,3,27,359,8,27,1,28,1,28,1,28,
	1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,373,8,29,1,29,1,29,1,
	29,1,29,3,29,379,8,29,3,29,381,8,29,1,30,1,30,3,30,385,8,30,1,30,1,30,1,
	30,3,30,390,8,30,5,30,392,8,30,10,30,12,30,395,9,30,1,31,1,31,1,31,5,31,
	400,8,31,10,31,12,31,403,9,31,1,31,1,31,1,32,1,32,1,32,3,32,410,8,32,1,
	33,1,33,1,33,3,33,415,8,33,1,33,3,33,418,8,33,1,34,1,34,1,34,1,34,1,34,
	1,34,3,34,426,8,34,1,34,1,34,1,35,1,35,3,35,432,8,35,1,35,1,35,3,35,436,
	8,35,3,35,438,8,35,1,35,1,35,1,36,3,36,443,8,36,1,36,1,36,3,36,447,8,36,
	1,36,1,36,3,36,451,8,36,1,37,1,37,1,37,1,37,1,37,1,37,3,37,459,8,37,1,37,
	1,37,1,37,1,38,1,38,1,38,1,39,1,39,3,39,469,8,39,1,39,1,39,1,39,1,39,1,
	39,3,39,476,8,39,1,40,1,40,1,40,3,40,481,8,40,1,40,1,40,1,41,1,41,3,41,
	487,8,41,1,42,1,42,1,43,1,43,1,44,1,44,1,45,1,45,1,45,1,45,1,45,3,45,500,
	8,45,1,45,1,45,1,46,1,46,3,46,506,8,46,1,47,1,47,3,47,510,8,47,1,48,1,48,
	1,48,1,48,5,48,516,8,48,10,48,12,48,519,9,48,1,48,3,48,522,8,48,3,48,524,
	8,48,1,48,1,48,1,49,3,49,529,8,49,1,49,3,49,532,8,49,1,49,1,49,1,50,1,50,
	1,50,1,50,3,50,540,8,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,
	50,1,50,1,50,1,50,1,50,1,50,5,50,557,8,50,10,50,12,50,560,9,50,1,51,1,51,
	1,51,3,51,565,8,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,3,51,574,8,51,5,51,
	576,8,51,10,51,12,51,579,9,51,1,52,1,52,1,52,3,52,584,8,52,1,52,1,52,1,
	52,1,52,3,52,590,8,52,1,53,1,53,1,53,3,53,595,8,53,1,54,1,54,1,54,1,54,
	3,54,601,8,54,1,55,1,55,1,56,1,56,1,57,1,57,1,57,1,57,1,58,1,58,1,58,1,
	59,1,59,1,59,1,59,1,59,1,59,3,59,620,8,59,3,59,622,8,59,1,60,1,60,1,60,
	3,60,627,8,60,3,60,629,8,60,1,60,1,60,1,61,1,61,1,61,5,61,636,8,61,10,61,
	12,61,639,9,61,1,62,1,62,1,62,3,62,644,8,62,1,62,1,62,1,63,1,63,3,63,650,
	8,63,1,64,1,64,3,64,654,8,64,1,65,1,65,1,66,3,66,659,8,66,1,66,1,66,3,66,
	663,8,66,1,67,1,67,1,67,1,67,1,68,1,68,1,68,1,68,1,69,1,69,3,69,675,8,69,
	1,69,1,69,3,69,679,8,69,1,69,3,69,682,8,69,1,69,1,69,1,69,1,69,1,69,3,69,
	689,8,69,1,69,1,69,1,70,1,70,1,70,1,70,1,70,1,71,1,71,1,71,1,71,1,71,3,
	71,703,8,71,3,71,705,8,71,1,71,3,71,708,8,71,1,71,3,71,711,8,71,3,71,713,
	8,71,1,71,1,71,1,72,1,72,1,72,1,72,1,73,1,73,1,73,1,73,3,73,725,8,73,1,
	73,0,2,100,102,74,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,
	40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,
	88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,
	128,130,132,134,136,138,140,142,144,146,0,8,2,0,28,28,39,39,1,0,40,41,1,
	0,59,65,2,0,53,57,63,64,2,0,52,52,60,62,1,0,46,51,2,0,66,69,73,74,1,0,80,
	81,771,0,148,1,0,0,0,2,171,1,0,0,0,4,174,1,0,0,0,6,189,1,0,0,0,8,193,1,
	0,0,0,10,197,1,0,0,0,12,199,1,0,0,0,14,213,1,0,0,0,16,221,1,0,0,0,18,229,
	1,0,0,0,20,237,1,0,0,0,22,248,1,0,0,0,24,251,1,0,0,0,26,260,1,0,0,0,28,
	264,1,0,0,0,30,273,1,0,0,0,32,287,1,0,0,0,34,297,1,0,0,0,36,315,1,0,0,0,
	38,328,1,0,0,0,40,335,1,0,0,0,42,337,1,0,0,0,44,339,1,0,0,0,46,343,1,0,
	0,0,48,346,1,0,0,0,50,350,1,0,0,0,52,352,1,0,0,0,54,356,1,0,0,0,56,360,
	1,0,0,0,58,363,1,0,0,0,60,384,1,0,0,0,62,396,1,0,0,0,64,406,1,0,0,0,66,
	417,1,0,0,0,68,425,1,0,0,0,70,429,1,0,0,0,72,442,1,0,0,0,74,458,1,0,0,0,
	76,463,1,0,0,0,78,475,1,0,0,0,80,477,1,0,0,0,82,486,1,0,0,0,84,488,1,0,
	0,0,86,490,1,0,0,0,88,492,1,0,0,0,90,499,1,0,0,0,92,503,1,0,0,0,94,509,
	1,0,0,0,96,511,1,0,0,0,98,528,1,0,0,0,100,539,1,0,0,0,102,564,1,0,0,0,104,
	589,1,0,0,0,106,594,1,0,0,0,108,600,1,0,0,0,110,602,1,0,0,0,112,604,1,0,
	0,0,114,606,1,0,0,0,116,610,1,0,0,0,118,621,1,0,0,0,120,623,1,0,0,0,122,
	632,1,0,0,0,124,643,1,0,0,0,126,649,1,0,0,0,128,653,1,0,0,0,130,655,1,0,
	0,0,132,658,1,0,0,0,134,664,1,0,0,0,136,668,1,0,0,0,138,672,1,0,0,0,140,
	692,1,0,0,0,142,697,1,0,0,0,144,716,1,0,0,0,146,724,1,0,0,0,148,149,3,2,
	1,0,149,155,3,146,73,0,150,151,3,4,2,0,151,152,3,146,73,0,152,154,1,0,0,
	0,153,150,1,0,0,0,154,157,1,0,0,0,155,153,1,0,0,0,155,156,1,0,0,0,156,166,
	1,0,0,0,157,155,1,0,0,0,158,161,3,28,14,0,159,161,3,10,5,0,160,158,1,0,
	0,0,160,159,1,0,0,0,161,162,1,0,0,0,162,163,3,146,73,0,163,165,1,0,0,0,
	164,160,1,0,0,0,165,168,1,0,0,0,166,164,1,0,0,0,166,167,1,0,0,0,167,169,
	1,0,0,0,168,166,1,0,0,0,169,170,5,0,0,1,170,1,1,0,0,0,171,172,5,15,0,0,
	172,173,5,1,0,0,173,3,1,0,0,0,174,186,5,24,0,0,175,187,3,6,3,0,176,182,
	5,29,0,0,177,178,3,6,3,0,178,179,3,146,73,0,179,181,1,0,0,0,180,177,1,0,
	0,0,181,184,1,0,0,0,182,180,1,0,0,0,182,183,1,0,0,0,183,185,1,0,0,0,184,
	182,1,0,0,0,185,187,5,30,0,0,186,175,1,0,0,0,186,176,1,0,0,0,187,5,1,0,
	0,0,188,190,7,0,0,0,189,188,1,0,0,0,189,190,1,0,0,0,190,191,1,0,0,0,191,
	192,3,8,4,0,192,7,1,0,0,0,193,194,3,130,65,0,194,9,1,0,0,0,195,198,3,12,
	6,0,196,198,3,30,15,0,197,195,1,0,0,0,197,196,1,0,0,0,198,11,1,0,0,0,199,
	211,5,17,0,0,200,212,3,14,7,0,201,207,5,29,0,0,202,203,3,14,7,0,203,204,
	3,146,73,0,204,206,1,0,0,0,205,202,1,0,0,0,206,209,1,0,0,0,207,205,1,0,
	0,0,207,208,1,0,0,0,208,210,1,0,0,0,209,207,1,0,0,0,210,212,5,30,0,0,211,
	200,1,0,0,0,211,201,1,0,0,0,212,13,1,0,0,0,213,219,3,16,8,0,214,216,3,78,
	39,0,215,214,1,0,0,0,215,216,1,0,0,0,216,217,1,0,0,0,217,218,5,35,0,0,218,
	220,3,18,9,0,219,215,1,0,0,0,219,220,1,0,0,0,220,15,1,0,0,0,221,226,5,28,
	0,0,222,223,5,36,0,0,223,225,5,28,0,0,224,222,1,0,0,0,225,228,1,0,0,0,226,
	224,1,0,0,0,226,227,1,0,0,0,227,17,1,0,0,0,228,226,1,0,0,0,229,234,3,100,
	50,0,230,231,5,36,0,0,231,233,3,100,50,0,232,230,1,0,0,0,233,236,1,0,0,
	0,234,232,1,0,0,0,234,235,1,0,0,0,235,19,1,0,0,0,236,234,1,0,0,0,237,238,
	5,33,0,0,238,243,3,22,11,0,239,240,5,36,0,0,240,242,3,22,11,0,241,239,1,
	0,0,0,242,245,1,0,0,0,243,241,1,0,0,0,243,244,1,0,0,0,244,246,1,0,0,0,245,
	243,1,0,0,0,246,247,5,34,0,0,247,21,1,0,0,0,248,249,3,16,8,0,249,250,3,
	24,12,0,250,23,1,0,0,0,251,256,3,26,13,0,252,253,5,52,0,0,253,255,3,26,
	13,0,254,252,1,0,0,0,255,258,1,0,0,0,256,254,1,0,0,0,256,257,1,0,0,0,257,
	25,1,0,0,0,258,256,1,0,0,0,259,261,5,58,0,0,260,259,1,0,0,0,260,261,1,0,
	0,0,261,262,1,0,0,0,262,263,3,78,39,0,263,27,1,0,0,0,264,265,5,4,0,0,265,
	267,5,28,0,0,266,268,3,20,10,0,267,266,1,0,0,0,267,268,1,0,0,0,268,269,
	1,0,0,0,269,271,3,92,46,0,270,272,3,34,17,0,271,270,1,0,0,0,271,272,1,0,
	0,0,272,29,1,0,0,0,273,285,5,26,0,0,274,286,3,32,16,0,275,281,5,29,0,0,
	276,277,3,32,16,0,277,278,3,146,73,0,278,280,1,0,0,0,279,276,1,0,0,0,280,
	283,1,0,0,0,281,279,1,0,0,0,281,282,1,0,0,0,282,284,1,0,0,0,283,281,1,0,
	0,0,284,286,5,30,0,0,285,274,1,0,0,0,285,275,1,0,0,0,286,31,1,0,0,0,287,
	295,3,16,8,0,288,291,3,78,39,0,289,290,5,35,0,0,290,292,3,18,9,0,291,289,
	1,0,0,0,291,292,1,0,0,0,292,296,1,0,0,0,293,294,5,35,0,0,294,296,3,18,9,
	0,295,288,1,0,0,0,295,293,1,0,0,0,296,33,1,0,0,0,297,299,5,31,0,0,298,300,
	3,36,18,0,299,298,1,0,0,0,299,300,1,0,0,0,300,301,1,0,0,0,301,302,5,32,
	0,0,302,35,1,0,0,0,303,305,5,37,0,0,304,303,1,0,0,0,304,305,1,0,0,0,305,
	311,1,0,0,0,306,308,5,89,0,0,307,306,1,0,0,0,307,308,1,0,0,0,308,311,1,
	0,0,0,309,311,4,18,0,0,310,304,1,0,0,0,310,307,1,0,0,0,310,309,1,0,0,0,
	311,312,1,0,0,0,312,313,3,38,19,0,313,314,3,146,73,0,314,316,1,0,0,0,315,
	310,1,0,0,0,316,317,1,0,0,0,317,315,1,0,0,0,317,318,1,0,0,0,318,37,1,0,
	0,0,319,329,3,10,5,0,320,329,3,40,20,0,321,329,3,76,38,0,322,329,3,54,27,
	0,323,329,3,34,17,0,324,329,3,58,29,0,325,329,3,62,31,0,326,329,3,70,35,
	0,327,329,3,56,28,0,328,319,1,0,0,0,328,320,1,0,0,0,328,321,1,0,0,0,328,
	322,1,0,0,0,328,323,1,0,0,0,328,324,1,0,0,0,328,325,1,0,0,0,328,326,1,0,
	0,0,328,327,1,0,0,0,329,39,1,0,0,0,330,336,3,44,22,0,331,336,3,46,23,0,
	332,336,3,48,24,0,333,336,3,42,21,0,334,336,3,52,26,0,335,330,1,0,0,0,335,
	331,1,0,0,0,335,332,1,0,0,0,335,333,1,0,0,0,335,334,1,0,0,0,336,41,1,0,
	0,0,337,338,3,100,50,0,338,43,1,0,0,0,339,340,3,100,50,0,340,341,5,65,0,
	0,341,342,3,100,50,0,342,45,1,0,0,0,343,344,3,100,50,0,344,345,7,1,0,0,
	345,47,1,0,0,0,346,347,3,18,9,0,347,348,3,50,25,0,348,349,3,18,9,0,349,
	49,1,0,0,0,350,351,5,35,0,0,351,51,1,0,0,0,352,353,3,16,8,0,353,354,5,42,
	0,0,354,355,3,18,9,0,355,53,1,0,0,0,356,358,5,25,0,0,357,359,3,18,9,0,358,
	357,1,0,0,0,358,359,1,0,0,0,359,55,1,0,0,0,360,361,5,8,0,0,361,362,3,100,
	50,0,362,57,1,0,0,0,363,372,5,19,0,0,364,373,3,100,50,0,365,366,3,146,73,
	0,366,367,3,100,50,0,367,373,1,0,0,0,368,369,3,40,20,0,369,370,3,146,73,
	0,370,371,3,100,50,0,371,373,1,0,0,0,372,364,1,0,0,0,372,365,1,0,0,0,372,
	368,1,0,0,0,373,374,1,0,0,0,374,380,3,34,17,0,375,378,5,13,0,0,376,379,
	3,58,29,0,377,379,3,34,17,0,378,376,1,0,0,0,378,377,1,0,0,0,379,381,1,0,
	0,0,380,375,1,0,0,0,380,381,1,0,0,0,381,59,1,0,0,0,382,385,3,78,39,0,383,
	385,5,27,0,0,384,382,1,0,0,0,384,383,1,0,0,0,385,393,1,0,0,0,386,389,5,
	36,0,0,387,390,3,78,39,0,388,390,5,27,0,0,389,387,1,0,0,0,389,388,1,0,0,
	0,390,392,1,0,0,0,391,386,1,0,0,0,392,395,1,0,0,0,393,391,1,0,0,0,393,394,
	1,0,0,0,394,61,1,0,0,0,395,393,1,0,0,0,396,397,5,6,0,0,397,401,5,31,0,0,
	398,400,3,64,32,0,399,398,1,0,0,0,400,403,1,0,0,0,401,399,1,0,0,0,401,402,
	1,0,0,0,402,404,1,0,0,0,403,401,1,0,0,0,404,405,5,32,0,0,405,63,1,0,0,0,
	406,407,3,66,33,0,407,409,5,38,0,0,408,410,3,36,18,0,409,408,1,0,0,0,409,
	410,1,0,0,0,410,65,1,0,0,0,411,414,5,7,0,0,412,415,3,44,22,0,413,415,3,
	68,34,0,414,412,1,0,0,0,414,413,1,0,0,0,415,418,1,0,0,0,416,418,5,3,0,0,
	417,411,1,0,0,0,417,416,1,0,0,0,418,67,1,0,0,0,419,420,3,18,9,0,420,421,
	5,35,0,0,421,426,1,0,0,0,422,423,3,16,8,0,423,424,5,42,0,0,424,426,1,0,
	0,0,425,419,1,0,0,0,425,422,1,0,0,0,425,426,1,0,0,0,426,427,1,0,0,0,427,
	428,3,100,50,0,428,69,1,0,0,0,429,437,5,23,0,0,430,432,3,100,50,0,431,430,
	1,0,0,0,431,432,1,0,0,0,432,438,1,0,0,0,433,438,3,72,36,0,434,436,3,74,
	37,0,435,434,1,0,0,0,435,436,1,0,0,0,436,438,1,0,0,0,437,431,1,0,0,0,437,
	433,1,0,0,0,437,435,1,0,0,0,438,439,1,0,0,0,439,440,3,34,17,0,440,71,1,
	0,0,0,441,443,3,40,20,0,442,441,1,0,0,0,442,443,1,0,0,0,443,444,1,0,0,0,
	444,446,3,146,73,0,445,447,3,100,50,0,446,445,1,0,0,0,446,447,1,0,0,0,447,
	448,1,0,0,0,448,450,3,146,73,0,449,451,3,40,20,0,450,449,1,0,0,0,450,451,
	1,0,0,0,451,73,1,0,0,0,452,453,3,18,9,0,453,454,5,35,0,0,454,459,1,0,0,
	0,455,456,3,16,8,0,456,457,5,42,0,0,457,459,1,0,0,0,458,452,1,0,0,0,458,
	455,1,0,0,0,458,459,1,0,0,0,459,460,1,0,0,0,460,461,5,20,0,0,461,462,3,
	100,50,0,462,75,1,0,0,0,463,464,5,9,0,0,464,465,3,100,50,0,465,77,1,0,0,
	0,466,468,3,82,41,0,467,469,3,80,40,0,468,467,1,0,0,0,468,469,1,0,0,0,469,
	476,1,0,0,0,470,476,3,84,42,0,471,472,5,29,0,0,472,473,3,78,39,0,473,474,
	5,30,0,0,474,476,1,0,0,0,475,466,1,0,0,0,475,470,1,0,0,0,475,471,1,0,0,
	0,476,79,1,0,0,0,477,478,5,33,0,0,478,480,3,60,30,0,479,481,5,36,0,0,480,
	479,1,0,0,0,480,481,1,0,0,0,481,482,1,0,0,0,482,483,5,34,0,0,483,81,1,0,
	0,0,484,487,3,114,57,0,485,487,5,28,0,0,486,484,1,0,0,0,486,485,1,0,0,0,
	487,83,1,0,0,0,488,489,3,90,45,0,489,85,1,0,0,0,490,491,3,100,50,0,491,
	87,1,0,0,0,492,493,3,78,39,0,493,89,1,0,0,0,494,500,5,12,0,0,495,496,5,
	12,0,0,496,500,5,65,0,0,497,498,5,65,0,0,498,500,5,12,0,0,499,494,1,0,0,
	0,499,495,1,0,0,0,499,497,1,0,0,0,500,501,1,0,0,0,501,502,3,88,44,0,502,
	91,1,0,0,0,503,505,3,96,48,0,504,506,3,94,47,0,505,504,1,0,0,0,505,506,
	1,0,0,0,506,93,1,0,0,0,507,510,3,96,48,0,508,510,3,78,39,0,509,507,1,0,
	0,0,509,508,1,0,0,0,510,95,1,0,0,0,511,523,5,29,0,0,512,517,3,98,49,0,513,
	514,5,36,0,0,514,516,3,98,49,0,515,513,1,0,0,0,516,519,1,0,0,0,517,515,
	1,0,0,0,517,518,1,0,0,0,518,521,1,0,0,0,519,517,1,0,0,0,520,522,5,36,0,
	0,521,520,1,0,0,0,521,522,1,0,0,0,522,524,1,0,0,0,523,512,1,0,0,0,523,524,
	1,0,0,0,524,525,1,0,0,0,525,526,5,30,0,0,526,97,1,0,0,0,527,529,3,16,8,
	0,528,527,1,0,0,0,528,529,1,0,0,0,529,531,1,0,0,0,530,532,5,43,0,0,531,
	530,1,0,0,0,531,532,1,0,0,0,532,533,1,0,0,0,533,534,3,78,39,0,534,99,1,
	0,0,0,535,536,6,50,-1,0,536,540,3,102,51,0,537,538,7,2,0,0,538,540,3,100,
	50,6,539,535,1,0,0,0,539,537,1,0,0,0,540,558,1,0,0,0,541,542,10,5,0,0,542,
	543,7,3,0,0,543,557,3,100,50,6,544,545,10,4,0,0,545,546,7,4,0,0,546,557,
	3,100,50,5,547,548,10,3,0,0,548,549,7,5,0,0,549,557,3,100,50,4,550,551,
	10,2,0,0,551,552,5,45,0,0,552,557,3,100,50,3,553,554,10,1,0,0,554,555,5,
	44,0,0,555,557,3,100,50,2,556,541,1,0,0,0,556,544,1,0,0,0,556,547,1,0,0,
	0,556,550,1,0,0,0,556,553,1,0,0,0,557,560,1,0,0,0,558,556,1,0,0,0,558,559,
	1,0,0,0,559,101,1,0,0,0,560,558,1,0,0,0,561,562,6,51,-1,0,562,565,3,104,
	52,0,563,565,3,144,72,0,564,561,1,0,0,0,564,563,1,0,0,0,565,577,1,0,0,0,
	566,573,10,1,0,0,567,568,5,39,0,0,568,574,5,28,0,0,569,574,3,136,68,0,570,
	574,3,138,69,0,571,574,3,140,70,0,572,574,3,142,71,0,573,567,1,0,0,0,573,
	569,1,0,0,0,573,570,1,0,0,0,573,571,1,0,0,0,573,572,1,0,0,0,574,576,1,0,
	0,0,575,566,1,0,0,0,576,579,1,0,0,0,577,575,1,0,0,0,577,578,1,0,0,0,578,
	103,1,0,0,0,579,577,1,0,0,0,580,590,3,106,53,0,581,583,3,112,56,0,582,584,
	3,80,40,0,583,582,1,0,0,0,583,584,1,0,0,0,584,590,1,0,0,0,585,586,5,29,
	0,0,586,587,3,100,50,0,587,588,5,30,0,0,588,590,1,0,0,0,589,580,1,0,0,0,
	589,581,1,0,0,0,589,585,1,0,0,0,590,105,1,0,0,0,591,595,3,108,54,0,592,
	595,3,116,58,0,593,595,3,134,67,0,594,591,1,0,0,0,594,592,1,0,0,0,594,593,
	1,0,0,0,595,107,1,0,0,0,596,601,5,27,0,0,597,601,3,110,55,0,598,601,3,130,
	65,0,599,601,5,70,0,0,600,596,1,0,0,0,600,597,1,0,0,0,600,598,1,0,0,0,600,
	599,1,0,0,0,601,109,1,0,0,0,602,603,7,6,0,0,603,111,1,0,0,0,604,605,5,28,
	0,0,605,113,1,0,0,0,606,607,5,28,0,0,607,608,5,39,0,0,608,609,5,28,0,0,
	609,115,1,0,0,0,610,611,3,118,59,0,611,612,3,120,60,0,612,117,1,0,0,0,613,
	614,5,33,0,0,614,615,5,43,0,0,615,616,5,34,0,0,616,622,3,88,44,0,617,619,
	3,82,41,0,618,620,3,80,40,0,619,618,1,0,0,0,619,620,1,0,0,0,620,622,1,0,
	0,0,621,613,1,0,0,0,621,617,1,0,0,0,622,119,1,0,0,0,623,628,5,31,0,0,624,
	626,3,122,61,0,625,627,5,36,0,0,626,625,1,0,0,0,626,627,1,0,0,0,627,629,
	1,0,0,0,628,624,1,0,0,0,628,629,1,0,0,0,629,630,1,0,0,0,630,631,5,32,0,
	0,631,121,1,0,0,0,632,637,3,124,62,0,633,634,5,36,0,0,634,636,3,124,62,
	0,635,633,1,0,0,0,636,639,1,0,0,0,637,635,1,0,0,0,637,638,1,0,0,0,638,123,
	1,0,0,0,639,637,1,0,0,0,640,641,3,126,63,0,641,642,5,38,0,0,642,644,1,0,
	0,0,643,640,1,0,0,0,643,644,1,0,0,0,644,645,1,0,0,0,645,646,3,128,64,0,
	646,125,1,0,0,0,647,650,3,100,50,0,648,650,3,120,60,0,649,647,1,0,0,0,649,
	648,1,0,0,0,650,127,1,0,0,0,651,654,3,100,50,0,652,654,3,120,60,0,653,651,
	1,0,0,0,653,652,1,0,0,0,654,129,1,0,0,0,655,656,7,7,0,0,656,131,1,0,0,0,
	657,659,5,63,0,0,658,657,1,0,0,0,658,659,1,0,0,0,659,660,1,0,0,0,660,662,
	3,82,41,0,661,663,3,80,40,0,662,661,1,0,0,0,662,663,1,0,0,0,663,133,1,0,
	0,0,664,665,5,4,0,0,665,666,3,92,46,0,666,667,3,34,17,0,667,135,1,0,0,0,
	668,669,5,33,0,0,669,670,3,100,50,0,670,671,5,34,0,0,671,137,1,0,0,0,672,
	688,5,33,0,0,673,675,3,100,50,0,674,673,1,0,0,0,674,675,1,0,0,0,675,676,
	1,0,0,0,676,678,5,38,0,0,677,679,3,100,50,0,678,677,1,0,0,0,678,679,1,0,
	0,0,679,689,1,0,0,0,680,682,3,100,50,0,681,680,1,0,0,0,681,682,1,0,0,0,
	682,683,1,0,0,0,683,684,5,38,0,0,684,685,3,100,50,0,685,686,5,38,0,0,686,
	687,3,100,50,0,687,689,1,0,0,0,688,674,1,0,0,0,688,681,1,0,0,0,689,690,
	1,0,0,0,690,691,5,34,0,0,691,139,1,0,0,0,692,693,5,39,0,0,693,694,5,29,
	0,0,694,695,3,78,39,0,695,696,5,30,0,0,696,141,1,0,0,0,697,712,5,29,0,0,
	698,705,3,18,9,0,699,702,3,78,39,0,700,701,5,36,0,0,701,703,3,18,9,0,702,
	700,1,0,0,0,702,703,1,0,0,0,703,705,1,0,0,0,704,698,1,0,0,0,704,699,1,0,
	0,0,705,707,1,0,0,0,706,708,5,43,0,0,707,706,1,0,0,0,707,708,1,0,0,0,708,
	710,1,0,0,0,709,711,5,36,0,0,710,709,1,0,0,0,710,711,1,0,0,0,711,713,1,
	0,0,0,712,704,1,0,0,0,712,713,1,0,0,0,713,714,1,0,0,0,714,715,5,30,0,0,
	715,143,1,0,0,0,716,717,3,78,39,0,717,718,5,39,0,0,718,719,5,28,0,0,719,
	145,1,0,0,0,720,725,5,37,0,0,721,725,5,0,0,1,722,725,5,89,0,0,723,725,4,
	73,7,0,724,720,1,0,0,0,724,721,1,0,0,0,724,722,1,0,0,0,724,723,1,0,0,0,
	725,147,1,0,0,0,90,155,160,166,182,186,189,197,207,211,215,219,226,234,
	243,256,260,267,271,281,285,291,295,299,304,307,310,317,328,335,358,372,
	378,380,384,389,393,401,409,414,417,425,431,435,437,442,446,450,458,468,
	475,480,486,499,505,509,517,521,523,528,531,539,556,558,564,573,577,583,
	589,594,600,619,621,626,628,637,643,649,653,658,662,674,678,681,688,702,
	704,707,710,712,724];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!GoParser.__ATN) {
			GoParser.__ATN = new ATNDeserializer().deserialize(GoParser._serializedATN);
		}

		return GoParser.__ATN;
	}


	static DecisionsToDFA = GoParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class SourceFileContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public packageClause(): PackageClauseContext {
		return this.getTypedRuleContext(PackageClauseContext, 0) as PackageClauseContext;
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(GoParser.EOF, 0);
	}
	public importDecl_list(): ImportDeclContext[] {
		return this.getTypedRuleContexts(ImportDeclContext) as ImportDeclContext[];
	}
	public importDecl(i: number): ImportDeclContext {
		return this.getTypedRuleContext(ImportDeclContext, i) as ImportDeclContext;
	}
	public functionDecl_list(): FunctionDeclContext[] {
		return this.getTypedRuleContexts(FunctionDeclContext) as FunctionDeclContext[];
	}
	public functionDecl(i: number): FunctionDeclContext {
		return this.getTypedRuleContext(FunctionDeclContext, i) as FunctionDeclContext;
	}
	public declaration_list(): DeclarationContext[] {
		return this.getTypedRuleContexts(DeclarationContext) as DeclarationContext[];
	}
	public declaration(i: number): DeclarationContext {
		return this.getTypedRuleContext(DeclarationContext, i) as DeclarationContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_sourceFile;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterSourceFile) {
	 		listener.enterSourceFile(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitSourceFile) {
	 		listener.exitSourceFile(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSourceFile) {
			return visitor.visitSourceFile(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PackageClauseContext extends ParserRuleContext {
	public _packageName!: Token;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PACKAGE(): TerminalNode {
		return this.getToken(GoParser.PACKAGE, 0);
	}
	public MAIN_PACKAGE(): TerminalNode {
		return this.getToken(GoParser.MAIN_PACKAGE, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_packageClause;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterPackageClause) {
	 		listener.enterPackageClause(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitPackageClause) {
	 		listener.exitPackageClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitPackageClause) {
			return visitor.visitPackageClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IMPORT(): TerminalNode {
		return this.getToken(GoParser.IMPORT, 0);
	}
	public importSpec_list(): ImportSpecContext[] {
		return this.getTypedRuleContexts(ImportSpecContext) as ImportSpecContext[];
	}
	public importSpec(i: number): ImportSpecContext {
		return this.getTypedRuleContext(ImportSpecContext, i) as ImportSpecContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_importDecl;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterImportDecl) {
	 		listener.enterImportDecl(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitImportDecl) {
	 		listener.exitImportDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitImportDecl) {
			return visitor.visitImportDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportSpecContext extends ParserRuleContext {
	public _alias!: Token;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public importPath(): ImportPathContext {
		return this.getTypedRuleContext(ImportPathContext, 0) as ImportPathContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(GoParser.DOT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_importSpec;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterImportSpec) {
	 		listener.enterImportSpec(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitImportSpec) {
	 		listener.exitImportSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitImportSpec) {
			return visitor.visitImportSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportPathContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public string_(): String_Context {
		return this.getTypedRuleContext(String_Context, 0) as String_Context;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_importPath;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterImportPath) {
	 		listener.enterImportPath(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitImportPath) {
	 		listener.exitImportPath(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitImportPath) {
			return visitor.visitImportPath(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public constDecl(): ConstDeclContext {
		return this.getTypedRuleContext(ConstDeclContext, 0) as ConstDeclContext;
	}
	public varDecl(): VarDeclContext {
		return this.getTypedRuleContext(VarDeclContext, 0) as VarDeclContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_declaration;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterDeclaration) {
	 		listener.enterDeclaration(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitDeclaration) {
	 		listener.exitDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitDeclaration) {
			return visitor.visitDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CONST(): TerminalNode {
		return this.getToken(GoParser.CONST, 0);
	}
	public constSpec_list(): ConstSpecContext[] {
		return this.getTypedRuleContexts(ConstSpecContext) as ConstSpecContext[];
	}
	public constSpec(i: number): ConstSpecContext {
		return this.getTypedRuleContext(ConstSpecContext, i) as ConstSpecContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_constDecl;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterConstDecl) {
	 		listener.enterConstDecl(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitConstDecl) {
	 		listener.exitConstDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitConstDecl) {
			return visitor.visitConstDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstSpecContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(GoParser.ASSIGN, 0);
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_constSpec;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterConstSpec) {
	 		listener.enterConstSpec(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitConstSpec) {
	 		listener.exitConstSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitConstSpec) {
			return visitor.visitConstSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierListContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, i);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_identifierList;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterIdentifierList) {
	 		listener.enterIdentifierList(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitIdentifierList) {
	 		listener.exitIdentifierList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitIdentifierList) {
			return visitor.visitIdentifierList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionListContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_expressionList;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterExpressionList) {
	 		listener.enterExpressionList(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitExpressionList) {
	 		listener.exitExpressionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitExpressionList) {
			return visitor.visitExpressionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeParametersContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public typeParameterDecl_list(): TypeParameterDeclContext[] {
		return this.getTypedRuleContexts(TypeParameterDeclContext) as TypeParameterDeclContext[];
	}
	public typeParameterDecl(i: number): TypeParameterDeclContext {
		return this.getTypedRuleContext(TypeParameterDeclContext, i) as TypeParameterDeclContext;
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeParameters;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterTypeParameters) {
	 		listener.enterTypeParameters(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitTypeParameters) {
	 		listener.exitTypeParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeParameters) {
			return visitor.visitTypeParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeParameterDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public typeElement(): TypeElementContext {
		return this.getTypedRuleContext(TypeElementContext, 0) as TypeElementContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeParameterDecl;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterTypeParameterDecl) {
	 		listener.enterTypeParameterDecl(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitTypeParameterDecl) {
	 		listener.exitTypeParameterDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeParameterDecl) {
			return visitor.visitTypeParameterDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeElementContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeTerm_list(): TypeTermContext[] {
		return this.getTypedRuleContexts(TypeTermContext) as TypeTermContext[];
	}
	public typeTerm(i: number): TypeTermContext {
		return this.getTypedRuleContext(TypeTermContext, i) as TypeTermContext;
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(GoParser.OR, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeElement;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterTypeElement) {
	 		listener.enterTypeElement(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitTypeElement) {
	 		listener.exitTypeElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeElement) {
			return visitor.visitTypeElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeTermContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public UNDERLYING(): TerminalNode {
		return this.getToken(GoParser.UNDERLYING, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeTerm;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterTypeTerm) {
	 		listener.enterTypeTerm(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitTypeTerm) {
	 		listener.exitTypeTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeTerm) {
			return visitor.visitTypeTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FUNC(): TerminalNode {
		return this.getToken(GoParser.FUNC, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
	public signature(): SignatureContext {
		return this.getTypedRuleContext(SignatureContext, 0) as SignatureContext;
	}
	public typeParameters(): TypeParametersContext {
		return this.getTypedRuleContext(TypeParametersContext, 0) as TypeParametersContext;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_functionDecl;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterFunctionDecl) {
	 		listener.enterFunctionDecl(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitFunctionDecl) {
	 		listener.exitFunctionDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitFunctionDecl) {
			return visitor.visitFunctionDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public VAR(): TerminalNode {
		return this.getToken(GoParser.VAR, 0);
	}
	public varSpec_list(): VarSpecContext[] {
		return this.getTypedRuleContexts(VarSpecContext) as VarSpecContext[];
	}
	public varSpec(i: number): VarSpecContext {
		return this.getTypedRuleContext(VarSpecContext, i) as VarSpecContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_varDecl;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterVarDecl) {
	 		listener.enterVarDecl(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitVarDecl) {
	 		listener.exitVarDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitVarDecl) {
			return visitor.visitVarDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarSpecContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(GoParser.ASSIGN, 0);
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_varSpec;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterVarSpec) {
	 		listener.enterVarSpec(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitVarSpec) {
	 		listener.exitVarSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitVarSpec) {
			return visitor.visitVarSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(GoParser.L_CURLY, 0);
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(GoParser.R_CURLY, 0);
	}
	public statementList(): StatementListContext {
		return this.getTypedRuleContext(StatementListContext, 0) as StatementListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_block;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterBlock) {
	 		listener.enterBlock(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitBlock) {
	 		listener.exitBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementListContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
	public SEMI_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.SEMI);
	}
	public SEMI(i: number): TerminalNode {
		return this.getToken(GoParser.SEMI, i);
	}
	public EOS_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.EOS);
	}
	public EOS(i: number): TerminalNode {
		return this.getToken(GoParser.EOS, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_statementList;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterStatementList) {
	 		listener.enterStatementList(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitStatementList) {
	 		listener.exitStatementList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitStatementList) {
			return visitor.visitStatementList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declaration(): DeclarationContext {
		return this.getTypedRuleContext(DeclarationContext, 0) as DeclarationContext;
	}
	public simpleStmt(): SimpleStmtContext {
		return this.getTypedRuleContext(SimpleStmtContext, 0) as SimpleStmtContext;
	}
	public goStmt(): GoStmtContext {
		return this.getTypedRuleContext(GoStmtContext, 0) as GoStmtContext;
	}
	public returnStmt(): ReturnStmtContext {
		return this.getTypedRuleContext(ReturnStmtContext, 0) as ReturnStmtContext;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public ifStmt(): IfStmtContext {
		return this.getTypedRuleContext(IfStmtContext, 0) as IfStmtContext;
	}
	public selectStmt(): SelectStmtContext {
		return this.getTypedRuleContext(SelectStmtContext, 0) as SelectStmtContext;
	}
	public forStmt(): ForStmtContext {
		return this.getTypedRuleContext(ForStmtContext, 0) as ForStmtContext;
	}
	public deferStmt(): DeferStmtContext {
		return this.getTypedRuleContext(DeferStmtContext, 0) as DeferStmtContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_statement;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterStatement) {
	 		listener.enterStatement(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitStatement) {
	 		listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public sendStmt(): SendStmtContext {
		return this.getTypedRuleContext(SendStmtContext, 0) as SendStmtContext;
	}
	public incDecStmt(): IncDecStmtContext {
		return this.getTypedRuleContext(IncDecStmtContext, 0) as IncDecStmtContext;
	}
	public assignment(): AssignmentContext {
		return this.getTypedRuleContext(AssignmentContext, 0) as AssignmentContext;
	}
	public expressionStmt(): ExpressionStmtContext {
		return this.getTypedRuleContext(ExpressionStmtContext, 0) as ExpressionStmtContext;
	}
	public shortVarDecl(): ShortVarDeclContext {
		return this.getTypedRuleContext(ShortVarDeclContext, 0) as ShortVarDeclContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_simpleStmt;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterSimpleStmt) {
	 		listener.enterSimpleStmt(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitSimpleStmt) {
	 		listener.exitSimpleStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSimpleStmt) {
			return visitor.visitSimpleStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_expressionStmt;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterExpressionStmt) {
	 		listener.enterExpressionStmt(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitExpressionStmt) {
	 		listener.exitExpressionStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitExpressionStmt) {
			return visitor.visitExpressionStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SendStmtContext extends ParserRuleContext {
	public _channel!: ExpressionContext;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RECEIVE(): TerminalNode {
		return this.getToken(GoParser.RECEIVE, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_sendStmt;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterSendStmt) {
	 		listener.enterSendStmt(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitSendStmt) {
	 		listener.exitSendStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSendStmt) {
			return visitor.visitSendStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncDecStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public PLUS_PLUS(): TerminalNode {
		return this.getToken(GoParser.PLUS_PLUS, 0);
	}
	public MINUS_MINUS(): TerminalNode {
		return this.getToken(GoParser.MINUS_MINUS, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_incDecStmt;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterIncDecStmt) {
	 		listener.enterIncDecStmt(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitIncDecStmt) {
	 		listener.exitIncDecStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitIncDecStmt) {
			return visitor.visitIncDecStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expressionList_list(): ExpressionListContext[] {
		return this.getTypedRuleContexts(ExpressionListContext) as ExpressionListContext[];
	}
	public expressionList(i: number): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, i) as ExpressionListContext;
	}
	public assign_op(): Assign_opContext {
		return this.getTypedRuleContext(Assign_opContext, 0) as Assign_opContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_assignment;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterAssignment) {
	 		listener.enterAssignment(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitAssignment) {
	 		listener.exitAssignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitAssignment) {
			return visitor.visitAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assign_opContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(GoParser.ASSIGN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_assign_op;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterAssign_op) {
	 		listener.enterAssign_op(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitAssign_op) {
	 		listener.exitAssign_op(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitAssign_op) {
			return visitor.visitAssign_op(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ShortVarDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public DECLARE_ASSIGN(): TerminalNode {
		return this.getToken(GoParser.DECLARE_ASSIGN, 0);
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_shortVarDecl;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterShortVarDecl) {
	 		listener.enterShortVarDecl(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitShortVarDecl) {
	 		listener.exitShortVarDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitShortVarDecl) {
			return visitor.visitShortVarDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RETURN(): TerminalNode {
		return this.getToken(GoParser.RETURN, 0);
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_returnStmt;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterReturnStmt) {
	 		listener.enterReturnStmt(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitReturnStmt) {
	 		listener.exitReturnStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitReturnStmt) {
			return visitor.visitReturnStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeferStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DEFER(): TerminalNode {
		return this.getToken(GoParser.DEFER, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_deferStmt;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterDeferStmt) {
	 		listener.enterDeferStmt(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitDeferStmt) {
	 		listener.exitDeferStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitDeferStmt) {
			return visitor.visitDeferStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IF(): TerminalNode {
		return this.getToken(GoParser.IF, 0);
	}
	public block_list(): BlockContext[] {
		return this.getTypedRuleContexts(BlockContext) as BlockContext[];
	}
	public block(i: number): BlockContext {
		return this.getTypedRuleContext(BlockContext, i) as BlockContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public eos(): EosContext {
		return this.getTypedRuleContext(EosContext, 0) as EosContext;
	}
	public simpleStmt(): SimpleStmtContext {
		return this.getTypedRuleContext(SimpleStmtContext, 0) as SimpleStmtContext;
	}
	public ELSE(): TerminalNode {
		return this.getToken(GoParser.ELSE, 0);
	}
	public ifStmt(): IfStmtContext {
		return this.getTypedRuleContext(IfStmtContext, 0) as IfStmtContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_ifStmt;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterIfStmt) {
	 		listener.enterIfStmt(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitIfStmt) {
	 		listener.exitIfStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitIfStmt) {
			return visitor.visitIfStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeListContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type__list(): Type_Context[] {
		return this.getTypedRuleContexts(Type_Context) as Type_Context[];
	}
	public type_(i: number): Type_Context {
		return this.getTypedRuleContext(Type_Context, i) as Type_Context;
	}
	public NIL_LIT_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.NIL_LIT);
	}
	public NIL_LIT(i: number): TerminalNode {
		return this.getToken(GoParser.NIL_LIT, i);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeList;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterTypeList) {
	 		listener.enterTypeList(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitTypeList) {
	 		listener.exitTypeList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeList) {
			return visitor.visitTypeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SELECT(): TerminalNode {
		return this.getToken(GoParser.SELECT, 0);
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(GoParser.L_CURLY, 0);
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(GoParser.R_CURLY, 0);
	}
	public commClause_list(): CommClauseContext[] {
		return this.getTypedRuleContexts(CommClauseContext) as CommClauseContext[];
	}
	public commClause(i: number): CommClauseContext {
		return this.getTypedRuleContext(CommClauseContext, i) as CommClauseContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_selectStmt;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterSelectStmt) {
	 		listener.enterSelectStmt(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitSelectStmt) {
	 		listener.exitSelectStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSelectStmt) {
			return visitor.visitSelectStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommClauseContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public commCase(): CommCaseContext {
		return this.getTypedRuleContext(CommCaseContext, 0) as CommCaseContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(GoParser.COLON, 0);
	}
	public statementList(): StatementListContext {
		return this.getTypedRuleContext(StatementListContext, 0) as StatementListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_commClause;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterCommClause) {
	 		listener.enterCommClause(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitCommClause) {
	 		listener.exitCommClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitCommClause) {
			return visitor.visitCommClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommCaseContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CASE(): TerminalNode {
		return this.getToken(GoParser.CASE, 0);
	}
	public sendStmt(): SendStmtContext {
		return this.getTypedRuleContext(SendStmtContext, 0) as SendStmtContext;
	}
	public recvStmt(): RecvStmtContext {
		return this.getTypedRuleContext(RecvStmtContext, 0) as RecvStmtContext;
	}
	public DEFAULT(): TerminalNode {
		return this.getToken(GoParser.DEFAULT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_commCase;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterCommCase) {
	 		listener.enterCommCase(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitCommCase) {
	 		listener.exitCommCase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitCommCase) {
			return visitor.visitCommCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RecvStmtContext extends ParserRuleContext {
	public _recvExpr!: ExpressionContext;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(GoParser.ASSIGN, 0);
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public DECLARE_ASSIGN(): TerminalNode {
		return this.getToken(GoParser.DECLARE_ASSIGN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_recvStmt;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterRecvStmt) {
	 		listener.enterRecvStmt(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitRecvStmt) {
	 		listener.exitRecvStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitRecvStmt) {
			return visitor.visitRecvStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FOR(): TerminalNode {
		return this.getToken(GoParser.FOR, 0);
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public forClause(): ForClauseContext {
		return this.getTypedRuleContext(ForClauseContext, 0) as ForClauseContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public rangeClause(): RangeClauseContext {
		return this.getTypedRuleContext(RangeClauseContext, 0) as RangeClauseContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_forStmt;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterForStmt) {
	 		listener.enterForStmt(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitForStmt) {
	 		listener.exitForStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitForStmt) {
			return visitor.visitForStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForClauseContext extends ParserRuleContext {
	public _initStmt!: SimpleStmtContext;
	public _postStmt!: SimpleStmtContext;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public simpleStmt_list(): SimpleStmtContext[] {
		return this.getTypedRuleContexts(SimpleStmtContext) as SimpleStmtContext[];
	}
	public simpleStmt(i: number): SimpleStmtContext {
		return this.getTypedRuleContext(SimpleStmtContext, i) as SimpleStmtContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_forClause;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterForClause) {
	 		listener.enterForClause(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitForClause) {
	 		listener.exitForClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitForClause) {
			return visitor.visitForClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RangeClauseContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RANGE(): TerminalNode {
		return this.getToken(GoParser.RANGE, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(GoParser.ASSIGN, 0);
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public DECLARE_ASSIGN(): TerminalNode {
		return this.getToken(GoParser.DECLARE_ASSIGN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_rangeClause;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterRangeClause) {
	 		listener.enterRangeClause(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitRangeClause) {
	 		listener.exitRangeClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitRangeClause) {
			return visitor.visitRangeClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GoStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public GO(): TerminalNode {
		return this.getToken(GoParser.GO, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_goStmt;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterGoStmt) {
	 		listener.enterGoStmt(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitGoStmt) {
	 		listener.exitGoStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitGoStmt) {
			return visitor.visitGoStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_Context extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public typeArgs(): TypeArgsContext {
		return this.getTypedRuleContext(TypeArgsContext, 0) as TypeArgsContext;
	}
	public typeLit(): TypeLitContext {
		return this.getTypedRuleContext(TypeLitContext, 0) as TypeLitContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_type_;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterType_) {
	 		listener.enterType_(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitType_) {
	 		listener.exitType_(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitType_) {
			return visitor.visitType_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeArgsContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public typeList(): TypeListContext {
		return this.getTypedRuleContext(TypeListContext, 0) as TypeListContext;
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
	public COMMA(): TerminalNode {
		return this.getToken(GoParser.COMMA, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeArgs;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterTypeArgs) {
	 		listener.enterTypeArgs(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitTypeArgs) {
	 		listener.exitTypeArgs(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeArgs) {
			return visitor.visitTypeArgs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeNameContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdent(): QualifiedIdentContext {
		return this.getTypedRuleContext(QualifiedIdentContext, 0) as QualifiedIdentContext;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeName;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterTypeName) {
	 		listener.enterTypeName(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitTypeName) {
	 		listener.exitTypeName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeName) {
			return visitor.visitTypeName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeLitContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public channelType(): ChannelTypeContext {
		return this.getTypedRuleContext(ChannelTypeContext, 0) as ChannelTypeContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeLit;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterTypeLit) {
	 		listener.enterTypeLit(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitTypeLit) {
	 		listener.exitTypeLit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeLit) {
			return visitor.visitTypeLit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayLengthContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_arrayLength;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterArrayLength) {
	 		listener.enterArrayLength(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitArrayLength) {
	 		listener.exitArrayLength(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitArrayLength) {
			return visitor.visitArrayLength(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_elementType;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterElementType) {
	 		listener.enterElementType(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitElementType) {
	 		listener.exitElementType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitElementType) {
			return visitor.visitElementType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ChannelTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public elementType(): ElementTypeContext {
		return this.getTypedRuleContext(ElementTypeContext, 0) as ElementTypeContext;
	}
	public CHAN(): TerminalNode {
		return this.getToken(GoParser.CHAN, 0);
	}
	public RECEIVE(): TerminalNode {
		return this.getToken(GoParser.RECEIVE, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_channelType;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterChannelType) {
	 		listener.enterChannelType(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitChannelType) {
	 		listener.exitChannelType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitChannelType) {
			return visitor.visitChannelType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SignatureContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
	public result(): ResultContext {
		return this.getTypedRuleContext(ResultContext, 0) as ResultContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_signature;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterSignature) {
	 		listener.enterSignature(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitSignature) {
	 		listener.exitSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSignature) {
			return visitor.visitSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResultContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_result;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterResult) {
	 		listener.enterResult(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitResult) {
	 		listener.exitResult(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitResult) {
			return visitor.visitResult(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParametersContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public parameterDecl_list(): ParameterDeclContext[] {
		return this.getTypedRuleContexts(ParameterDeclContext) as ParameterDeclContext[];
	}
	public parameterDecl(i: number): ParameterDeclContext {
		return this.getTypedRuleContext(ParameterDeclContext, i) as ParameterDeclContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_parameters;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterParameters) {
	 		listener.enterParameters(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitParameters) {
	 		listener.exitParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitParameters) {
			return visitor.visitParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public ELLIPSIS(): TerminalNode {
		return this.getToken(GoParser.ELLIPSIS, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_parameterDecl;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterParameterDecl) {
	 		listener.enterParameterDecl(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitParameterDecl) {
	 		listener.exitParameterDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitParameterDecl) {
			return visitor.visitParameterDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public _unary_op!: Token;
	public _mul_op!: Token;
	public _add_op!: Token;
	public _rel_op!: Token;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primaryExpr(): PrimaryExprContext {
		return this.getTypedRuleContext(PrimaryExprContext, 0) as PrimaryExprContext;
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(GoParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(GoParser.MINUS, 0);
	}
	public EXCLAMATION(): TerminalNode {
		return this.getToken(GoParser.EXCLAMATION, 0);
	}
	public CARET(): TerminalNode {
		return this.getToken(GoParser.CARET, 0);
	}
	public STAR(): TerminalNode {
		return this.getToken(GoParser.STAR, 0);
	}
	public AMPERSAND(): TerminalNode {
		return this.getToken(GoParser.AMPERSAND, 0);
	}
	public RECEIVE(): TerminalNode {
		return this.getToken(GoParser.RECEIVE, 0);
	}
	public DIV(): TerminalNode {
		return this.getToken(GoParser.DIV, 0);
	}
	public MOD(): TerminalNode {
		return this.getToken(GoParser.MOD, 0);
	}
	public LSHIFT(): TerminalNode {
		return this.getToken(GoParser.LSHIFT, 0);
	}
	public RSHIFT(): TerminalNode {
		return this.getToken(GoParser.RSHIFT, 0);
	}
	public BIT_CLEAR(): TerminalNode {
		return this.getToken(GoParser.BIT_CLEAR, 0);
	}
	public OR(): TerminalNode {
		return this.getToken(GoParser.OR, 0);
	}
	public EQUALS(): TerminalNode {
		return this.getToken(GoParser.EQUALS, 0);
	}
	public NOT_EQUALS(): TerminalNode {
		return this.getToken(GoParser.NOT_EQUALS, 0);
	}
	public LESS(): TerminalNode {
		return this.getToken(GoParser.LESS, 0);
	}
	public LESS_OR_EQUALS(): TerminalNode {
		return this.getToken(GoParser.LESS_OR_EQUALS, 0);
	}
	public GREATER(): TerminalNode {
		return this.getToken(GoParser.GREATER, 0);
	}
	public GREATER_OR_EQUALS(): TerminalNode {
		return this.getToken(GoParser.GREATER_OR_EQUALS, 0);
	}
	public LOGICAL_AND(): TerminalNode {
		return this.getToken(GoParser.LOGICAL_AND, 0);
	}
	public LOGICAL_OR(): TerminalNode {
		return this.getToken(GoParser.LOGICAL_OR, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_expression;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterExpression) {
	 		listener.enterExpression(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitExpression) {
	 		listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryExprContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public operand(): OperandContext {
		return this.getTypedRuleContext(OperandContext, 0) as OperandContext;
	}
	public methodExpr(): MethodExprContext {
		return this.getTypedRuleContext(MethodExprContext, 0) as MethodExprContext;
	}
	public primaryExpr(): PrimaryExprContext {
		return this.getTypedRuleContext(PrimaryExprContext, 0) as PrimaryExprContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(GoParser.DOT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
	public index(): IndexContext {
		return this.getTypedRuleContext(IndexContext, 0) as IndexContext;
	}
	public slice_(): Slice_Context {
		return this.getTypedRuleContext(Slice_Context, 0) as Slice_Context;
	}
	public typeAssertion(): TypeAssertionContext {
		return this.getTypedRuleContext(TypeAssertionContext, 0) as TypeAssertionContext;
	}
	public arguments(): ArgumentsContext {
		return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_primaryExpr;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterPrimaryExpr) {
	 		listener.enterPrimaryExpr(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitPrimaryExpr) {
	 		listener.exitPrimaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitPrimaryExpr) {
			return visitor.visitPrimaryExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperandContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
	public operandName(): OperandNameContext {
		return this.getTypedRuleContext(OperandNameContext, 0) as OperandNameContext;
	}
	public typeArgs(): TypeArgsContext {
		return this.getTypedRuleContext(TypeArgsContext, 0) as TypeArgsContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_operand;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterOperand) {
	 		listener.enterOperand(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitOperand) {
	 		listener.exitOperand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitOperand) {
			return visitor.visitOperand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public basicLit(): BasicLitContext {
		return this.getTypedRuleContext(BasicLitContext, 0) as BasicLitContext;
	}
	public compositeLit(): CompositeLitContext {
		return this.getTypedRuleContext(CompositeLitContext, 0) as CompositeLitContext;
	}
	public functionLit(): FunctionLitContext {
		return this.getTypedRuleContext(FunctionLitContext, 0) as FunctionLitContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_literal;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterLiteral) {
	 		listener.enterLiteral(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitLiteral) {
	 		listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BasicLitContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NIL_LIT(): TerminalNode {
		return this.getToken(GoParser.NIL_LIT, 0);
	}
	public integer(): IntegerContext {
		return this.getTypedRuleContext(IntegerContext, 0) as IntegerContext;
	}
	public string_(): String_Context {
		return this.getTypedRuleContext(String_Context, 0) as String_Context;
	}
	public FLOAT_LIT(): TerminalNode {
		return this.getToken(GoParser.FLOAT_LIT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_basicLit;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterBasicLit) {
	 		listener.enterBasicLit(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitBasicLit) {
	 		listener.exitBasicLit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitBasicLit) {
			return visitor.visitBasicLit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntegerContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DECIMAL_LIT(): TerminalNode {
		return this.getToken(GoParser.DECIMAL_LIT, 0);
	}
	public BINARY_LIT(): TerminalNode {
		return this.getToken(GoParser.BINARY_LIT, 0);
	}
	public OCTAL_LIT(): TerminalNode {
		return this.getToken(GoParser.OCTAL_LIT, 0);
	}
	public HEX_LIT(): TerminalNode {
		return this.getToken(GoParser.HEX_LIT, 0);
	}
	public IMAGINARY_LIT(): TerminalNode {
		return this.getToken(GoParser.IMAGINARY_LIT, 0);
	}
	public RUNE_LIT(): TerminalNode {
		return this.getToken(GoParser.RUNE_LIT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_integer;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterInteger) {
	 		listener.enterInteger(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitInteger) {
	 		listener.exitInteger(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitInteger) {
			return visitor.visitInteger(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperandNameContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_operandName;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterOperandName) {
	 		listener.enterOperandName(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitOperandName) {
	 		listener.exitOperandName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitOperandName) {
			return visitor.visitOperandName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedIdentContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, i);
	}
	public DOT(): TerminalNode {
		return this.getToken(GoParser.DOT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_qualifiedIdent;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterQualifiedIdent) {
	 		listener.enterQualifiedIdent(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitQualifiedIdent) {
	 		listener.exitQualifiedIdent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitQualifiedIdent) {
			return visitor.visitQualifiedIdent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompositeLitContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literalType(): LiteralTypeContext {
		return this.getTypedRuleContext(LiteralTypeContext, 0) as LiteralTypeContext;
	}
	public literalValue(): LiteralValueContext {
		return this.getTypedRuleContext(LiteralValueContext, 0) as LiteralValueContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_compositeLit;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterCompositeLit) {
	 		listener.enterCompositeLit(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitCompositeLit) {
	 		listener.exitCompositeLit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitCompositeLit) {
			return visitor.visitCompositeLit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public ELLIPSIS(): TerminalNode {
		return this.getToken(GoParser.ELLIPSIS, 0);
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
	public elementType(): ElementTypeContext {
		return this.getTypedRuleContext(ElementTypeContext, 0) as ElementTypeContext;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public typeArgs(): TypeArgsContext {
		return this.getTypedRuleContext(TypeArgsContext, 0) as TypeArgsContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_literalType;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterLiteralType) {
	 		listener.enterLiteralType(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitLiteralType) {
	 		listener.exitLiteralType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitLiteralType) {
			return visitor.visitLiteralType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralValueContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(GoParser.L_CURLY, 0);
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(GoParser.R_CURLY, 0);
	}
	public elementList(): ElementListContext {
		return this.getTypedRuleContext(ElementListContext, 0) as ElementListContext;
	}
	public COMMA(): TerminalNode {
		return this.getToken(GoParser.COMMA, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_literalValue;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterLiteralValue) {
	 		listener.enterLiteralValue(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitLiteralValue) {
	 		listener.exitLiteralValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitLiteralValue) {
			return visitor.visitLiteralValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementListContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public keyedElement_list(): KeyedElementContext[] {
		return this.getTypedRuleContexts(KeyedElementContext) as KeyedElementContext[];
	}
	public keyedElement(i: number): KeyedElementContext {
		return this.getTypedRuleContext(KeyedElementContext, i) as KeyedElementContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_elementList;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterElementList) {
	 		listener.enterElementList(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitElementList) {
	 		listener.exitElementList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitElementList) {
			return visitor.visitElementList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeyedElementContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public element(): ElementContext {
		return this.getTypedRuleContext(ElementContext, 0) as ElementContext;
	}
	public key(): KeyContext {
		return this.getTypedRuleContext(KeyContext, 0) as KeyContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(GoParser.COLON, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_keyedElement;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterKeyedElement) {
	 		listener.enterKeyedElement(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitKeyedElement) {
	 		listener.exitKeyedElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitKeyedElement) {
			return visitor.visitKeyedElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeyContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public literalValue(): LiteralValueContext {
		return this.getTypedRuleContext(LiteralValueContext, 0) as LiteralValueContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_key;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterKey) {
	 		listener.enterKey(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitKey) {
	 		listener.exitKey(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitKey) {
			return visitor.visitKey(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public literalValue(): LiteralValueContext {
		return this.getTypedRuleContext(LiteralValueContext, 0) as LiteralValueContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_element;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterElement) {
	 		listener.enterElement(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitElement) {
	 		listener.exitElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitElement) {
			return visitor.visitElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class String_Context extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RAW_STRING_LIT(): TerminalNode {
		return this.getToken(GoParser.RAW_STRING_LIT, 0);
	}
	public INTERPRETED_STRING_LIT(): TerminalNode {
		return this.getToken(GoParser.INTERPRETED_STRING_LIT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_string_;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterString_) {
	 		listener.enterString_(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitString_) {
	 		listener.exitString_(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitString_) {
			return visitor.visitString_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EmbeddedFieldContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public STAR(): TerminalNode {
		return this.getToken(GoParser.STAR, 0);
	}
	public typeArgs(): TypeArgsContext {
		return this.getTypedRuleContext(TypeArgsContext, 0) as TypeArgsContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_embeddedField;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterEmbeddedField) {
	 		listener.enterEmbeddedField(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitEmbeddedField) {
	 		listener.exitEmbeddedField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitEmbeddedField) {
			return visitor.visitEmbeddedField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionLitContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FUNC(): TerminalNode {
		return this.getToken(GoParser.FUNC, 0);
	}
	public signature(): SignatureContext {
		return this.getTypedRuleContext(SignatureContext, 0) as SignatureContext;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_functionLit;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterFunctionLit) {
	 		listener.enterFunctionLit(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitFunctionLit) {
	 		listener.exitFunctionLit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitFunctionLit) {
			return visitor.visitFunctionLit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IndexContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_index;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterIndex) {
	 		listener.enterIndex(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitIndex) {
	 		listener.exitIndex(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitIndex) {
			return visitor.visitIndex(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Slice_Context extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
	public COLON_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COLON);
	}
	public COLON(i: number): TerminalNode {
		return this.getToken(GoParser.COLON, i);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_slice_;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterSlice_) {
	 		listener.enterSlice_(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitSlice_) {
	 		listener.exitSlice_(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSlice_) {
			return visitor.visitSlice_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeAssertionContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DOT(): TerminalNode {
		return this.getToken(GoParser.DOT, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeAssertion;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterTypeAssertion) {
	 		listener.enterTypeAssertion(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitTypeAssertion) {
	 		listener.exitTypeAssertion(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeAssertion) {
			return visitor.visitTypeAssertion(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentsContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public ELLIPSIS(): TerminalNode {
		return this.getToken(GoParser.ELLIPSIS, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_arguments;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterArguments) {
	 		listener.enterArguments(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitArguments) {
	 		listener.exitArguments(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitArguments) {
			return visitor.visitArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodExprContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public DOT(): TerminalNode {
		return this.getToken(GoParser.DOT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_methodExpr;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterMethodExpr) {
	 		listener.enterMethodExpr(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitMethodExpr) {
	 		listener.exitMethodExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitMethodExpr) {
			return visitor.visitMethodExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EosContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SEMI(): TerminalNode {
		return this.getToken(GoParser.SEMI, 0);
	}
	public EOF(): TerminalNode {
		return this.getToken(GoParser.EOF, 0);
	}
	public EOS(): TerminalNode {
		return this.getToken(GoParser.EOS, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_eos;
	}
	public enterRule(listener: GoParserListener): void {
	    if(listener.enterEos) {
	 		listener.enterEos(this);
		}
	}
	public exitRule(listener: GoParserListener): void {
	    if(listener.exitEos) {
	 		listener.exitEos(this);
		}
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitEos) {
			return visitor.visitEos(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
