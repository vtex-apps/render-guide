import { Context } from '../typings'

interface Args {
  from: number
  to: number
}

export const books = (
  _: any,
  args: Args,
  { dataSources: { database } }: Context
) => database.books(args)
