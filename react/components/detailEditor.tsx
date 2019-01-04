// This component handles the detail input. If the data is
// available before the loading state is finished, the
// data is previewed using the Input component. Also, it makes
// the mutation for editing the detail.

import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Button, Spinner } from 'vtex.styleguide'

import { parseArray, serializeArray } from '../utils/array'
import { Book } from '../utils/interfaces'
import { Input } from './input'

// This mutation makes automatic cache update to work. Note that
// it queries all changed data from the server back (with cacheId)
// so that when the altered data arrives, it can automatically
// rewrite the data in the local browser cache
import editBook from '../graphql/editBook.graphql'

interface Props {
  // The incomming query data. Note that it can be partially
  // available in case of reading from local cache
  book: Partial<Book>
  // Loading state of the query that loads the full book data
  loading?: boolean
}

// The state keeps track from the altered user input
interface State {
  name: Book['name']
  authors: Book['authors']
}

export class DetailEditor extends Component<Props, State> {
  // This method serves to initialize the input with available data in props
  public static getDerivedStateFromProps = (props: Props, state: State) => ({
    ...props && props.book,
    ...state,
  })

  constructor(props: Props) {
    super(props)
    this.state = {} as any
  }

  public render = () => (
    <Mutation mutation={editBook}>
    {(save, {loading: saving}) => (
      <div className="w-40">
        <div className="mb5">
          <Input
            loading={this.props.loading}
            label="ID"
            value={this.props.book.id}
            disabled
          />
        </div>
        <div className="mb5">
          <Input
            label="Name"
            value={this.state.name}
            loading={this.props.loading}
            onChange={(e: any) => this.setState({name: e.target.value})}
          />
        </div>
        <div className="mb5">
          <Input
            label="Authors"
            value={serializeArray(this.state.authors)}
            loading={this.props.loading}
            onChange={(e: any) => this.setState({authors: parseArray(e.target.value)})}
          />
        </div>
        <span className="mr4">
        {!saving
          ? (
            <Button variation="primary" onClick={() => save({variables: {book: {...this.state}}})}>
              Save
            </Button>
          )
          : <Spinner />
        }
        </span>
      </div>
    )}
    </Mutation>
  )
}
