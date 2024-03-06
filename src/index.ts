import { parseGoCode } from './parser/parser'

const code = `
package main

import "fmt"

func main() {
  fmt.Println("Hello, World!");
}
`

parseGoCode(code)
