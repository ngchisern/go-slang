import { LiteralType, ParameterDeclaration } from './astNode'

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
  | Go
  | Ld
  | Unop
  | Binop
  | Send
  | Type

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

export interface Send extends InstructionBase {
  tag: 'SEND'
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

export interface Go extends InstructionBase {
  tag: 'GO'
}

export interface Ld extends InstructionBase {
  tag: 'LD'
  pos: [number, number]
}

export interface Unop extends InstructionBase {
  tag: 'UNOP'
  sym: string
}

export interface Binop extends InstructionBase {
  tag: 'BINOP'
  sym: string
}

export interface Type extends InstructionBase {
  tag: 'TYPE'
  type: string
}
