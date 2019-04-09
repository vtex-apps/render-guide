import { forExternal, IODataSource } from '@vtex/api'

import mock from './mock'

export class MarkdownClient extends IODataSource {
  protected httpClientFactory = forExternal
  protected service = 'http://example.com'

  private db = mock

  public get = (id: string) => this.db[id]
}
