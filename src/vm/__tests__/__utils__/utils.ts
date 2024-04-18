import { Instruction } from "../../../common/instruction"
import { compileGoCode } from "../../../compiler/compiler"
import { parseGoCode } from "../../../parser/parser"

export interface Test {
  name: string
  input: string
  output?: Set<any>
  error?: string
}

export const testDriver = (tests: Test[], runMtdToTest: (instrs: Instruction[]) => Promise<void>) => {
  tests.forEach(({ name: name, input: programStr, output: expectedLogs, error: error }: Test) => {
    it(name, async () => {
      const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(msg => {
        throw new Error(msg)
      })
      const logs = new Set()
      const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(log => {
        logs.add(log)
      })

      const parsedCode = parseGoCode(programStr)
      expect(parsedCode).toBeTruthy()

      const instrs = compileGoCode(parsedCode)
      expect(instrs.length).toBeGreaterThan(0)

      if (expectedLogs) {
        await runMtdToTest(instrs)
        expect(consoleErrorMock).not.toHaveBeenCalled()
        expect(logs).toEqual(expectedLogs)
      } else {
        await expect(runMtdToTest(instrs)).rejects.toThrow(error)
      }
      
      consoleErrorMock.mockRestore()
      consoleLogMock.mockRestore()
    })
  })
}
