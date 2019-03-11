import React, { Fragment } from 'react'

import Pagination from '..'
import MarkdownBlock from '../../../MarkdownBlock'

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
