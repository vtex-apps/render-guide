import { DataSources } from '../typings'
import bookDataSource from './book'
import markdownDataSource from './markdown'

const dataSources = (): DataSources => ({
  database: bookDataSource,
  markdown: markdownDataSource,
})

export default dataSources
