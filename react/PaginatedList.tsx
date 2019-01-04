// This component is the base for pagination to work. It starts
// by quering the total number of elements, then queries for
// some of the elements. It then renders the pagination
// controller that will take care of fetching more whenever
// it thinks it's necessary. To understand more about fetchMore,
// please refer to the Apollo Docs !
import React from 'react'
import { Query } from 'react-apollo'

import { PaginationController } from './components/paginationController'
import { WithSyncQueryData } from './components/withSyncQueryData'
import listBooks from './graphql/books.graphql'
import totalElements from './graphql/total.graphql'

interface Props {
  // Link to page when a row is clicked
  linkToPage: string
  // Link to the page of adding new entry in the database
  newPage?: string
}

const Entrypoint: React.SFC<Props> = (props) => (
  <WithSyncQueryData query={totalElements} prop="total">
  {({data: {total}}: any) =>
    <Query query={listBooks} notifyOnNetworkStatusChange={true}>
    {({data: {books}, fetchMore, loading}) =>
      <PaginationController
        fetchMore={fetchMore}
        books={books}
        total={total}
        loading={loading}
        {...props}
      />
    }
    </Query>
  }
  </WithSyncQueryData>
)

export default Entrypoint
