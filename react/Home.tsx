import React, { Fragment, FunctionComponent } from 'react'
import { Helmet } from 'vtex.render-runtime'

import MarkdownBlock from './components/MarkdownBlock'

const Home: FunctionComponent = () => (
  <Fragment>
    <Helmet>
      <title>VTEX IO Web Framework Guide</title>
    </Helmet>
    <MarkdownBlock source="home/main" />
  </Fragment>
)

export default Home
