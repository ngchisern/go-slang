import { compileGoCode } from './compiler/compiler'
import { parseGoCode } from './parser/parser'
import { run } from './vm/run'

const code = `
package main

import "fmt"

// func minus(c chan string, wg sync.waitGroup) {
//   x := 42
//   y := <-c
//   x = x - y
//   fmt.Println(x)
//   wg.Done()
// }

func simple(x int) {
  fmt.Println(x);
}

func main() {
  // c := make(chan int)
  // var wg sync.waitGroup
  // wg.Add(1)
  // go minus(c, wg)
  // c <- 21
  // close(c)
  // wg.Wait()
  x := 42;
  x = x - 21;
  go simple(x);
}
`

export const compileAndRunGoCode = (code: string) => {
  const ast = parseGoCode(code)
  const instrs = compileGoCode(ast)
  // instrs.forEach((v, i) => console.log(`${i}:`, v))
  run(instrs)
}
