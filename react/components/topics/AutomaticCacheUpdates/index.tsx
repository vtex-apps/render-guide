import React, { Fragment } from 'react'

import MarkdownBlock from '../../MarkdownBlock'

import List from './List'

const AutomaticCacheUpdates: React.SFC = () => (
  <Fragment>
    <MarkdownBlock source="automatic-cache-updates/before" />
    <List />
    <MarkdownBlock source="automatic-cache-updates/after" />
  </Fragment>
)

export default AutomaticCacheUpdates
