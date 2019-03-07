interface Args {
  id: string
}

export const deleteBook = (
  _: any,
  { id }: Args,
  { dataSources: { database } }: Context
) => database.delete(id)
