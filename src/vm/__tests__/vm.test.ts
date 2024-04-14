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
    `
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
    `
  },
  {
    name: 'Run goroutines correctly',
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
    `
  },
  {
    name: 'Run channels correctly',
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
    name: 'Run WaitGroup correctly',
    input: `
      package main
      import "fmt"
      func print(wg sync.WaitGroup) {
        fmt.Println(100)
        wg.Done()
      }
      func main() {
        var wg sync.WaitGroup
        wg.Add(1)
        go print(wg)
        wg.Wait()
      }
    `
  },
  {
    name: 'Run mutex correctly',
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
    `
  }
]

describe("test VM", () => {
  testDriver(tests)
})
