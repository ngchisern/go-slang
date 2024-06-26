import { Test, testDriver } from './__utils__/utils'

const tests: Test[] = [
  {
    name: 'Compile simple Go code correctly',
    input: `
      package main
      import "fmt"
      func main() {
        fmt.Println(1);
      }
    `,
    output: [
      'ENTER_SCOPE',
      'LDC', // import "fmt"
      'ASSIGN',
      'POP',
      'LDF', // main
      'GOTO',
      'ENTER_SCOPE',
      'LD', // fmt.Println(1)
      'LD',
      'LDC',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'LDC',
      'RESET',
      'ASSIGN',
      'POP',
      'LD',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'DONE'
    ]
  },
  {
    name: 'Compile sequential constructs: ShortVarDecl, arithmetic, function call correctly',
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
    output: [
      'ENTER_SCOPE',
      'LDC', // import "fmt"
      'ASSIGN',
      'POP',
      'LDF', // minus
      'GOTO',
      'ENTER_SCOPE',
      'LD', // y := x - 21 * 2
      'LDC',
      'LDC',
      'BINOP',
      'BINOP',
      'ASSIGN',
      'POP',
      'LD', // fmt.Println(y)
      'LD',
      'LD',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'LDC',
      'RESET',
      'ASSIGN',
      'POP',
      'LDF', // main
      'GOTO',
      'ENTER_SCOPE',
      'LD', // minus(42)
      'LDC',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'LDC',
      'RESET',
      'ASSIGN',
      'POP',
      'LD',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'DONE'
    ]
  },
  {
    name: 'Compile goroutines correctly',
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
    output: [
      'ENTER_SCOPE',
      'LDC', // import "fmt"
      'ASSIGN',
      'POP',
      'LDF', // print
      'GOTO',
      'ENTER_SCOPE',
      'LD', // fmt.Println(x)
      'LD',
      'LD',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'LDC',
      'RESET',
      'ASSIGN',
      'POP',
      'LDF', // main
      'GOTO',
      'ENTER_SCOPE',
      'GO', // go print(1)
      'GOTO',
      'LD',
      'LDC',
      'CALL',
      'GO_DONE',
      'GO', // go print(100 / 2)
      'GOTO',
      'LD',
      'LDC',
      'LDC',
      'BINOP',
      'CALL',
      'GO_DONE',
      'EXIT_SCOPE',
      'LDC',
      'RESET',
      'ASSIGN',
      'POP',
      'LD',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'DONE'
    ]
  },
  {
    name: 'Compile channels correctly',
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
    `,
    output: [
      'ENTER_SCOPE',
      'LDC', // import "fmt"
      'ASSIGN',
      'POP',
      'LDF', // minus
      'GOTO',
      'ENTER_SCOPE',
      'LD', // x := <-c
      'UNOP',
      'ASSIGN',
      'POP',
      'LD', // fmt.Println(x)
      'LD',
      'LD',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'LDC',
      'RESET',
      'ASSIGN',
      'POP',
      'LDF', // main
      'GOTO',
      'ENTER_SCOPE',
      'LD', // c := make(chan int)
      'LDC', // TODO change to TYPE
      'CALL',
      'ASSIGN',
      'POP',
      'LD', // bc := make(chan int, 1)
      'LDC', // TODO change to TYPE
      'LDC',
      'CALL',
      'ASSIGN',
      'POP',
      'GO', // go minus(c)
      'GOTO',
      'LD',
      'LD',
      'CALL',
      'GO_DONE',
      'GO', // go minus(bc)
      'GOTO',
      'LD',
      'LD',
      'CALL',
      'GO_DONE',
      'LD', // c <- 21
      'LDC',
      'SEND',
      'LD', // bc <- 212
      'LDC',
      'SEND',
      'EXIT_SCOPE',
      'LDC',
      'RESET',
      'ASSIGN',
      'POP',
      'LD',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'DONE'
    ]
  },
  {
    name: 'Compile WaitGroup correctly',
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
        go print()
        wg.Wait()
      }
    `,
    output: [
      'ENTER_SCOPE',
      'LDC', // import "fmt"
      'ASSIGN',
      'POP',
      'LDC', // import "sync"
      'ASSIGN',
      'POP',
      'LDC', // var wg sync.WaitGroup
      'ASSIGN',
      'POP',
      'LDF', // print
      'GOTO',
      'ENTER_SCOPE',
      'LD', // fmt.Println(100)
      'LD',
      'LDC',
      'CALL',
      'POP',
      'LD', // wg.Done()
      'LD',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'LDC',
      'RESET',
      'ASSIGN',
      'POP',
      'LDF', // main
      'GOTO',
      'ENTER_SCOPE',
      'LD', // wg.Add(1)
      'LD',
      'LDC',
      'CALL',
      'POP',
      'GO', // go print()
      'GOTO',
      'LD',
      'LD',
      'CALL',
      'GO_DONE',
      'LD', // wg.Wait()
      'LD',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'LDC',
      'RESET',
      'ASSIGN',
      'POP',
      'LD', // main()
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'DONE'
    ]
  },
  {
    name: 'Compile mutex correctly',
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
    `,
    output: [
      'ENTER_SCOPE',
      'LDC', // import "fmt"
      'ASSIGN',
      'POP',
      'LDC', // var counter int = 0
      'ASSIGN',
      'POP',
      'LDC', // var mu sync.Mutex
      'ASSIGN',
      'POP',
      'LDF', // increment
      'GOTO',
      'ENTER_SCOPE',
      'LD', // mu.Lock()
      'LD',
      'CALL',
      'POP',
      'LD', // counter = counter + x
      'LD',
      'BINOP',
      'ASSIGN',
      'POP',
      'LD', // mu.Unlock()
      'LD',
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'LDC',
      'RESET',
      'ASSIGN',
      'POP',
      'LDF', // main
      'GOTO',
      'ENTER_SCOPE',
      'GO', // go increment(10)
      'GOTO',
      'LD',
      'LDC',
      'CALL',
      'GO_DONE',
      'GO', // go increment(2))
      'GOTO',
      'LD',
      'LDC',
      'CALL',
      'GO_DONE',
      'EXIT_SCOPE',
      'LDC',
      'RESET',
      'ASSIGN',
      'POP',
      'LD', // main()
      'CALL',
      'POP',
      'EXIT_SCOPE',
      'DONE'
    ]
  },
  {
    name: 'Throw var x not found err',
    input: `
      package main
      import "fmt"
      func main() {
        fmt.Println(x);
      }
    `,
    error: 'Name x not found'
  },
  {
    name: 'Throw sync pkg not found err',
    input: `
      package main
      import "fmt"
      var wg sync.WaitGroup
      func print(wg sync.WaitGroup) {
        fmt.Println(100)
        wg.Done()
      }
      func main() {
        wg.Add(1)
        go print()
        wg.Wait()
      }
    `,
    error: 'Name sync not found'
  },
]

describe("test compiler", () => {
  testDriver(tests)
})
