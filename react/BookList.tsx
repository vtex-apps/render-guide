import React, {Component} from 'react'
import {Query} from 'react-apollo'
import getBooks from './graphql/getBooks.graphql'

interface BookListProps {
  entriesPerPage: number;
  getCursor: () => number;
  setCursor: (cursor: number) => void;
}

export default class BookList extends Component<BookListProps, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div style={{padding: "5px"}}>
        <h3>Books in the Library</h3>
        <Query
          query={getBooks}
          variables={{cursor: this.props.getCursor(), numberOfEntries: this.props.entriesPerPage}}
        >
          {({ data: {books: {content, pageinfo}}, error, loading, fetchMore }) => (
            content && content.map(({id, name, authors}) => (
              <div key={id}>
                <b>{name || 'Name me, please'}</b>
                <br/>
                Authors: &nbsp;
                {(authors && authors.map((authors) => `${authors}, `)) || 'Give me a father, please'}
                <br/>
                ID: {id || 'I should have and ID, this is embarrassing...'}
                <br/>
                &nbsp;
              </div>
              )).concat([
                <div key={"ChangePage"}>
                <button
                  style={{width:"100px"}}
                  onClick={() => {this.props.setCursor(this.props.getCursor() - this.props.entriesPerPage)}}
                >
                  Previous
                </button>
                &nbsp;
                <button
                  style={{width:"100px"}}
                  onClick={() => {
                    if (!pageinfo.hasNextPage) return;
                    this.props.setCursor(this.props.getCursor() + this.props.entriesPerPage);
                  }}
                >
                  Next
                </button>
              </div>
            ]))
          }
        </Query>
        <br/><hr/>
      </div>
    )
  }
}
