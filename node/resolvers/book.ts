import { Query } from '../../typedql/schema'

interface Args {
  id:Parameters<Query['book']>[0]
}

export const book = (_: any, {id}: Args, {dataSources: {database}}: Context) => database.book(id)
