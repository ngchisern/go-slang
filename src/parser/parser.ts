import { CharStream, CommonTokenStream } from 'antlr4'
import GoParser from '../lang/GoParser'
import GoLexer from '../lang/GoLexer'
import { CustomVisitor } from './customVisitor'
import { AstNode } from './astNode'

export function parseGoCode(source: string): AstNode {
  const charStream = new CharStream(source)
  const lexer = new GoLexer(charStream)
  const tokenStream = new CommonTokenStream(lexer)
  const parser = new GoParser(tokenStream)
  parser.buildParseTrees = true

  let tree = parser.sourceFile()
  const visitor = new CustomVisitor()
  const program = tree.accept(visitor)

  return program
}
