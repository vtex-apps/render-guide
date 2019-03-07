import React, { Fragment } from 'react'
import { Spinner } from 'vtex.styleguide'

import listBooks from '../../../graphql/books.graphql'
import { Book } from '../../../typings/custom'
import DetailEditor from '../../DetailEditor'
import MarkdownBlock from '../../MarkdownBlock'
import SyncQueryData from '../../SyncQueryData'

import BooksTable from './BooksTable'

interface Props {
  id?: string
}

const AutomaticCacheUpdates: React.SFC<Props> = ({ id }) => (
  <Fragment>
    <MarkdownBlock source="automatic-cache-updates/before" />
    <SyncQueryData query={listBooks} prop="books">
      {({ data: { books }, loading }) =>
        loading ? (
          <Spinner />
        ) : id ? (
          <DetailEditor book={books.find((book: Book) => book.id === id)} />
        ) : (
          <BooksTable items={books} />
        )
      }
    </SyncQueryData>
    <MarkdownBlock source="automatic-cache-updates/after" />
  </Fragment>
)

export default AutomaticCacheUpdates
