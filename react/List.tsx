import React from 'react'
import { Query } from 'react-apollo'
import { withRuntimeContext } from 'render'
import { Spinner, Table } from 'vtex.styleguide'

import listBooks from './graphql/books.graphql'
import { Book } from './interfaces'

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

interface Props {
  books: Book[]
  runtime: {
    navigate: ({ page, params }: { page: string; params: any }) => void;
  }
  linkToPage: string
}

interface Row {
  rowData: {
    id: Book['id'];
    name: Book['name'];
  }
}

const BookListComponent: React.SFC<any> = withRuntimeContext(({ books, runtime, linkToPage }: Props) => (
  <Table
    schema={tableSchema}
    items={books.map(book => ({ id: book.id, name: book.name }))}
    density="low"
    onRowClick={({ rowData: { id } }: Row) =>
      runtime.navigate({
        page: linkToPage,
        params: { id },
      })
    }
  />
))

interface ListProps {
  linkToPage: string
}

const List: React.SFC<ListProps> = (props) => (
  <Query query={listBooks}>
    {({loading, data}) => loading
      ? <Spinner />
      : data && Array.isArray(data.books)
        ? <BookListComponent books={data.books} {...props}/>
        : null
    }
  </Query>
)

export default List
