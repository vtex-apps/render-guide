// This component is just a wrapper for Styleguide's table
import React from 'react'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { Table } from 'vtex.styleguide'

import { Book } from '../../../../../typings/custom'

import { tableSchema } from './consts'
import { Row } from './typings'

interface CustomProps {
  books: Book[]
  elementsPerPage: number
  from: number
  newPage: string
  next: () => void
  previous: () => void
  to: number
  total: number
}

type Props = CustomProps & RenderContextProps

const TableWrapper: React.SFC<Props> = ({
  books,
  elementsPerPage,
  from,
  newPage,
  next,
  previous,
  runtime,
  to,
  total,
}) => (
  <Table
    density="low"
    emptyStateLabel="Nothing to show"
    fixFirstColumn
    items={books}
    onRowClick={({ rowData: { id } }: Row) => {
      runtime.navigate({
        page: 'guide.topic-details',
        params: {
          id,
          topic: 'dynamic-pagination',
        },
      })
    }}
    pagination={{
      currentItemFrom: from,
      currentItemTo: to,
      onNextClick: next,
      onPrevClick: previous,
      onRowsChange: (e: Event) => {
        console.log(e)
      },
      rowsOptions: [elementsPerPage],
      textOf: 'of',
      textShowRows: 'Show rows',
      totalItems: total,
    }}
    schema={tableSchema}
    toolbar={{
      newLine: {
        handleCallback: () => runtime.navigate({ page: newPage }),
        label: 'New',
      },
    }}
  />
)

export default withRuntimeContext(TableWrapper)
