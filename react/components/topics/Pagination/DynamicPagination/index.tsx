import React, { Fragment } from 'react'

import Pagination from '..'
import MarkdownBlock from '../../../MarkdownBlock'

import CreationForm from './CreationForm'

interface Props {
  id?: string
}

const DynamicPagination: React.SFC<Props> = ({ id }) => (
  <Fragment>
    <MarkdownBlock source="dynamic-pagination/before" />
    {id === 'new' ? (
      <CreationForm />
    ) : (
      <Pagination id={id} newPage="guide.topic-details" type="dynamic" />
    )}
    <MarkdownBlock source="dynamic-pagination/after" />
  </Fragment>
)

export default DynamicPagination
