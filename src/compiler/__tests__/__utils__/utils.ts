import { Instruction } from "../../../common/instruction";

export const checkInstrs = (actualInstrs: Instruction[], expectedInstrTags: string[]) => {
  expectedInstrTags.forEach((expectedInstrTag, i) => {
    expect(actualInstrs[i].tag).toEqual(expectedInstrTag)
  })
}
