import React from 'react'

import DeleteButton from './DeleteButton'
import { Row } from './typings'

export const tableSchema = {
  properties: {
    id: {
      title: 'ID',
      type: 'string',
    },
    name: {
      title: 'Name',
      type: 'string',
    },
    /* tslint:disable-next-line */
    delete: {
      cellRenderer: ({ rowData: { id } }: Row) => <DeleteButton id={id} />,
      title: 'Actions',
      type: 'object',
    },
  },
}
