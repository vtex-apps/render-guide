import React, { Fragment, FunctionComponent } from 'react'

import listBooks from '../../../graphql/books.graphql'
import BooksTable from '../../BooksTable'
import MarkdownBlock from '../../MarkdownBlock'
import SyncQueryData from '../../SyncQueryData'

import BookDetailsEditor from './BookDetailsEditor'

interface Props {
  id?: string
}

const PreviewWithCachedData: FunctionComponent<Props> = ({ id }) => (
  <Fragment>
    <MarkdownBlock source="preview-with-cached-data/before" />
    {id ? (
      <BookDetailsEditor id={id} />
    ) : (
      <SyncQueryData query={listBooks} prop="books">
        {({ data: { books }, loading }) => (
          <BooksTable
            isLoading={loading}
            items={books}
            topicPage="preview-with-cached-data"
          />
        )}
      </SyncQueryData>
    )}
    <MarkdownBlock source="preview-with-cached-data/after" />
  </Fragment>
)

export default PreviewWithCachedData
