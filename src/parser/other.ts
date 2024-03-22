import { ErrorListener, RecognitionException, Recognizer, Token } from 'antlr4'

export class CustomErrorListener extends ErrorListener<any> {
  syntaxError(
    recognizer: Recognizer<any>,
    offendingSymbol: Token | undefined,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | undefined
  ): void {
    throw new Error(`Line ${line}:${charPositionInLine} ${msg}`)
  }
}
