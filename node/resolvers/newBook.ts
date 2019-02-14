import { Mutation } from './../../typedql/schema'
interface Args {
  book: Parameters<Mutation['newBook']>[0],
}

export const newBook = (_: any, {book}: Args, {dataSources: {database}}: Context) => database.newBook(book)
