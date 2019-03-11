import React from 'react'

import booksQuery from '../../../graphql/books.graphql'
import { Book } from '../../../typings/custom'
import DetailsEditor from '../../DetailsEditor'
import SyncQueryData from '../../SyncQueryData'

import PaginatedList from './PaginatedList'

interface Props {
  id?: string
  newPage?: string
  type: 'dynamic' | 'static'
}

const Pagination: React.SFC<Props> = ({ id, newPage, type }) => {
  const topicPage = `${type}-pagination`

  return (
    <SyncQueryData prop="books" query={booksQuery}>
      {({ data: { books }, loading }) =>
        id ? (
          <DetailsEditor
            book={books.find((book: Book) => book.id === id)}
            isLoading={loading}
            topicPage={topicPage}
          />
        ) : (
          <PaginatedList newPage={newPage} topicPage={topicPage} />
        )
      }
    </SyncQueryData>
  )
}

export default Pagination
