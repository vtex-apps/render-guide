import { prop } from 'ramda'

import { book } from './book'
import { books } from './books'
import { deleteBook } from './delete'
import { editBook } from './editBook'
import { newBook } from './newBook'
import { source } from './source'
import { total } from './total'

const resolvers = {
  Book: {
    cacheId: prop('id'),
  },
  Mutation: {
    delete: deleteBook,
    editBook,
    newBook,
  },
  Query: {
    book,
    books,
    source,
    total,
  },
}

export default resolvers
