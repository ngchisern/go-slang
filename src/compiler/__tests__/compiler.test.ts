import { parseGoCode } from '../../parser/parser'
import { compileGoCode } from '../compiler'
import { checkInstrs } from './__utils__/utils'

it('compile simple Go code correctly', () => {
  const programStr = `
    package main
    import 'fmt'
    func main() {
      fmt.Println(1);
    }
  `

  const parsedCode = parseGoCode(programStr)
  expect(parsedCode).toBeTruthy()

  const instrs = compileGoCode(parsedCode)

  const expectedInstrTags = [
    'ENTER_SCOPE',
    'LDF',
    'GOTO',
    'ENTER_SCOPE',
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
    'EXIT_SCOPE'
  ]
  
  checkInstrs(instrs, expectedInstrTags)
})
