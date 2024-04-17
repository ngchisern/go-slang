import { parseGoCode } from "../../../parser/parser";

export interface Test {
  name: string
  input: string
  shouldThrowErr?: boolean
}

export const testDriver = (tests: Test[]) => {
  tests.forEach(({ name: name, input: programStr, shouldThrowErr: shouldThrowErr }: Test) => {
    it(name, () => {
      if (shouldThrowErr) {
        expect(() => parseGoCode(programStr)).toThrow()
      } else {
        const parsedCode = parseGoCode(programStr)
        expect(parsedCode).toBeInstanceOf(Object)
      }
    })
  })
}
