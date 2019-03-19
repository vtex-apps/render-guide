// This component renders the detail editor with partial data available
// in apollo cache.
import React, { FunctionComponent } from 'react'
import { Query } from 'react-apollo'

import bookQuery from '../../../graphql/book.graphql'
import DetailsEditor from '../../DetailsEditor'

import { readFromApolloCache } from './utils'

interface Props {
  id: string
}

// Queries the data for the full book. While the result is loadig, a read from
// apollo cache takes place and this fragment is used for the detail editor
const BookDetailsEditor: FunctionComponent<Props> = ({ id }) => (
  <Query query={bookQuery} variables={{ id }}>
    {({ client, data, loading }) => (
      <DetailsEditor
        book={loading ? readFromApolloCache(client, id) : data.book}
        isLoading={loading}
        topicPage="preview-with-cached-data"
      />
    )}
  </Query>
)

export default BookDetailsEditor
