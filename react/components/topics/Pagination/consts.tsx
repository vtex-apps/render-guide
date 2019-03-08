import React from 'react'

import DeleteButton from './DeleteButton'
import { Row } from './typings'

export const tableSchema = {
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
