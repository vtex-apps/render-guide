import { Query } from '../../typedql/schema'

interface Args {
  id:Parameters<Query['source']>[0]
}

export const source = (_: any, {id}:Args, {dataSources: {markdown}}: Context) => {
  return markdown.get(id)
}
