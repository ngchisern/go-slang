export interface BaseNode {
    type: string
}

export type AstNode = BaseNode | BaseNode[]

// TODO - Add more types