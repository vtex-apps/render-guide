interface Args {
  id: string
}

export const source = (_: any, {id}: Args, {dataSources: {markdown}}: Context) => markdown.get(id)
