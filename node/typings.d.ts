import { ServiceContext } from '@vtex/api'

import { BookDataSource } from './dataSources/bookDataSource'
import { MardownDataSource } from './dataSources/markdownDataSource'

export interface Context extends ServiceContext {
  dataSources: DataSources
}

export interface DataSources {
  database: BookDataSource
  markdown: MardownDataSource
}

export interface Book {
  authors: string[]
  cacheId?: string
  id: string
  name: string
}

export interface BookInput {
  name: Book['name']
  authors: Book['authors']
}

export type Maybe<T> = T | void
