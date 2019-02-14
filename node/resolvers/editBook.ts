import { Mutation } from './../../typedql/schema'
interface EditBookArgs {
  id: Parameters<Mutation['editBook']>[0],
  book: Parameters<Mutation['editBook']>[1]
}

export const editBook = (_: any, {id, book}: EditBookArgs, {dataSources: {database}}: Context) =>
  database.editBook(id, book)
