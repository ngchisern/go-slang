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
  }
]

describe("test compiler", () => {
  testDriver(tests)
})
