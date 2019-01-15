import { ReactElement } from 'react'

export interface Book {
  authors: string[]
  cacheId?: string
  id: string
  name: string
}

export interface BookInput {
  authors: Book['authors']
  name: Book['name']
}

export interface CachedBookList {
  books: Array<Partial<Book>>
}

export interface CachedTotal {
  total: number
}

export type Maybe<T> = T | void | null

export interface Topic {
  Component: ReactElement
  name: string
  slug: string
}
