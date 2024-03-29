import { compielGoCode } from './compiler/compiler'
import { parseGoCode } from './parser/parser'

const code = `
package main

import "fmt"

func hello(c chan string, wg sync.waitGroup) {
  x := "Hello, ";
  world := <-c
  x = x + world;
  fmt.Println(x);
  wg.Done()
}

func main() {
  c := make(chan string)
  var wg sync.waitGroup
  wg.Add(1)
  go hello(c, wg)
  c <- "World"
  close(c)
  wg.Wait()
}
`

const ast = parseGoCode(code)
const instrs = compielGoCode(ast)
instrs.forEach((v, i) => console.log(`${i}:`, v))
