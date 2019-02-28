import { Context } from '../typings'

export const total = (
  _: any,
  __: any,
  { dataSources: { database } }: Context
) => database.total()
