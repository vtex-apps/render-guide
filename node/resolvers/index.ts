import { prop } from 'ramda'

import { book } from './book'
import { books } from './books'
import { editBook } from './editBook'

export const resolvers = {
  Book: {
    cacheId: prop('id'),
  },
  Mutation: {
    editBook,
  },
  Query: {
    book,
    books,
  },
}
