import React, { Fragment, FunctionComponent } from 'react'
import { Button, PageBlock } from 'vtex.styleguide'

import MarkdownBlock from '../../MarkdownBlock'

const Styleguide: FunctionComponent = () => (
  <Fragment>
    <MarkdownBlock source="styleguide/before" />
    <PageBlock>
      <Button>Click me</Button>
    </PageBlock>
    <MarkdownBlock source="styleguide/after" />
  </Fragment>
)

export default Styleguide
