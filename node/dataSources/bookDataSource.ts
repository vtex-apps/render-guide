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
  {'id': '8', 'name': 'Default Book 9', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '9', 'name': 'Default Book 10', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '10', 'name': 'Default Book 11', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '11', 'name': 'Default Book 12', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '12', 'name': 'Default Book 13', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '13', 'name': 'Default Book 14', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '14', 'name': 'Default Book 15', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '15', 'name': 'Default Book 16', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '16', 'name': 'Default Book 17', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '17', 'name': 'Default Book 18', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '18', 'name': 'Default Book 19', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '19', 'name': 'Default Book 20', 'authors': ['Default Author 1',  'Default Author 2']},
  {'id': '20', 'name': 'Default Book 21', 'authors': ['Default Author 1',  'Default Author 2']},
]

export class BookDataSource extends DataSource<Context> {
  private db = mock

  constructor() {
    super()
  }

  public book = (id: string) => find(propEq('id', id), this.db)

  public books = (from: number, to: number) => this.db.slice(Math.min(from, this.db.length-1), Math.min(to, this.db.length-1))

  public editBook = (id: string, book: BookInput): Maybe<Book> => {
    const foundIndex = findIndex(propEq('id', id), this.db)
    if (0 <= foundIndex && foundIndex < this.db.length) {
      const foundBook = this.db[foundIndex]
      this.db[foundIndex] = {...foundBook, ...book}
      return this.db[foundIndex]
    }
  }
}
