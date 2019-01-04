import React, { Component } from 'react'
import { ExtensionPoint } from 'render'
import { Spinner } from 'vtex.styleguide'

import { Book } from '../utils/interfaces'

interface Props {
  loading?: boolean
  books: Book[]
  total: number
  newPage?: string
  linkToPage: string
  fetchMore: (options: any) => Promise<any>
}

interface State {
  elementsPerPage: number
  currentPage: number
  from: number
  to: number
}

const updateQuery = (previous: {books: Book[]}, {fetchMoreResult}: {fetchMoreResult: {books: Book[]}}) => ({
  ...previous,
  books: fetchMoreResult && Array.isArray(fetchMoreResult.books)
    ? [...previous.books, ...fetchMoreResult.books]
    : previous.books,
})

export class PaginationController extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      currentPage: 0,
      elementsPerPage: 5,
      from: 0,
      to: 5,
    }
  }

  public render = () => {
    const {
      total,
      books,
      loading,
      newPage,
      linkToPage,
    } = this.props
    const {
      elementsPerPage,
      currentPage,
    } = this.state

    const from = this.state.currentPage * this.state.elementsPerPage
    const to = Math.min((this.state.currentPage + 1) * this.state.elementsPerPage, this.props.total)

    const totalPages = Math.ceil(this.props.total / this.state.elementsPerPage)
    const nextPage = (this.state.currentPage + 1) % totalPages
    const previousPage = totalPages - 1 - (totalPages - this.state.currentPage) % totalPages

    return !loading
    ? (
      <ExtensionPoint
        id="wrapper"

        {...this.props}
        newPage={newPage}
        linkToPage={linkToPage}
        from={from}
        to={to}
        elementsPerPage={elementsPerPage}
        currentPage={currentPage}
        total={total}
        books={books.slice(from, to)}
        next={() => this.changePage(nextPage)}
        previous={() => this.changePage(previousPage)}
      />
    )
    : <Spinner />
  }

  private changePage = async (nextPage: number) => {
    const from = nextPage * this.state.elementsPerPage
    const to = Math.min((nextPage + 1) * this.state.elementsPerPage, this.props.total)

    const fetchMorePromise = to < this.props.books.length
      ? Promise.resolve({data: this.props.books})
      : this.props.fetchMore({
        updateQuery,
        variables: {from, to},
      })

    fetchMorePromise.then(_ => {
      this.setState({
      currentPage: nextPage,
      from,
      to,
    })})
  }
}
