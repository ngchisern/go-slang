
import { CharStream, CommonTokenStream } from 'antlr4'
import GoParser from '../lang/GoParser'
import GoLexer from '../lang/GoLexer'

export function parse(source: string) {
    const charStream = new CharStream(source)
    const lexer = new GoLexer(charStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new GoParser(tokenStream)
    parser.buildParseTrees = true

    let tree = parser.sourceFile()
    console.log(tree)
}