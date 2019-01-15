// This component is a delete button.

import React from 'react'
import { Mutation, MutationUpdaterFn } from 'react-apollo'
import { Button, Spinner } from 'vtex.styleguide'

import { CachedBookList, CachedTotal, Maybe } from '../../../../typings/custom'
import listQuery from '../../../graphql/books.graphql'
import deleteBookMutation from '../../../graphql/delete.graphql'
import totalQuery from '../../../graphql/total.graphql'

const onClickDelete = (id: string, deleteBook: any) => (e: Event) => {
  e.stopPropagation()

  deleteBook({
    variables: { id },
  })
}

const isValidIndex = <T extends unknown>(
  array: Maybe<T[]>,
  index: Maybe<number>,
) =>
  !!(
    Array.isArray(array) &&
    index != null &&
    -1 < index &&
    index < array.length
  )

// This function fires after the deletion mutation takes place.
// This mutation only deletes a single element. We need to remove
// the deleted element from the paginated list. To do so, we need to
// change the total number of elements and the book's array
const update = (id: string): MutationUpdaterFn<any> => (
  cache,
  { data: { delete: status } },
) => {
  // If the data is not present in the cache, the readQuery method will throw.
  // This happens when the user first visits this page and then go to the listing page
  try {
    if (!status) {
      return
    }

    // Here we read the number of elements of the listing
    const total = cache.readQuery<CachedTotal>({ query: totalQuery })

    // Here we read the list removing the element
    const list = cache.readQuery<CachedBookList>({ query: listQuery })
    const books = list && list.books
    const foundIndex = books && books.findIndex((x: any) => x.id === id)

    // Now we update both caches at once
    if (isValidIndex(books, foundIndex) && total != null) {
      books!.splice(foundIndex!, 1)
      cache.writeQuery({
        data: list,
        query: listQuery,
      })

      total.total -= 1
      cache.writeQuery({
        data: total,
        query: totalQuery,
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export const DeleteButton: React.SFC<{ id: string }> = ({ id }) => (
  <Mutation mutation={deleteBookMutation} update={update(id)}>
    {(deleteBook, { loading }) =>
      loading ? (
        <Spinner />
      ) : (
        <Button onClick={onClickDelete(id, deleteBook)}>Delete</Button>
      )
    }
  </Mutation>
)
