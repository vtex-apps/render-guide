import { Mutation } from '../../typedql/schema'

interface Args {
  id: Parameters<Mutation['delete']>[0],
}

export const deleteBook = (_: any, {id}: Args, {dataSources: {database}}: Context) => database.delete(id)
