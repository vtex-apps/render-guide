interface Args {
  from: number
  to: number
}

export const books = (_: any, {from, to}: Args, {dataSources: {database}}: Context) => database.books(from, to)
