// This component renders the detail editor with partial data available
// in apollo cache.
import React from 'react'
import { Query } from 'react-apollo'

import bookQuery from '../../../graphql/book.graphql'
import DetailEditor from '../../DetailEditor'

import { readFromApolloCache } from './utils'

interface Props {
  itemId: string
}

// Queries the data for the full book. While the result is loadig, a read from
// apollo cache takes place and this fragment is used for the detail editor
const PreviewWithCachedData: React.SFC<Props> = ({ itemId }) => (
  <Query query={bookQuery} variables={{ id: itemId }}>
    {({ client, data, loading }) => (
      <DetailEditor
        book={loading ? readFromApolloCache(client, itemId) : data.book}
        loading={loading}
      />
    )}
  </Query>
)

export default PreviewWithCachedData
