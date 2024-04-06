export enum GoTag {
  Mutex = 'Mutex',
  WaitGroup = 'WaitGroup',
  Channel = 'Channel',
  Int = 'Int',
  String = 'String',
  Boolean = 'Boolean'
}

export type GoLit = Mutex | WaitGroup | Channel | Int | String | Boolean

interface GoLitBase {
  tag: GoTag
}

export interface Mutex extends GoLitBase {
  tag: GoTag.Mutex
}

export interface WaitGroup extends GoLitBase {
  tag: GoTag.WaitGroup
}

export interface Channel extends GoLitBase {
  tag: GoTag.Channel
}

export interface Int extends GoLitBase {
  tag: GoTag.Int
  val?: number
}

export interface String extends GoLitBase {
  tag: GoTag.String
  val?: string
}

export interface Boolean extends GoLitBase {
  tag: GoTag.Boolean
  val?: boolean
}
