import { Expression, LiteralType, ParameterDeclaration } from './astNode'

type AssignSymbol = string | Expression
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
  sym: AssignSymbol
}

export interface Send extends InstructionBase {
  tag: 'SEND'
  chan: string
}

export interface Pop extends InstructionBase {
  tag: 'POP'
}

export interface Ldc extends InstructionBase {
  tag: 'LDC'
  val: LiteralType | undefined
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
  arity: number
}

export interface Ld extends InstructionBase {
  tag: 'LD'
  sym: string
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
