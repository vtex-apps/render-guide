import React, { Component } from 'react'
import { Spinner } from 'vtex.styleguide'

import { Book } from '../../../typings/custom'

import TableWrapper from './TableWrapper'
import { updateQuery } from './utils'

interface Props {
  books: Book[]
  fetchMore: (options: any) => Promise<any>
  loading?: boolean
  newPage?: string
  total: number
}

interface State {
  currentPage: number
  elementsPerPage: number
  from: number
  to: number
}

class PaginationController extends Component<Props, State> {
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
    const { books, loading, newPage, total } = this.props

    const from = this.state.currentPage * this.state.elementsPerPage

    const to = Math.min(
      (this.state.currentPage + 1) * this.state.elementsPerPage,
      total
    )

    const totalPages = Math.ceil(total / this.state.elementsPerPage)

    const nextPage = (this.state.currentPage + 1) % totalPages

    const previousPage =
      totalPages - 1 - ((totalPages - this.state.currentPage) % totalPages)

    if (loading) {
      return <Spinner />
    }

    return (
      <TableWrapper
        books={books.slice(from, to)}
        currentPage={this.state.currentPage}
        elementsPerPage={this.state.elementsPerPage}
        from={from}
        id="tableWrapper"
        newPage={newPage}
        next={this.getPageChangeHandler(nextPage)}
        previous={this.getPageChangeHandler(previousPage)}
        to={to}
        total={total}
      />
    )
  }

  private getPageChangeHandler = (newPage: number) => async () => {
    const { books, fetchMore, total } = this.props

    const from = newPage * this.state.elementsPerPage

    const to = Math.min((newPage + 1) * this.state.elementsPerPage, total)

    if (books.length > 0) {
      await fetchMore({
        updateQuery,
        variables: { from, to },
      })
    }

    this.setState({
      currentPage: newPage,
      from,
      to,
    })
  }
}

export default PaginationController
