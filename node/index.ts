import mock_data from './mock.json'

interface Book {
  id: string
  name: string
  authors: string[]
}

interface PageInfo {
  cursor: number;
  hasNextPage: boolean;
}

interface BookListwithPageInfo {
  content: Book[];
  pageinfo: PageInfo;
}

class BookDatabase {
  private idCounter = 0
  private books: Array<Book> = []

  constructor() {
    this.books = mock_data;
    this.idCounter = Math.max(...Array.from(this.books, (book) => Number(book.id)));
  }

  private newID(): string {
    return (++this.idCounter).toString()
  }

  public get(cursor: number, numberOfEntries: number): BookListwithPageInfo {
    let hasNextPage: boolean = true;
    const maxCursor: number = this.books.length - 1;
    if (cursor > maxCursor) {
      cursor = maxCursor - numberOfEntries;
    }
    if (cursor < 0) {
      cursor = 0;
    }
    let endCursor: number = cursor + numberOfEntries;
    if (endCursor >= maxCursor) {
      hasNextPage = false;
    }
    return {
      content: this.books.slice(cursor, endCursor),
      pageinfo: {
        cursor: cursor,
        hasNextPage: hasNextPage,
      }
    }
  }

  public getById(id: string): Book {
    return this.books.find((book) => book.id === id)
  }

  public delete(id: string): string {
    const index = this.books.findIndex((book) => book.id === id)

    if (index != -1) {
      this.books.splice(index, 1)
      return id
    }
    return id
  }

  public add({authors, name}) {
    const book: Book = {
      name,
      authors,
      id: this.newID(),
    }
    this.books.push(book)
    return book
  }
}

const mock = new BookDatabase()

const resolvers = {
  Query: {
    books: (_, {cursor, numberOfEntries}) => mock.get(cursor, numberOfEntries),
    book: (_, {id}) => mock.getById(id),
  },
  Mutation: {
    deleteBook: (_, {id}) => mock.delete(id),
    createBook: (_, {data}) => mock.add(data)
  }
}

export default {
  graphql: { resolvers }
}
