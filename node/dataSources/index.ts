import { BookDataSource } from './bookDataSource'

export const dataSources = (): DataSources => ({
  database: new BookDataSource(),
})
