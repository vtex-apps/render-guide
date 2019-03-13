import React, { Fragment } from 'react'

import MarkdownBlock from '../../MarkdownBlock'
import Pagination from '../../Pagination'

interface Props {
  id?: string
}

const StaticPagination: React.SFC<Props> = ({ id }) => (
  <Fragment>
    <MarkdownBlock source="static-pagination/before" />
    <Pagination id={id} type="static" />
    <MarkdownBlock source="static-pagination/after" />
  </Fragment>
)

export default StaticPagination
