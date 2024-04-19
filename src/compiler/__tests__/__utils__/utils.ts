import { Instruction } from "../../../common/instruction";
import { parseGoCode } from "../../../parser/parser";
import { compileGoCode } from "../../compiler";

export interface Test {
  name: string
  input: string
  output?: any
  error?: string
}

export const testDriver = (tests: Test[]) => {
  tests.forEach(({ name: name, input: programStr, output: expectedInstrTags, error: error }: Test) => {
    it(name, () => {
      const parsedCode = parseGoCode(programStr)
      expect(parsedCode).toBeTruthy()

      if (expectedInstrTags) {
        const instrs = compileGoCode(parsedCode)
        checkInstrs(instrs, expectedInstrTags)
      } else {
        expect(() => compileGoCode(parsedCode)).toThrow(error)
      }
    })
  })
}

const checkInstrs = (actualInstrs: Instruction[], expectedInstrTags: string[]) => {
  // Check entire arr easier for debugging.
  expect(actualInstrs.map(i => i.tag)).toEqual(expectedInstrTags)
}
