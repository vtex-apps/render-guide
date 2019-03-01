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
import listBooks from '../../../../graphql/books.graphql'
import { Book } from '../../../../typings/custom'
import SyncQueryData from '../../../SyncQueryData'

import { tableSchema } from './consts'
import { Row } from './typings'

interface CustomProps {
  // This is the link we need to send the user to when a row is clicked
  linkToPage: string
}

type Props = CustomProps & RenderContextProps

const List: React.SFC<Props> = ({ linkToPage, runtime }) => (
  <SyncQueryData query={listBooks} prop="books">
    {({ data: { books } }) => (
      <Table
        density="low"
        items={books.map((book: Book) => ({ id: book.id, name: book.name }))}
        onRowClick={({ rowData: { id } }: Row) => {
          runtime.navigate({
            page: linkToPage,
            params: {
              id,
            },
          })
        }}
        schema={tableSchema}
      />
    )}
  </SyncQueryData>
)

export default withRuntimeContext(List)
