import { Parser, TokenStream } from 'antlr4'
import GoParser from './GoParser'

abstract class GoParserBase extends Parser {
  constructor(input: TokenStream) {
    super(input)
  }

  /**
   * Return true if the current Token is a closing bracket (')' or '}')
   */
  protected closingBracket(): boolean {
    const stream = this._input as TokenStream // Cast to the specific TokenStream type if needed
    const prevTokenType = stream.LA(1)

    return prevTokenType === GoParser.R_CURLY || prevTokenType === GoParser.R_PAREN
  }
}

export default GoParserBase
