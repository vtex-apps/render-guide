import { Query } from '../../typedql/schema'

interface Args {
  from:Parameters<Query['books']>[0]
  to:Parameters<Query['books']>[1]
}

export const books = (_: any, args: Args, {dataSources: {database}}: Context) => database.books(args.from, args.to)
