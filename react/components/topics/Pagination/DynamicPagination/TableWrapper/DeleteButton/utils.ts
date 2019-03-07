import { MutationFn, MutationUpdaterFn } from 'react-apollo'

import { CachedBookList, CachedTotal } from '../../../../../../typings/custom'
import listQuery from '../../../../../graphql/books.graphql'
import totalQuery from '../../../../../graphql/total.graphql'

export const isValidIndex = <T>(array: T[], index: number) =>
  Array.isArray(array) && index > -1

export const onClickDelete = (id: string, deleteBook: MutationFn) => (
  e: Event
) => {
  e.stopPropagation()

  deleteBook({
    variables: { id },
  })
}

// This function fires after the deletion mutation takes place.
// This mutation only deletes a single element. We need to remove
// the deleted element from the paginated list. To do so, we need to
// change the total number of elements and the book's array
export const update = (id: string): MutationUpdaterFn<any> => (
  cache,
  { data: { delete: status } }
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
    const foundIndex = books && books.findIndex(x => x.id === id)

    // Now we update both caches at once
    if (
      books &&
      foundIndex &&
      isValidIndex(books, foundIndex) &&
      total != null
    ) {
      const updatedBooks = [
        ...books.slice(0, foundIndex),
        ...books.slice(foundIndex + 1),
      ]

      cache.writeQuery({
        data: {
          ...list,
          books: updatedBooks,
        },
        query: listQuery,
      })

      cache.writeQuery({
        data: {
          ...total,
          total: total.total - 1,
        },
        query: totalQuery,
      })
    }
  } catch (err) {
    console.log(err)
  }
}
