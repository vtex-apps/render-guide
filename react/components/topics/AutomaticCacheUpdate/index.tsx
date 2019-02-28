import React, { Fragment } from 'react'

import MarkdownBlock from '../../MarkdownBlock'

import List from './List'

const AutomaticCacheUpdate: React.SFC = () => (
  <Fragment>
    <MarkdownBlock source="automatic-cache-update/before" />
    <List />
    <MarkdownBlock source="automatic-cache-update/after" />
  </Fragment>
)

export default AutomaticCacheUpdate
