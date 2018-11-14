import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'

import createCachedBook from './graphql/createCachedBook.graphql'
import deleteCachedBook from './graphql/deleteCachedBook.graphql'
import getBooks from './graphql/getBooks.graphql'

import {BooksManager} from './BooksManager'

class Library extends Component {
  render() {
    const {
      data: {cachedBooks},
      createCachedBook,
      deleteCachedBook
    } = this.props

    const inlineStyle = {
      padding: '15px'
    }

    return (
      <div style={inlineStyle}>
        <BooksManager
          title="Cached Books"
          books={cachedBooks}
          onCreate={createCachedBook}
          onDelete={deleteCachedBook}
          onGet={getBooks}
        />
      </div>
    )
  }
}

Library.propTypes = {
  data: PropTypes.object,
  mutate: PropTypes.func
}
export default compose(
  graphql(createCachedBook, {name: 'createCachedBook'}),
  graphql(deleteCachedBook, {name: 'deleteCachedBook'}),
  graphql(getBooks)
)(Library)
