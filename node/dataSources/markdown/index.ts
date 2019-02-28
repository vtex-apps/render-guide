import { DataSource } from 'apollo-datasource'

import mock from './mock'

class MarkdownDataSource extends DataSource {
  private db = mock

  public get = (id: string) => this.db[id]
}

export default new MarkdownDataSource()
