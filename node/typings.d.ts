import { ServiceContext } from '@vtex/api'

import { BookDataSource } from './dataSources/bookDataSource'
import { MardownDataSource } from './dataSources/markdownDataSource'

declare global {
  interface Context extends ServiceContext {
    dataSources: DataSources
  }

  interface DataSources {
    database: BookDataSource
    markdown: MardownDataSource
  }

  interface Book {
    id: string
    cacheId?: string
    name: string
    authors: string[]
  }

  interface BookInput {
    name: Book['name'],
    authors: Book['authors']
  }

  type Maybe<T> = T | void
}

export {}
