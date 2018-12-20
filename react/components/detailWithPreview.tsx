import ApolloClient from 'apollo-client'
import React from 'react'
import { Query } from 'react-apollo'
import { buildCacheLocator } from 'render'
import { Spinner } from 'vtex.styleguide'

import bookById from '../graphql/book.graphql'
import bookPreview from '../graphql/bookPreview.graphql'
import { Book } from '../interfaces'
import { BookDetailEditor } from './detailEditor'
import { DetailEditorPreview } from './detailEditorPreview'

interface Props {
  params: {
    id: string
  }
}

const readFromApolloCache = (client: ApolloClient<any>, id: string) => client.readFragment<Book>({
  fragment: bookPreview,
  id: buildCacheLocator('vtex.catalogue@0.x', 'Book', id),
})

interface PreviewProps {
  book: Partial<Book> | null
}

const Preview: React.SFC<PreviewProps> = ({book}) => (
  <div>
    {book && <DetailEditorPreview book={book} />}
    <Spinner />
  </div>
)

const idFromProps = (params: Props['params']) => params && params.id

export const DetailWithPreview: React.SFC<Props> = ({params}) => (
  <Query query={bookById} variables={{id: idFromProps(params)}}>
    {({loading, data, client}) => loading
      ? <Preview book={readFromApolloCache(client, idFromProps(params))} />
      : data && data.book
        ? <BookDetailEditor book={data.book} />
        : null
    }
  </Query>
)
