// This component queries the detail data in a sync fashion.
// It wait untill all of the data is loaded, and then renders
// the detail editor

import React from 'react'

import DetailEditor from '../../DetailEditor'
import SyncQueryData from '../../SyncQueryData'

import bookQuery from './graphql/book.graphql'

interface Props {
  itemId: string
}

const Entrypoint: React.SFC<Props> = ({ itemId: id }) => (
  <SyncQueryData query={bookQuery} variables={{ id }} prop="book">
    {({ data: { book } }: any) => <DetailEditor book={book} />}
  </SyncQueryData>
)

export default Entrypoint
