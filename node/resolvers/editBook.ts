import { BookInput, Context } from '../typings'

interface EditBookArg {
  id: string
  book: BookInput
}

export const editBook = (
  _: any,
  { id, book }: EditBookArg,
  { dataSources: { database } }: Context
) => database.editBook(id, book)
