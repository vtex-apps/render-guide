// This component renders the detail editor with partial data available
// in apollo cache.
import ApolloClient from 'apollo-client'
import React from 'react'
import { Query } from 'react-apollo'
import { buildCacheLocator } from 'render'

import { Book } from '../../../typings/custom'
import DetailEditor from '../../DetailEditor'

import bookById from './graphql/book.graphql'
import bookPreview from './graphql/bookPreview.graphql'

interface Props {
  itemId: string
}

// This function reads from apollo client a fragment of a book. Note that we
// use buildCacheLocator function imported from render.
const readFromApolloCache = (client: ApolloClient<any>, id: string) => client.readFragment<Book>({
  fragment: bookPreview,
  id: buildCacheLocator('vtex.renderguide@0.x', 'Book', id),
})

// Queries the data for the full book. While the result is loadig, a read from
// apollo cache takes place and this fragment is used for the detail editor
const Entrypoint: React.SFC<Props> = ({itemId: id}) => (
  <Query query={bookById} variables={{id}}>
    {({loading, data, client}) =>
      <DetailEditor
        book={loading ? readFromApolloCache(client, id) : data.book}
        loading={loading}
      />
    }
  </Query>
)

export default Entrypoint
