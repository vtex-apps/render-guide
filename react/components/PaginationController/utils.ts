import { Book } from '../../typings/custom'

export const updateQuery = (
  previous: { books: Book[] },
  { fetchMoreResult }: { fetchMoreResult: { books: Book[] } }
) => ({
  ...previous,
  books:
    fetchMoreResult && Array.isArray(fetchMoreResult.books)
      ? [...previous.books, ...fetchMoreResult.books]
      : previous.books,
})
