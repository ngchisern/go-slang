import { compielGoCode } from './compiler/compiler'
import { parseGoCode } from './parser/parser'

const code = `
package main

import "fmt"

func hello() {
  x := "Hello, World";
  x = x + "!";
  fmt.Println(x);
}

func main() {
  go hello();
}
`

const ast = parseGoCode(code)
const instrs = compielGoCode(ast)
instrs.forEach((v, i) => console.log(`${i}:`, v))
