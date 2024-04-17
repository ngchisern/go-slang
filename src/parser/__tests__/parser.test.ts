import { Test, testDriver } from './__utils__/utils'

const tests: Test[] = [
  {
    name: 'Can parse simple Go code',
    input: `
      package main
      import "fmt"
      func main() {
        fmt.Println(1);
      }
    `
  },
  {
    name: 'Can parse sequential constructs: ShortVarDecl, arithmetic, function call',
    input: `
      package main
      import "fmt"
      func minus(x int) {
        y := x - 21 * 2;
        fmt.Println(y);
      }
      func main() {
        minus(42);
      }
    `,
  },
  {
    name: 'Can parse goroutines',
    input: `
      package main
      import "fmt"
      func print(x int) {
        fmt.Println(x)
      }
      func main() {
        go print(1)
        go print(100 / 2)
      }
    `,
  },
  {
    name: 'Can parse channels',
    input: `
      package main
      import "fmt"
      func minus(c chan int) {
        x := <-c
        fmt.Println(x)
      }
      func main() {
        c := make(chan int)
        bc := make(chan int, 1)
        go minus(c)
        go minus(bc)
        c <- 21
        bc <- 212
      }
    `
  },
  {
    name: 'Can parse WaitGroup',
    input: `
      package main
      import (
        "fmt"
        "sync"
      )
      var wg sync.WaitGroup
      func print(wg sync.WaitGroup) {
        fmt.Println(100)
        wg.Done()
      }
      func main() {
        wg.Add(1)
        go print(wg)
        wg.Wait()
      }
    `
  },
  {
    name: 'Can parse mutex',
    input: `
      package main
      import "sync"
      var counter int = 0
      var mu sync.Mutex
      func increment(x int) {
        mu.Lock();
        counter = counter + x;
        mu.Unlock();
      }
      func main() {
        go increment(10)
        go increment(2)
      }
    `
  },
  {
    name: 'Throw err when missing pkg clause',
    input: `
      import "fmt"
      func main() {
        fmt.Println(1);
      }
    `,
    shouldThrowErr: true
  },
  {
    name: 'Throw err when pkg imported in single quotes',
    input: `
      package main
      import 'fmt'
      func main() {
        fmt.Println(1);
      }
    `,
    shouldThrowErr: true
  },
  {
    name: 'Throw err when missing parenthesis',
    input: `
      package main
      import 'fmt'
      func main() {
        fmt.Println(1;
      }
    `,
    shouldThrowErr: true
  },
]

describe("test parser", () => {
  testDriver(tests)
})
