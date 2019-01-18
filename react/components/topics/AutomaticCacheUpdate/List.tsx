// This component queries a list from the database, then it renders a table
// with each row having a link to a details page

import React from 'react'
// withRuntimeContext provides us with the navigate function,
// necessary for creating links
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { Table } from 'vtex.styleguide'

// Here is an important part of Automatic Cache Update. For updating
// the cache we first need to query our list, with each element having
// a cacheId that will uniquely identify it in the local browser's cache
import listBooks from '../../../graphql/books.graphql'
import { Book } from '../../../typings/custom'
import SyncQueryData from '../../SyncQueryData'

// The schema used for generating the table
const tableSchema = {
  properties: {
    id: {
      title: 'ID',
      type: 'string',
    },
    name: {
      title: 'Name',
      type: 'string',
    },
  },
}

interface Row {
  rowData: {
    id: Book['id']
    name: Book['name']
  }
}

type Props = RenderContextProps & {
  // This is the link we need to send the user to when a row is clicked
  linkToPage: string
}

const List: React.SFC<Props> = ({ runtime, linkToPage }) => (
  <SyncQueryData query={listBooks} prop="books">
    {({ data: { books } }: { data: { books: Book[] } }) => (
      <Table
        schema={tableSchema}
        items={books.map(book => ({ id: book.id, name: book.name }))}
        density="low"
        onRowClick={({ rowData: { id } }: Row) =>
          runtime.navigate({
            page: linkToPage,
            params: {
              id,
            },
          })
        }
      />
    )}
  </SyncQueryData>
)

export default withRuntimeContext(List)
