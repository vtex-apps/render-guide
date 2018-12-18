import {Component} from 'react'
import {Query, Mutation} from 'react-apollo'
import BookList from './BookList'
import BookCreateForm from './BookCreateForm'
import BookDeleteForm from './BookDeleteForm'


interface LibraryStates {
  bookCursor: number;
  bookEntriesPerPage: number;
}


class Library extends Component<{}, LibraryStates> {
  constructor(props) {
    super(props);
    this.state = {bookCursor: 0, bookEntriesPerPage: 5};
  }

  getCursor = () => this.state.bookCursor;

  setCursor = (cursor: number) => {this.setState({bookCursor: cursor})}

  render() {
    return (
      <div>
        <h2>Books</h2>
        <BookList
          entriesPerPage={this.state.bookEntriesPerPage}
          getCursor={() => this.getCursor()}
          setCursor={(cursor: number) => this.setCursor(cursor)}
        />
        <BookCreateForm
          entriesPerPage={this.state.bookEntriesPerPage}
          getCursor={() => this.getCursor()}
          setCursor={(cursor: number) => this.setCursor(cursor)}
        />
        <BookDeleteForm />
      </div>
    )
  }
}

export default Library
