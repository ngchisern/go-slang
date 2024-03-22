import { compielGoCode } from './compiler/compiler'
import { parseGoCode } from './parser/parser'

const code = `
package main

import "fmt"

func main() {
  x := "Hello, World";
  x = x + "!";
  fmt.Println(x);
}
`

const ast = parseGoCode(code)
const instrs = compielGoCode(ast)
instrs.forEach((v, i) => console.log(`${i}:`, v))
