import React, { Fragment } from 'react'

import MarkdownBlock from '../../../MarkdownBlock'

const DynamicPagination: React.SFC = () => (
  <Fragment>
    <MarkdownBlock source="dynamic-pagination/before" />
    <MarkdownBlock source="dynamic-pagination/after" />
  </Fragment>
)

export default DynamicPagination
