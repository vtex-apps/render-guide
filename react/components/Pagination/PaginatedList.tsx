// This component is the base for pagination to work. It starts
// by quering the total number of elements, then queries for
// some of the elements. It then renders the pagination
// controller that will take care of fetching more whenever
// it thinks it's necessary. To understand more about fetchMore,
// please refer to the Apollo Docs!

import React, { FunctionComponent } from 'react'
import { Query } from 'react-apollo'

import listBooks from '../../graphql/books.graphql'
import totalElements from '../../graphql/total.graphql'
import SyncQueryData from '../SyncQueryData'

import PaginationController from './PaginationController'

interface Props {
  // Link to the page of adding new entry in the database
  newPage?: string
  topicPage: string
}

const PaginatedList: FunctionComponent<Props> = ({ newPage, topicPage }) => (
  <SyncQueryData prop="total" query={totalElements}>
    {({ data: { total } }) => (
      <Query query={listBooks} notifyOnNetworkStatusChange>
        {({ data: { books }, fetchMore, loading }) => (
          <PaginationController
            books={books}
            fetchMore={fetchMore}
            loading={loading}
            newPage={newPage}
            topicPage={topicPage}
            total={total}
          />
        )}
      </Query>
    )}
  </SyncQueryData>
)

export default PaginatedList
