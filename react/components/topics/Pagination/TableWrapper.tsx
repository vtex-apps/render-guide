// This component is just a wrapper for Styleguide's table
import React from 'react'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { Table } from 'vtex.styleguide'

import { Book } from '../../../typings/custom'

import { tableSchema } from './consts'
import { Row } from './typings'

interface CustomProps {
  books: Book[]
  elementsPerPage: number
  from: number
  loading: boolean
  newPage: string
  next: () => void
  previous: () => void
  shouldEnableCreation?: boolean
  to: number
  topicPage: string
  total: number
}

type Props = CustomProps & RenderContextProps

const TableWrapper: React.SFC<Props> = ({
  books,
  elementsPerPage,
  from,
  loading,
  newPage,
  next,
  previous,
  runtime,
  shouldEnableCreation,
  to,
  topicPage,
  total,
}) => (
  <Table
    density="low"
    emptyStateLabel="Nothing to show"
    fixFirstColumn
    fullWidth
    items={books}
    loading={loading}
    onRowClick={({ rowData: { id } }: Row) => {
      runtime.navigate({
        page: 'guide.topic-details',
        params: {
          id,
          topic: topicPage,
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
    toolbar={
      shouldEnableCreation
        ? {
            newLine: {
              handleCallback: () => runtime.navigate({ page: newPage }),
              label: 'New',
            },
          }
        : undefined
    }
  />
)

export default withRuntimeContext(TableWrapper)
