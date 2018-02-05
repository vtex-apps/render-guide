const mockCachedBooks = [
  {id: '1', name: 'default book', authors: ['author1', 'author2']}
]

export const resolvers = {
  Query: {
    cachedBooks: (_, __) => {
      return mockCachedBooks
    },
    cachedBook: (_, {id}) => {
      return mockCachedBooks.find((book) => book.id === id)
    },
  },
  Mutation: {
    deleteCachedBook: (_, {id}) => {
      const index = mockCachedBooks.findIndex((book) => book.id === id)

      if (-1 < index && index < mockCachedBooks.length) {
        mockCachedBooks.splice(index, 1)
        return true
      }
      return false
    },
    createCachedBook: (_, {data: {authors, name}}) => {
      const book = {
        authors,
        id: (mockCachedBooks.length+1).toString(),
        name,
      }
      mockCachedBooks.push(book)
      return book
    }
  }
}
