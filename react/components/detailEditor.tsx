// This component handles the detail input. If the data is
// available before the loading state is finished, the
// data is previewed using the Input component. Also, it makes
// the mutation for editing the detail.

import React, { Component } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { Button, Spinner } from 'vtex.styleguide'

// This mutation makes automatic cache update to work. Note that
// it queries all changed data from the server back (with cacheId)
// so that when the altered data arrives, it can automatically
// rewrite the data in the local browser cache
import editBook from '../graphql/editBook.graphql'
import { Book } from '../typings/custom'

import Input from './Input'

interface CustomProps {
  // The incoming query data. Note that it can be partially
  // available in case of reading from local cache
  book: Partial<Book>
}

type Props = CustomProps & RenderContextProps

// The state keeps track from the altered user input
interface State {
  formData: Partial<Book>
  isLoading: boolean
}

class DetailEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      formData: props.book,
      isLoading: false,
    }
  }

  public render() {
    return (
      <Mutation mutation={editBook}>
        {(save, { loading: isSaving }) => (
          <form>
            <div className="w-40">
              <div className="mb5">
                <Input disabled label="ID" value={this.props.book.id} />
              </div>
              <div className="mb5">
                <Input
                  label="Name"
                  onChange={this.handleNameChange}
                  value={this.state.formData.name}
                />
              </div>
              <span className="mr4">
                {isSaving || this.state.isLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    onClick={this.getSaveHandler(save)}
                    variation="primary"
                  >
                    Save
                  </Button>
                )}
              </span>
            </div>
            <button
              className="dn"
              onClick={this.getSaveHandler(save)}
              type="submit"
            />
          </form>
        )}
      </Mutation>
    )
  }

  private getSaveHandler = (save: MutationFn) => () => {
    const {
      book: { id },
      runtime,
    } = this.props

    this.setState({ isLoading: true }, async () => {
      try {
        await save({
          variables: {
            book: this.state.formData,
            id,
          },
        })

        runtime.navigate({
          page: 'guide.topic',
          params: { topic: 'automatic-cache-updates' },
        })
      } catch (err) {
        console.log(err)

        this.setState({ isLoading: false })
      }
    })
  }

  private handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ formData: { name: e.target.value } })
  }
}

export default withRuntimeContext(DetailEditor)
