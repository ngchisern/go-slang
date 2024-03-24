import { Expression, LiteralType, ParameterDeclaration } from './astNode'

export type LcdType = LiteralType | undefined

export type Instruction =
  | Done
  | EnterScope
  | ExitScope
  | Assign
  | Pop
  | Ldc
  | Ldf
  | Goto
  | Reset
  | Call
  | Ld
  | Binop

interface InstructionBase {
  tag: string
}

export interface Done extends InstructionBase {
  tag: 'DONE'
}

export interface EnterScope extends InstructionBase {
  tag: 'ENTER_SCOPE'
  syms: string[]
}

export interface ExitScope extends InstructionBase {
  tag: 'EXIT_SCOPE'
}

export interface Assign extends InstructionBase {
  tag: 'ASSIGN'
  pos: [number, number]
}

export interface Pop extends InstructionBase {
  tag: 'POP'
}

export interface Ldc extends InstructionBase {
  tag: 'LDC'
  val: LcdType
}

export interface Ldf extends InstructionBase {
  tag: 'LDF'
  prms: ParameterDeclaration[]
  addr: number
}

export interface Goto extends InstructionBase {
  tag: 'GOTO'
  addr: number
}

export interface Reset extends InstructionBase {
  tag: 'RESET'
}

export interface Call extends InstructionBase {
  tag: 'CALL'
  arity: number
}

export interface Ld extends InstructionBase {
  tag: 'LD'
  sym: string
  pos: [number, number]
}

export interface Binop extends InstructionBase {
  tag: 'BINOP'
  sym: string
}
