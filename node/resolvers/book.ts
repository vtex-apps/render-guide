export const book = (_: any, {id}: {id: string}, {dataSources: {database}}: Context) => database.book(id)
