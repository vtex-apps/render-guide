import { MutationUpdaterFn } from 'apollo-client'

import listQuery from '../../../../graphql/books.graphql'
import totalQuery from '../../../../graphql/total.graphql'
import { CachedBookList, CachedTotal } from '../../../../typings/custom'

export const updateCache: MutationUpdaterFn = (cache, { data }) => {
  // If the data is not present in the cache, the readQuery method will throw.
  // This happens when the user first visits this page and then go to the listing page
  try {
    const { newBook } = data || { newBook: undefined }
    // Here we read the number of elements of the listing
    const totalData = cache.readQuery<CachedTotal>({ query: totalQuery })

    const total = totalData && totalData.total

    // Here we read the list with the new element
    const list = cache.readQuery<CachedBookList>({ query: listQuery })

    const books = list && list.books

    // Now we update both queries at the same time
    if (total && books) {
      const updatedBooks = [newBook, ...books]

      cache.writeQuery<CachedBookList>({
        data: {
          ...list,
          books: updatedBooks,
        },
        query: listQuery,
      })

      cache.writeQuery<CachedTotal>({
        data: {
          ...totalData,
          total: total + 1,
        },
        query: totalQuery,
      })
    }
  } catch (err) {
    console.log('No cache found.')
  }
}
