// This component is just a wrapper for Styleguide's table
import React from 'react'
import { RenderContextProps, withRuntimeContext } from 'render'
import { Table } from 'vtex.styleguide'

import { Book } from '../../../../typings/custom'

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

type Props = RenderContextProps & {
  linkToPage: string
  total: number
  books: Book[]
  elementsPerPage: number
  from: number
  to: number
  next: () => void
  previous: () => void
}

interface Row {
  rowData: {
    id: Book['id'];
    name: Book['name'];
  }
}

const PaginatedList: React.SFC<Props> = ({
  books,
  from,
  to,
  next,
  previous,
  elementsPerPage,
  total,
  linkToPage,
  runtime,
}) => (
  <Table
    emptyStateLabel={'Nothing to show'}
    schema={tableSchema}
    items={books}
    fixFirstColumn
    density="low"
    onRowClick={({ rowData: { id } }: Row) =>
      runtime.navigate({
        page: linkToPage,
        params: {
          id,
          view: 'detail',
        },
      })
    }
    pagination={{
      currentItemFrom: from,
      currentItemTo: to,
      onNextClick: () => next(),
      onPrevClick: () => previous(),
      onRowsChange: (e: any) => console.log(e),
      rowsOptions: [elementsPerPage],
      textOf: 'of',
      textShowRows: 'Show rows',
      totalItems: total,
    }}
  />
)

export default withRuntimeContext(PaginatedList)
