import React, { Fragment } from 'react'

import booksQuery from '../../../../graphql/books.graphql'
import { Book } from '../../../../typings/custom'
import DetailsEditor from '../../../DetailsEditor'
import MarkdownBlock from '../../../MarkdownBlock'
import SyncQueryData from '../../../SyncQueryData'
import PaginatedList from '../PaginatedList'

interface Props {
  id?: string
}

const StaticPagination: React.SFC<Props> = ({ id }) => {
  const topicPage = 'static-pagination'

  return (
    <Fragment>
      <MarkdownBlock source="static-pagination/before" />
      <SyncQueryData prop="books" query={booksQuery}>
        {({ data: { books }, loading }) =>
          id ? (
            <DetailsEditor
              book={books.find((book: Book) => book.id === id)}
              isLoading={loading}
              topicPage={topicPage}
            />
          ) : (
            <PaginatedList topicPage={topicPage} />
          )
        }
      </SyncQueryData>
      <MarkdownBlock source="static-pagination/after" />
    </Fragment>
  )
}

export default StaticPagination
