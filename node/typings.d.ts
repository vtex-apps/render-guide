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
}

export {}
