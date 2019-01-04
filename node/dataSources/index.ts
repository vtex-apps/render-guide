import { BookDataSource } from './bookDataSource'
import { MardownDataSource } from './markdownDataSource'

export const dataSources = (): DataSources => ({
  database: new BookDataSource(),
  markdown: new MardownDataSource(),
})
