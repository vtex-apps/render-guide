import { DataSource } from 'apollo-datasource'
import { find, findIndex, propEq } from 'ramda'
import { Book, BookInput, ID, Int } from '../../typedql/schema'

const mock = [
  {'id': '0', 'name': 'Default Book 1', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '1', 'name': 'Default Book 2', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '2', 'name': 'Default Book 3', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '3', 'name': 'Default Book 4', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '4', 'name': 'Default Book 5', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '10', 'name': 'Default Book 1', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '11', 'name': 'Default Book 2', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '12', 'name': 'Default Book 3', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '13', 'name': 'Default Book 4', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '14', 'name': 'Default Book 5', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '20', 'name': 'Default Book 1', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '21', 'name': 'Default Book 2', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '22', 'name': 'Default Book 3', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '23', 'name': 'Default Book 4', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '24', 'name': 'Default Book 5', 'authors': ['Default Author 1',  'Default Author 2']},
] as Book[]

export class BookDataSource extends DataSource<Context> {
  private db = mock

  constructor() {
    super()
  }

  public book = (id: ID) => find(propEq('id', id), this.db)

  public books = (from = 0, to = 4) => this.db.slice(Math.max(from, 0), Math.min(to, this.db.length))

  public total = (): Int => this.db.length

  public editBook = (id: ID, book: BookInput): Book | null => {
    const foundIndex = findIndex(propEq('id', id), this.db)
    if (0 <= foundIndex && foundIndex < this.db.length) {
      const foundBook = this.db[foundIndex]
      this.db[foundIndex] = {...foundBook, ...book}
      return this.db[foundIndex]
    }
    return null
  }

  public newBook = (book: BookInput): Book => {
    const newBook = {
      ...book,
      id: this.db.length.toString(),
    } as Book
    this.db.unshift(newBook)
    return newBook
  }

  public delete = (id: ID): boolean => {
    const foundIndex = findIndex(propEq('id', id), this.db)
    if (0 <= foundIndex && foundIndex < this.db.length) {
      this.db.splice(foundIndex, 1)
      return true
    }
    return false
  }
}
