import { Test, testDriver } from './__utils__/utils'

const tests: Test[] = [
  {
    name: 'Run simple Go code correctly',
    input: `
      package main
      import "fmt"
      func main() {
        fmt.Println(1);
      }
    `,
    output: new Set([1])
  },
  {
    name: 'Run sequential constructs: ShortVarDecl, arithmetic, function call correctly',
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
    output: new Set([0])
  },
  {
    name: 'Run goroutines correctly',
    input: `
      package main
      import (
        "fmt"
        "sync"
      )
      var wg sync.WaitGroup
      func print(x int) {
        fmt.Println(x)
        wg.Done()
      }
      func main() {
        wg.Add(2)
        go print(1)
        go print(100 / 2)
        wg.Wait()
      }
    `,
    output: new Set([1, 50])
  },
  {
    name: 'Run channels correctly',
    input: `
      package main
      import (
        "fmt"
        "sync"
      )
      var wg sync.WaitGroup
      func minus(c chan int) {
        x := <-c
        fmt.Println(x)
        wg.Done()
      }
      func main() {
        wg.Add(2)
        c := make(chan int)
        bc := make(chan int, 1)
        go minus(c)
        go minus(bc)
        c <- 21
        bc <- 212
        wg.Wait()
      }
    `,
    output: new Set([21, 212])
  },
  {
    name: 'Run WaitGroup correctly',
    input: `
      package main
      import (
        "fmt"
        "sync"
      )
      var wg sync.WaitGroup
      func print() {
        fmt.Println(100)
        wg.Done()
      }
      func main() {
        wg.Add(1)
        go print(wg)
        wg.Wait()
      }
    `,
    output: new Set([100])
  },
  {
    name: 'Run mutex correctly',
    input: `
      package main
      import (
        "fmt"
        "sync"
      )
      var counter int = 0
      var mu sync.Mutex
      var wg sync.WaitGroup
      func increment(x int) {
        mu.Lock();
        counter = counter + x;
        mu.Unlock();
        wg.Done()
      }
      func main() {
        wg.Add(2)
        go increment(10)
        go increment(2)
        wg.Wait()
        fmt.Println(counter)
      }
    `,
    output: new Set([12])
  }
]

describe("test VM", () => {
  testDriver(tests)
})
