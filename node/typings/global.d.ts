import { ServiceContext } from '@vtex/api'

import BookDataSource from '../dataSources/book'
import MarkdownDataSource from '../dataSources/markdown'

declare global {
  interface DataSources {
    database: BookDataSource
    markdown: MarkdownDataSource
  }

  interface Context extends ServiceContext {
    dataSources: DataSources
  }
}
