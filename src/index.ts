import { compileGoCode } from './compiler/compiler'
import { parseGoCode } from './parser/parser'
import { run } from './vm/run'

const code = `
package main

import "fmt"

func main() {
  // x := "Hello, World";
  // x = x + "!";
  x := 42;
  x = x - 21;
  fmt.Println(x);
}
`

const ast = parseGoCode(code)
const instrs = compileGoCode(ast)
// instrs.forEach((v, i) => console.log(`${i}:`, v))
run(instrs)