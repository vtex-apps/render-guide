// This component queries a list from the database, then it renders a table
// with each row having a link to a details page

import React, { FunctionComponent } from 'react'
// withRuntimeContext provides us with the navigate function,
// necessary for creating links
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { Table } from 'vtex.styleguide'

// Here is an important part of Automatic Cache Update. For updating
// the cache we first need to query our list, with each element having
// a cacheId that will uniquely identify it in the local browser's cache
import { Book } from '../../typings/custom'

import { tableSchema } from './consts'
import { Row } from './typings'

interface CustomProps {
  isLoading: boolean
  items: Book[]
  topicPage: string
}

type Props = CustomProps & RenderContextProps

const BooksTable: FunctionComponent<Props> = ({
  isLoading,
  items,
  runtime,
  topicPage,
}) => (
  <Table
    density="low"
    fullWidth
    items={items.map((item: Book) => ({ id: item.id, name: item.name }))}
    loading={isLoading}
    onRowClick={({ rowData: { id: itemId } }: Row) => {
      runtime.navigate({
        page: 'guide.topic-details',
        params: {
          id: itemId,
          topic: topicPage,
        },
      })
    }}
    schema={tableSchema}
  />
)

export default withRuntimeContext(BooksTable)
