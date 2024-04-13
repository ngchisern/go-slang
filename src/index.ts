import { compileGoCode } from './compiler/compiler'
import { parseGoCode } from './parser/parser'
import { run, run_parallel } from './vm/run'

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

// counter with mutex
var counter int = 0
var mu sync.Mutex
var wg sync.WaitGroup
// var channel chan int

func simple(x int) {
  mu.Lock();
  counter = counter + x;
  fmt.Println(counter);
  wg.Done();
  mu.Unlock();
}

func main() {
  ch := make(chan int, 2)
  // var wg sync.waitGroup
  wg.Add(2)
  // go minus(c, wg)
  // c <- 21
  // close(c)
  // wg.Wait()

  go func(x int) {
    fmt.Println(x)
    ch <- 5
    ch <- 10
    // wg.Done()
  } (42)
  x := 42;
  a := <-ch
  b := <-ch
  x = x - 21;
  
  go simple(x);
  go simple(x);
  // // x = x - 3;
  // simple(a);
  fmt.Println(a)
  fmt.Println(b)
  wg.Wait()
}
`

export async function compileAndRunGoCode(code: string, parallel = false) {
  try {
    const ast = parseGoCode(code)
    const instrs = compileGoCode(ast)
    // instrs.forEach((v, i) => console.log(`${i}:`, v));
    parallel ? await run_parallel(instrs) : await run(instrs)
    return { status: 'finished' }
  } catch (e) {
    return { status: 'error', message: e }
  }
}

// compileAndRunGoCode(code, false)
