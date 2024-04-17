import { compileGoCode } from "../../../compiler/compiler"
import { parseGoCode } from "../../../parser/parser"
import { run } from '../../run'

export interface Test {
  name: string
  input: string
  output?: Set<any>
  error?: string
}

export const testDriver = (tests: Test[]) => {
  tests.forEach(({ name: name, input: programStr, output: expectedLogs, error: error }: Test) => {
    it(name, async () => {
      const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()
      const logs = new Set()
      const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(log => {
        logs.add(log)
      })

      const parsedCode = parseGoCode(programStr)
      expect(parsedCode).toBeTruthy()

      const instrs = compileGoCode(parsedCode)
      expect(instrs.length).toBeGreaterThan(0)

      // TODO somehow check content of OS?
      if (expectedLogs) {
        await run(instrs)
        expect(consoleErrorMock).not.toHaveBeenCalled()
        expect(logs).toEqual(expectedLogs)
      } else {
        expect(() => compileGoCode(parsedCode)).toThrow(error)
      }
      
      consoleErrorMock.mockRestore()
      consoleLogMock.mockRestore()
    })
  })
}
