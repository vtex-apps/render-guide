export interface Book {
  id: string
  cacheId?: string
  name: string
  authors: string[]
}

export interface BookInput {
  name: Book['name'],
  authors: Book['authors']
}

export type Maybe<T> = T | void
