import React from 'react'
import { Query } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'

import book from '../graphql/book.graphql'
import { BookDetailEditor } from './detailEditor'

interface Props {
  params: {
    id: string
  }
}

export const Detail: React.SFC<Props> = (props: Props) => (
  <Query query={book} variables={{id: props && props.params && props.params.id}}>
    {({loading, data}) => loading
      ? <Spinner />
      : data && data.book
        ? <BookDetailEditor book={data.book} />
        : null
    }
  </Query>
)
