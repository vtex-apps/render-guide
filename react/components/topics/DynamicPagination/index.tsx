import React, { Fragment } from 'react'

import MarkdownBlock from '../../MarkdownBlock'
import Pagination from '../../Pagination'

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
      <Pagination hasDelete id={id} newPage="guide.topic-details" type="dynamic" />
    )}
    <MarkdownBlock source="dynamic-pagination/after" />
  </Fragment>
)

export default DynamicPagination
