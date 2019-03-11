import React, { Fragment } from 'react'

import Pagination from '..'
import MarkdownBlock from '../../../MarkdownBlock'

interface Props {
  id?: string
}

const DynamicPagination: React.SFC<Props> = ({ id }) => (
  <Fragment>
    <MarkdownBlock source="dynamic-pagination/before" />
    <Pagination id={id} type="dynamic" />
    <MarkdownBlock source="dynamic-pagination/after" />
  </Fragment>
)

export default DynamicPagination
