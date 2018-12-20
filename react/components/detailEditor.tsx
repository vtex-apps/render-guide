import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Button, Input, Spinner } from 'vtex.styleguide'

import editBook from '../graphql/editBook.graphql'
import { Book, Maybe } from '../interfaces'

interface Props {
  book: Book
}

interface State {
  name: Maybe<Book['name']>
  authors: Maybe<Book['authors']>
}

const serializeArray = (array: string[] | void) => Array.isArray(array)
  ? array.join(',')
  : ''

const parseArray = (serialized: string | void) => serialized
  ? serialized.split(',')
  : []

export class BookDetailEditor extends Component<Props, State> {
  public static getDerivedStateFromProps = (props: Props, state: State) => ({
    ...props && props.book,
    ...state,
  })

  constructor(props: Props) {
    super(props)

    this.state = {} as any
  }

  public variables = () => ({
    variables: {
      book: {
        authors: this.state.authors,
        name: this.state.name,
      },
      id: this.props.book.id,
    },
  })

  public render = () => (
    <Mutation mutation={editBook}>
    {(save, {loading}) => (
      <div className="w-40">
        <div className="mb5">
          <Input
            label="ID"
            value={this.props.book.id}
            disabled
          />
        </div>
        <div className="mb5">
          <Input
            label="Name"
            value={this.state.name}
            onChange={(e: any) => this.setState({name: e.target.value})}
          />
        </div>
        <div className="mb5">
          <Input
            label="Authors"
            value={serializeArray(this.state.authors)}
            onChange={(e: any) => this.setState({authors: parseArray(e.target.value)})}
          />
        </div>
        <span className="mr4">
          {!loading
          ? (<Button variation="primary" onClick={() => save(this.variables())}>
              Save
            </Button>
          )
          : (
            <Spinner />
          )}
        </span>
      </div>
    )}
    </Mutation>
  )
}
