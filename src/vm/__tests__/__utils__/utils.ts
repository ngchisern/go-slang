import { compileGoCode } from "../../../compiler/compiler"
import { parseGoCode } from "../../../parser/parser"
import { run } from '../../run'

export interface Test {
  name: string
  input: string
}

export const testDriver = (tests: Test[]) => {
  tests.forEach(({ name: name, input: programStr }: Test) => {
    it(name, () => {
      const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

      const parsedCode = parseGoCode(programStr)
      expect(parsedCode).toBeTruthy()

      const instrs = compileGoCode(parsedCode)
      expect(instrs.length).toBeGreaterThan(0)

      // TODO somehow check content of OS?
      expect(() => run(instrs)).not.toThrow()
      expect(consoleErrorMock).not.toHaveBeenCalled()
      
      consoleErrorMock.mockRestore()
    })
  })
}
