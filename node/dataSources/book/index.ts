import { DataSource } from 'apollo-datasource'
import { find, findIndex, propEq } from 'ramda'

import { Book, BookInput, Context, Maybe } from '../../typings'

import mock from './mock'

class BookDataSource extends DataSource<Context> {
  private db = mock

  public book = (id: string) => find(propEq('id', id), this.db)

  public books = ({ from, to }: { from: number; to: number }) =>
    this.db.slice(Math.max(from, 0), Math.min(to, this.db.length))

  public total = () => this.db.length

  public editBook = (id: string, book: BookInput): Maybe<Book> => {
    const foundIndex = findIndex(propEq('id', id), this.db)
    if (0 <= foundIndex && foundIndex < this.db.length) {
      const foundBook = this.db[foundIndex]
      this.db[foundIndex] = { ...foundBook, ...book }
      return this.db[foundIndex]
    }
  }

  public newBook = (book: BookInput): Book => {
    const newBook = {
      ...book,
      id: this.db.length.toString(),
    }
    this.db.unshift(newBook)
    return newBook
  }

  public delete = (id: string) => {
    const foundIndex = findIndex(propEq('id', id), this.db)
    if (0 <= foundIndex && foundIndex < this.db.length) {
      this.db.splice(foundIndex, 1)
      return true
    }
    return false
  }
}

export default new BookDataSource()
