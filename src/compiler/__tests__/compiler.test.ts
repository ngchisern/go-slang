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
      'LDF', // main
      'GOTO',
      'ENTER_SCOPE',
      'LD', // fmt.Println(1)
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
      'LDF', // print
      'GOTO',
      'ENTER_SCOPE',
      'LD', // fmt.Println(x)
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
        close(c)
        close(bc)
      }
    `,
    output: [
      'ENTER_SCOPE',
      'LDF', // minus
      'GOTO',
      'ENTER_SCOPE',
      'LD', // x := <-c
      'UNOP',
      'ASSIGN',
      'POP',
      'LD', // fmt.Println(x)
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
      'TYPE',
      'ASSIGN',
      'POP',
      'LD', // bc := make(chan int, 1)
      'TYPE',
      'LDC',
      'ASSIGN',
      'POP',
      'GO', // go minus(c)
      'GOTO',
      'LD',
      'CALL',
      'GO_DONE',
      'GO', // go minus(bc)
      'GOTO',
      'LD',
      'CALL',
      'GO_DONE',
      'LD', // c <- 21
      'LDC',
      'SEND',
      'LD', // bc <- 212
      'LDC',
      'SEND',
      'LD', // close(c)
      'LDC',
      'CALL',
      'POP',
      'LD', // close(bc)
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
    name: 'Compile waitGroup correctly',
    input: `
      package main
      import "fmt"
      func print(wg sync.waitGroup) {
        fmt.Println(100)
        wg.Done()
      }
      func main() {
        var wg sync.waitGroup
        wg.Add(1)
        go print(wg)
        wg.Wait()
      }
    `,
    output: [
      'ENTER_SCOPE',
      'LDF', // print
      'GOTO',
      'ENTER_SCOPE',
      'LD', // fmt.Println(100)
      'LDC',
      'CALL',
      'POP',
      'LD', // wg.Done()
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
      'LD', // var wg sync.waitGroup
      'LDC',
      'ASSIGN',
      'POP',
      'LD', // wg.Add(1)
      'LDC',
      'CALL',
      'POP',
      'GO', // go print(wg)
      'GOTO',
      'LD',
      'LD',
      'CALL',
      'GO_DONE',
      'LD', // wg.Wait()
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
      import "fmt"
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
      'LD', // var counter int = 0
      'LDC',
      'ASSIGN',
      'POP',
      'LD', // var mu sync.Mutex
      'LDC',
      'ASSIGN',
      'POP',
      'LDF', // increment
      'GOTO',
      'ENTER_SCOPE',
      'LD', // mu.Lock()
      'CALL',
      'POP',
      'LD', // counter = counter + x
      'LDC',
      'BINOP',
      'ASSIGN',
      'POP',
      'LD', // mu.Unlock()
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
      'LD',
      'CALL',
      'GO_DONE',
      'GO', // go increment(2))
      'GOTO',
      'LD',
      'LD',
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
  }
]

describe("test compiler", () => {
  testDriver(tests)
})
