// This component is just a wrapper for Styleguide's table
import React from 'react'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { Table } from 'vtex.styleguide'

import { Book } from '../../../../../typings/custom'
import DeleteButton from '../DeleteButton'

import { Row } from './typings'

const tableSchema = {
  delete: {
    cellRenderer: ({ rowData: { id } }: Row) => <DeleteButton id={id} />,
    title: 'Delete',
    type: 'object',
  },
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

interface CustomProps {
  books: Book[]
  elementsPerPage: number
  from: number
  linkToPage: string
  newPage: string
  next: () => void
  previous: () => void
  to: number
  total: number
}

type Props = CustomProps & RenderContextProps

const PaginatedList: React.SFC<Props> = ({
  books,
  elementsPerPage,
  from,
  linkToPage,
  newPage,
  next,
  previous,
  runtime,
  to,
  total,
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
    toolbar={{
      newLine: {
        handleCallback: () => runtime.navigate({ page: newPage }),
        label: 'New',
      },
    }}
  />
)

export default withRuntimeContext(PaginatedList)
