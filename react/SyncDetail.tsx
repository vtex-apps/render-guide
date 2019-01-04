// This component queries the detail data in a sync fashion.
// It wait untill all of the data is loaded, and then renders
// the detail editor
import React from 'react'

import { DetailEditor } from './components/detailEditor'
import { WithSyncQueryData } from './components/withSyncQueryData'
import bookQuery from './graphql/book.graphql'


interface Props {
  itemId: string
}

const Entrypoint: React.SFC<Props> = ({itemId: id}) => (
  <WithSyncQueryData query={bookQuery} variables={{id}} prop="book">
  {({data: {book}}: any) => <DetailEditor book={book}/>}
  </WithSyncQueryData>
)

export default Entrypoint
