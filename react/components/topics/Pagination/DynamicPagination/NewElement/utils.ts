import { MutationUpdaterFn } from 'apollo-client'
import { RenderContextProps } from 'vtex.render-runtime'

import { CachedBookList, CachedTotal } from '../../../../../typings/custom'
import listQuery from '../../../graphql/books.graphql'
import totalQuery from '../../../graphql/total.graphql'

export const updateCache = (props: RenderContextProps): MutationUpdaterFn => (
  cache,
  { data: { newBook } }
) => {
  // If the data is not present in the cache, the readQuery method will throw.
  // This happens when the user first visits this page and then go to the listing page
  try {
    // Here we read the number of elements of the listing
    const total = cache.readQuery<CachedTotal>({ query: totalQuery })

    // Here we read the list with the new element
    const list = cache.readQuery<CachedBookList>({ query: listQuery })

    const books = list && list.books

    // Now we update both queries at the same time
    if (total != null && Array.isArray(books)) {
      books.unshift(newBook)

      cache.writeQuery({
        data: list,
        query: listQuery,
      })

      total.total += 1
      cache.writeQuery({
        data: total,
        query: totalQuery,
      })

      // We end up by navigating back to the list if sucess
      props.runtime.navigate({ page: 'guide.dynamic-pagination-list' })
    }
  } catch (err) {
    console.log(err)
  }
}
