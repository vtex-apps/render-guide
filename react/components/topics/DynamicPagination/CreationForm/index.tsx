// This component handles the detail input. Also, it makes
// the mutation for creating a new detail.

import React, { Component } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'

import newMutation from '../../../../graphql/newBook.graphql'
import { Book } from '../../../../typings/custom'
import { parseArray, serializeArray } from '../../../../utils/array'
import Input from '../../../Input'

import { updateCache } from './utils'

// The state keeps track from the altered user input
interface State {
  formData: {
    authors: Book['authors']
    name: Book['name']
  }
}

class CreationForm extends Component<RenderContextProps, State> {
  constructor(props: RenderContextProps) {
    super(props)

    this.state = {
      formData: {
        authors: [],
        name: '',
      },
    }
  }

  public render() {
    return (
      <Mutation mutation={newMutation} update={updateCache}>
        {(save, { loading: isSaving }) => (
          <form>
            <div className="w-40">
              <div className="mb5">
                <Input
                  autoFocus
                  disabled={isSaving}
                  label="Name"
                  onChange={this.handleNameChange}
                  value={this.state.formData.name}
                />
              </div>
              <div className="mb5">
                <Input
                  disabled={isSaving}
                  label="Authors"
                  onChange={this.handleAuthorsChange}
                  value={serializeArray(this.state.formData.authors)}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={this.getSaveHandler(save)}
                  isLoading={isSaving}
                  variation="primary"
                >
                  Save
                </Button>
              </div>
              <button
                className="dn"
                onClick={this.getSaveHandler(save)}
                type="submit"
              />
            </div>
          </form>
        )}
      </Mutation>
    )
  }

  private getSaveHandler = (save: MutationFn) => async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { runtime } = this.props

    e.preventDefault()

    try {
      await save({
        variables: {
          book: this.state.formData,
        },
      })

      runtime.navigate({
        page: 'guide.topic',
        params: { topic: 'dynamic-pagination' },
      })
    } catch (err) {
      console.log(err)
    }
  }

  private handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAuthors = e.target.value

    this.setState(prevState => ({
      ...prevState,
      formData: { ...prevState.formData, authors: parseArray(newAuthors) },
    }))
  }

  private handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value

    this.setState(prevState => ({
      ...prevState,
      formData: { ...prevState.formData, name: newName },
    }))
  }
}

export default withRuntimeContext(CreationForm)
