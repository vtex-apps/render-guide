import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'

import createBook from './graphql/createBook.graphql'
import deleteBook from './graphql/deleteBook.graphql'
import getBooks from './graphql/getBooks.graphql'

import {BooksManager} from './BooksManager'

class Library extends Component {
  render() {
    const {
      data: {Books},
      createBook,
      deleteBook
    } = this.props

    const inlineStyle = {
      padding: '15px'
    }

    return (
      <div style={inlineStyle}>
        <BooksManager
          title="Books"
          books={Books}
          onCreate={createBook}
          onDelete={deleteBook}
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
  graphql(createBook, {name: 'createBook'}),
  graphql(deleteBook, {name: 'deleteBook'}),
  graphql(getBooks)
)(Library)
