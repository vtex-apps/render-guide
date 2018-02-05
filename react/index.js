import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'

import createAutopersistedBook from './graphql/createAutopersistedBook.graphql'
import deleteAutopersistedBook from './graphql/deleteAutopersistedBook.graphql'
import createCachedBook from './graphql/createCachedBook.graphql'
import deleteCachedBook from './graphql/deleteCachedBook.graphql'
import getBooks from './graphql/getBooks.graphql'

const AUTOPERSISTED = 'AUTOPERSISTED'
const CACHED = 'CACHED'

class Library extends Component {
  constructor(props) {
    super(props)
    this.deleteBook = this.deleteBook.bind(this)
    this.addNewBook = this.addNewBook.bind(this)
    this.clearInput = this.clearInput.bind(this)

    this.clearedState = {
      autoID: '',
      autoName: '',
      autoAuthors: '',
      cachedID: '',
      cachedName: '',
      cachedAuthors: '',
    }

    this.state = Object.assign({}, this.clearedState)
  }

  deleteBook(bookType) {
    const {deleteAutopersistedBook, deleteCachedBook} = this.props
    let mutate, id

    if (bookType === AUTOPERSISTED) {
      mutate = deleteAutopersistedBook
      id = this.state.autoID
    } else {
      mutate = deleteCachedBook
      id = this.state.cachedID
    }

    const deleteData = {
      variables: {
        id: id
      },
      refetchQueries: [{query: getBooks}]
    }

    mutate(deleteData).then(this.clearInput)
  }

  addNewBook(bookType) {
    const {createAutopersistedBook, createCachedBook} = this.props
    let mutate, name, authors

    if (bookType === AUTOPERSISTED) {
      mutate = createAutopersistedBook
      name = this.state.autoName
      authors = this.state.autoAuthors
    } else {
      mutate = createCachedBook
      name = this.state.cachedName
      authors = this.state.cachedAuthors
    }

    const addData = {
      variables: {
        name: name,
        authors: authors.split(',')
      },
      refetchQueries: [{query: getBooks}]
    }

    mutate(addData).then(this.clearInput)
  }

  clearInput() {
    this.setState(this.clearedState)
  }

  render() {
    const {data: {autopersistedBooks, cachedBooks}} = this.props
    const inlineStyle = {
      padding: '15px'
    }

    return (
      <div style={inlineStyle}>
        <h2>Autopersisted Books</h2>
        <h3>Books in the Library</h3>
        {autopersistedBooks && autopersistedBooks.map(({id, name, authors}) => {
          return <div key={id}>
                    <b>{name || 'Name me, please'}</b>
                    <br/>Authors: {(authors && authors.map((authors) => `${authors}, `)) || 'Give me a father, please'}
                    <br/>ID (click to select):<div onClick={event => this.setState({autoID: id})}>{id || 'I should have an ID, this is embarrassing'}</div>
                    <br/>
                </div>
        })}
        <br/><hr/>

        <h3>Add a book to the library</h3>
        <label>Name: <input type="text" value={this.state.autoName} onChange={event => this.setState({autoName: event.target.value})} /></label>
        <label>Authors(split by ','): <input type="test" value={this.state.autoAuthors} onChange={event => this.setState({autoAuthors: event.target.value})} /></label>
        <button onClick={event => this.addNewBook(AUTOPERSISTED)}>Insert</button>
        <br/><hr/>

        <h3>Remove a book from the library</h3>
        <label>ID:<input type="text" value={this.state.autoID} onChange={event => this.setState({autoID: event.target.value})}/></label>
        <button onClick={event => this.deleteBook(AUTOPERSISTED)}>DELETE</button>
        <br/><hr/>


        <h2>Cached Books</h2>
        <h3>Books in the Library</h3>
        {cachedBooks && cachedBooks.map(({id, name, authors}) => {
          return <div key={id}>
                    <b>{name || 'Name me, please'}</b>
                    <br/>Authors(split by ','): {(authors && authors.map((authors) => `${authors}, `)) || 'Give me a father, please'}
                    <br/>ID (click to select):<div onClick={event => this.setState({cachedID: id})}>{id || 'I should have an ID, this is embarrassing'}</div>
                    <br/>
                </div>
        })}
        <br/><hr/>

        <h3>Add a book to the library</h3>
        <label>Name: <input type="text" value={this.state.cachedName} onChange={event => this.setState({cachedName: event.target.value})} /></label>
        <label>Authors(split by ','): <input type="test" value={this.state.cachedAuthors} onChange={event => this.setState({cachedAuthors: event.target.value})} /></label>
        <button onClick={event => this.addNewBook(CACHED)}>Insert</button>
        <br/><hr/>

        <h3>Remove a book from the library</h3>
        <label>ID:<input type="text" value={this.state.cachedID} onChange={event => this.setState({cachedID: event.target.value})}/></label>
        <button onClick={event => this.deleteBook(CACHED)}>DELETE</button>
        <br/><hr/>

      </div>
    )
  }
}

Library.propTypes = {
  data: PropTypes.object,
  mutate: PropTypes.func
}

export default compose(
  graphql(createAutopersistedBook, {name: 'createAutopersistedBook'}),
  graphql(deleteAutopersistedBook, {name: 'deleteAutopersistedBook'}),
  graphql(createCachedBook, {name: 'createCachedBook'}),
  graphql(deleteCachedBook, {name: 'deleteCachedBook'}),
  graphql(getBooks)
)(Library)
