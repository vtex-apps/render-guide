import React, {Component} from 'react'
import {Mutation} from 'react-apollo'
import deleteBook from './graphql/deleteBook.graphql'
import getBooks from './graphql/getBooks.graphql'

interface BookDeleteFormStates {
  id: string;
}

export default class BookDeleteForm extends Component<{}, BookDeleteFormStates> {
  constructor(props: any) {
    super(props);
    this.state = {id: ''};
  }

  clearInput() {
    this.setState({
        id: ''
    })
  }

  updateCache(cache, {data: {deleteBook: deleted_id}}) {
    let {books, ...rest} = cache.readQuery({query: getBooks});
    let to_remove_index = books.findIndex((book) => book.id === deleted_id);
    if (to_remove_index != -1) {
      books.splice(to_remove_index, 1);
    }
    cache.writeQuery({query: getBooks, data: {books: books, ...rest}});
  }

  render() {
    return (
      <div style={{padding: "5px"}}>
      <h3>Remove a book from the library</h3>
      <Mutation mutation={deleteBook} update={this.updateCache}>
        {(deleteBook, { data }) => (
            <div>
              <label>
                ID:
                <input
                  type="text"
                  value={this.state.id}
                  onChange={event => this.setState({id: event.target.value})}
                />
               </label>
              <button
                onClick={event =>
                  deleteBook({variables: {id: this.state.id}}) && this.clearInput()
                  }
                >
                DELETE
              </button>
              <br/><hr/>
            </div>
        )
        }
      </Mutation>
      </div>
    )
  }
}
