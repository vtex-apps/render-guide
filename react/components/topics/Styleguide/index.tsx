import React, { Fragment } from 'react'
import { Button, PageBlock } from 'vtex.styleguide'

import MarkdownBlock from '../../MarkdownBlock'

const Styleguide: React.SFC = () => (
  <Fragment>
    <MarkdownBlock source="styleguide/before" />
    <PageBlock>
      <Button>Click me</Button>
    </PageBlock>
    <MarkdownBlock source="styleguide/after" />
  </Fragment>
)

export default Styleguide
