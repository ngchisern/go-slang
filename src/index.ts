import { CharStream, CommonTokenStream } from 'antlr4'
import GoParser from './lang/GoParser'
import GoLexer from './lang/GoLexer'

function parseGoCode(code: string) {
  const charStream = new CharStream(code)

  const lexer = new GoLexer(charStream)

  const tokenStream = new CommonTokenStream(lexer)

  const parser = new GoParser(tokenStream)

  let tree = parser.sourceFile()

  console.log(tree)
}

const code = `
package main

import "fmt"

func main() {
  fmt.Println("Hello, World!");
}
`

parseGoCode(code)
