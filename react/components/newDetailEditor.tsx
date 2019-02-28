// This component handles the detail input. Also, it makes
// the mutation for creating a new detail.

import React, { Component } from 'react'
import { Mutation, MutationUpdaterFn } from 'react-apollo'
import { Button, Spinner } from 'vtex.styleguide'

import newMutation from '../graphql/newBook.graphql'
import { Book } from '../typings/custom'
import { parseArray, serializeArray } from '../utils/array'

import Input from './Input'

interface Props {
  onUpdate?: MutationUpdaterFn<any>
}

// The state keeps track from the altered user input
interface State {
  name: Book['name']
  authors: Book['authors']
}

class NewDetailEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      authors: [''],
      name: '',
    }
  }

  public render = () => (
    <Mutation mutation={newMutation} update={this.props.onUpdate}>
      {(save, { loading: saving }) => (
        <div className="w-40">
          <div className="mb5">
            <Input
              label="Name"
              value={this.state.name}
              onChange={(e: any) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="mb5">
            <Input
              label="Authors"
              value={serializeArray(this.state.authors)}
              onChange={(e: any) =>
                this.setState({ authors: parseArray(e.target.value) })
              }
            />
          </div>
          <span className="mr4">
            {!saving ? (
              <Button
                variation="primary"
                onClick={() => save({ variables: { book: { ...this.state } } })}
              >
                Save
              </Button>
            ) : (
              <Spinner />
            )}
          </span>
        </div>
      )}
    </Mutation>
  )
}

export default NewDetailEditor
