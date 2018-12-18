import React, {Component} from 'react'
import {Mutation} from 'react-apollo'
import createBook from './graphql/createBook.graphql'
import getBooks from './graphql/getBooks.graphql'

interface BookCreateFormProps {
  entriesPerPage: number;
  setCursor: (cursor: number) => void;
  getCursor: () => number;
}

interface BookCreateFormStates {
  id: string;
  name: string;
  authors: string;
}

export default class BookCreateForm extends Component<BookCreateFormProps, BookCreateFormStates> {
  constructor(props: any) {
    super(props);
    this.state = {id: '', name: '', authors: ''};
  }

  clearInput() {
    this.setState({
        name: '',
        authors: '',
    })
  }

  updateCache(cache, {data: {createBook: new_book}}) {
    const {
      books: {content, pageinfo: {cursor, hasNextPage, ...rest0}, ...rest1},
      ...rest2
    } = cache.readQuery({query: getBooks, variables: {cursor: this.props.getCursor()}});
    if (this.props.entriesPerPage >= content.length) {


    }
    if (!hasNextPage) {
      cache.writeQuery({
        query: getBooks,
        variables: { cursor: cursor, numberOfEntries: this.props.entriesPerPage },
        data: {
          books: { content: content.concat([new_book]), pageinfo: { hasNextPage: hasNextPage, ...rest0 }, ...rest1 },
          ...rest2
        }
      });
    }
  }

  render() {
    return (
      <div style={{padding: "5px"}}>
      <h3>Add a book to the library</h3>
      <Mutation mutation={createBook} update={this.updateCache}>
        {(addBook, { data }) => (
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({name: event.target.value})}
                />
               </label>
              <label>
                Authors(split by ','):
                <input
                  type="text"
                  value={this.state.authors}
                  onChange={event => this.setState({authors: event.target.value})}
                />
              </label>
              <button
                onClick={event =>
                  addBook({variables: {name: this.state.name, authors: this.state.authors.split(',')}}) &&
                  this.clearInput()
                  }
                >
                Insert
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
