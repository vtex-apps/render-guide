// This component handles the detail input. If the data is
// available before the loading state is finished, the
// data is previewed using the Input component. Also, it makes
// the mutation for editing the detail.

import isEqual from 'lodash.isequal'
import React, { Component } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'

// This mutation makes automatic cache update to work. Note that
// it queries all changed data from the server back (with cacheId)
// so that when the altered data arrives, it can automatically
// rewrite the data in the local browser cache
import editBook from '../graphql/editBook.graphql'
import { Book } from '../typings/custom'
import { parseArray, serializeArray } from '../utils/array'

import Input from './Input'

interface CustomProps {
  // The incoming query data. Note that it can be partially
  // available in case of reading from local cache
  book: Partial<Book>
  isLoading: boolean
  topicPage: string
}

type Props = CustomProps & RenderContextProps

// The state keeps track from the altered user input
interface State {
  formData: Partial<Book>
}

class DetailsEditor extends Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (!isEqual(nextProps.book, prevState.formData)) {
      return { ...prevState, formData: nextProps.book }
    }

    return null
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      formData: props.book,
    }
  }

  public render() {
    return (
      <Mutation mutation={editBook}>
        {(save, { loading: isSaving }) => (
          <form>
            <div className="w-40">
              <div className="mb5">
                <Input
                  disabled
                  label="ID"
                  loading={this.props.isLoading}
                  value={this.props.book.id}
                />
              </div>
              <div className="mb5">
                <Input
                  disabled={isSaving}
                  label="Name"
                  loading={this.props.isLoading}
                  onChange={this.handleNameChange}
                  value={this.state.formData.name}
                />
              </div>
              <div className="mb5">
                <Input
                  disabled={isSaving}
                  label="Authors"
                  loading={this.props.isLoading}
                  onChange={this.handleAuthorsChange}
                  value={serializeArray(this.state.formData.authors)}
                />
              </div>
              <span className="mr4">
                <Button
                  disabled={this.props.isLoading}
                  onClick={this.getSaveHandler(save)}
                  isLoading={isSaving}
                  variation="primary"
                >
                  Save
                </Button>
              </span>
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

  private getSaveHandler = (save: MutationFn) => async () => {
    const {
      book: { id },
      runtime,
      topicPage,
    } = this.props

    try {
      await save({
        variables: {
          book: this.state.formData,
          id,
        },
      })

      runtime.navigate({
        page: 'guide.topic',
        params: { topic: topicPage },
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

export default withRuntimeContext(DetailsEditor)
