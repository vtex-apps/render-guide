/** @graphql Int */
export type Int = number

/** @graphql ID */
export type ID = string

export interface Book {
  id: ID
  cacheId: ID
  name?: string
  authors?: string[]
}

/** @graphql input */
export interface BookInput {
  name?: string
  authors?: string[]
}

export interface Query {
  /**
   * @graphql Directives
   * @cacheControl (scope:PUBLIC, maxAge: SHORT)
   */
  books(from?:Int, to?:Int): Book[]
  book(id: ID): Book | null
  total?: Int
  /**
   * @graphql Description
   * Returns a markdown source given an id
   */
  source(id: ID): String | null
}

export interface Mutation {
  editBook(id: ID, book: BookInput): Book | null
  newBook(book: BookInput): Book | null
  delete(id: string): Boolean | null
}
