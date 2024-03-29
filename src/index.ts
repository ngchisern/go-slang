import { compielGoCode } from './compiler/compiler'
import { parseGoCode } from './parser/parser'

const code = `
package main

import "fmt"

func hello(c chan string) {
  x := "Hello, ";
  world := <-c
  x = x + world;
  fmt.Println(x);
}

func main() {
  c := make(chan string)
  go hello(c);
  c <- "World"
  close(c)
}
`

const ast = parseGoCode(code)
const instrs = compielGoCode(ast)
instrs.forEach((v, i) => console.log(`${i}:`, v))
