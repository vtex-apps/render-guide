import { DataSource } from 'apollo-datasource'
import { find, findIndex, propEq } from 'ramda'

const mock = [
  {'id': '0', 'name': 'Default Book 1', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '1', 'name': 'Default Book 2', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '2', 'name': 'Default Book 3', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '3', 'name': 'Default Book 4', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '4', 'name': 'Default Book 5', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '5', 'name': 'Default Book 6', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '6', 'name': 'Default Book 7', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '7', 'name': 'Default Book 8', 'authors': ['Default Author 1',  'Default Author 2']},
]

export class BookDataSource extends DataSource<Context> {
  private db = mock

  constructor() {
    super()
  }

  public book = (id: string) => find(propEq('id', id), this.db)

  public books = ({from, to}: {from: number, to: number}) => this.db.slice(Math.max(from, 0), Math.min(to, this.db.length))

  public total = () => this.db.length

  public editBook = (id: string, book: BookInput): Maybe<Book> => {
    const foundIndex = findIndex(propEq('id', id), this.db)
    if (0 <= foundIndex && foundIndex < this.db.length) {
      const foundBook = this.db[foundIndex]
      this.db[foundIndex] = {...foundBook, ...book}
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
