import { CharStream, CommonTokenStream } from 'antlr4'
import GoParser from '../lang/GoParser'
import GoLexer from '../lang/GoLexer'
import { CustomVisitor } from './customVisitor'
import { SourceFile } from '../../ common/astNode'
import { CustomErrorListener } from './customErrorListener'

export function parseGoCode(source: string): SourceFile {
  const charStream = new CharStream(source)
  const lexer = new GoLexer(charStream)
  const tokenStream = new CommonTokenStream(lexer)
  const parser = new GoParser(tokenStream)
  parser.buildParseTrees = true

  parser.removeErrorListeners()
  parser.addErrorListener(new CustomErrorListener())

  let tree
  try {
    tree = parser.sourceFile()
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }

  const visitor = new CustomVisitor()
  const program = visitor.visitSourceFile(tree)

  return program
}
