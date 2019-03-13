import ApolloClient from 'apollo-client'
import { buildCacheLocator } from 'vtex.render-runtime'

import bookPreview from '../../../graphql/bookPreview.graphql'
import { Book } from '../../../typings/custom'

// This function reads from apollo client a fragment of a book. Note that we
// use buildCacheLocator function imported from render.
export const readFromApolloCache = (client: ApolloClient<any>, id: string) =>
  client.readFragment<Book>({
    fragment: bookPreview,
    id: buildCacheLocator('vtex.renderguide@0.x', 'Book', id),
  })
