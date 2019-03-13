// This component handles the detail input. If the data is
// available before the loading state is finished, the
// data is previewed using the Input component. Also, it makes
// the mutation for editing the detail.
import React, { Component } from 'react'
import { Mutation, MutationFn, MutationUpdaterFn } from 'react-apollo'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'

import listQuery from '../../graphql/books.graphql'
import deleteBookMutation from '../../graphql/delete.graphql'
// This mutation makes automatic cache update to work. Note that
// it queries all changed data from the server back (with cacheId)
// so that when the altered data arrives, it can automatically
// rewrite the data in the local browser cache
import editBook from '../../graphql/editBook.graphql'
import totalQuery from '../../graphql/total.graphql'
import { CachedBookList, CachedTotal } from '../../typings/custom'
import { Book } from '../../typings/custom'
import { isValidIndex, parseArray, serializeArray } from '../../utils/array'
import Input from '../Input'

import DeleteButton from './DeleteButton'

interface CustomProps {
  // The incoming query data
  book: Book
  hasDelete: boolean
  isLoading: boolean
  topicPage: string
}

type Props = CustomProps & RenderContextProps

// The state keeps track from the altered user input
interface State {
  formData: Book
  prevAuthors: string
}

class DetailsEditor extends Component<Props, State> {
  public static getDerivedStateFromProps(props: Props, state: State) {
    const { prevAuthors } = state

    const currAuthors = props.book.authors
    const currSerializedAuthors = serializeArray(currAuthors)

    if (currSerializedAuthors !== prevAuthors) {
      return {
        ...state,
        formData: {
          ...state.formData,
          authors: currAuthors,
        },
        prevAuthors: currSerializedAuthors,
      }
    }

    return null
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      formData: props.book,
      prevAuthors: serializeArray(props.book.authors),
    }
  }

  public render() {
    return (
      <Mutation mutation={editBook}>
        {(save, { loading: isSaving }) => (
          <Mutation
            mutation={deleteBookMutation}
            update={this.updateStoreAfterDelete}
          >
            {(deleteBook, { loading: isDeleting }) => (
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
                  <div
                    className={`flex justify-${
                      this.props.hasDelete ? 'between' : 'end'
                    }`}
                  >
                    {this.props.hasDelete && (
                      <DeleteButton
                        id={this.props.book.id}
                        isDisabled={isSaving}
                        isLoading={isDeleting}
                        mutation={deleteBook}
                      />
                    )}
                    <Button
                      disabled={this.props.isLoading || isDeleting}
                      isLoading={isSaving}
                      onClick={this.getSaveHandler(save)}
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
        )}
      </Mutation>
    )
  }

  private getSaveHandler = (save: MutationFn) => async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()

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

  // This method fires after the deletion mutation takes place.
  // This mutation only deletes a single element. We need to remove
  // the deleted element from the paginated list. To do so, we need to
  // change the total number of elements and the book's array
  private updateStoreAfterDelete: MutationUpdaterFn<any> = (
    cache,
    { data: { delete: status } }
  ) => {
    // If the data is not present in the cache, the readQuery method will throw.
    // This happens when the user first visits this page and then go to the listing page
    if (!status) {
      throw Error('Error: entry could not be deleted.')
    }

    // Here we read the number of elements of the listing
    const totalData = cache.readQuery<CachedTotal>({ query: totalQuery })
    const total = totalData && totalData.total

    // Here we read the list removing the element
    const list = cache.readQuery<CachedBookList>({ query: listQuery })
    const books = list && list.books

    const foundIndex =
      books && books.findIndex(book => book.id === this.props.book.id)

    // Now we update both caches at once
    if (
      books &&
      total &&
      foundIndex !== null &&
      isValidIndex(books, foundIndex)
    ) {
      const updatedBooks = [
        ...books.slice(0, foundIndex),
        ...books.slice(foundIndex + 1),
      ]

      cache.writeQuery<CachedBookList>({
        data: {
          ...list,
          books: updatedBooks,
        },
        query: listQuery,
      })

      cache.writeQuery<CachedTotal>({
        data: {
          ...totalData,
          total: total - 1,
        },
        query: totalQuery,
      })
    }
  }
}

export default withRuntimeContext(DetailsEditor)
