import React, { Fragment } from 'react'

import MarkdownBlock from '../../../MarkdownBlock'
import PaginatedList from '../PaginatedList'

const StaticPagination: React.SFC = () => (
  <Fragment>
    <MarkdownBlock source="static-pagination/before" />
    <PaginatedList />
    <MarkdownBlock source="static-pagination/after" />
  </Fragment>
)

export default StaticPagination
