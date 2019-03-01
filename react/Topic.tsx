import React, { Fragment } from 'react'
import { Helmet } from 'vtex.render-runtime'

import ErrorPage from './components/ErrorPage'
import topics from './components/topics'

interface Props {
  params: {
    topic: string
  }
}

const Topic: React.SFC<Props> = ({ params }) => {
  const topic = topics.find(entry => entry.slug === params.topic)

  return topic ? (
    <Fragment>
      <Helmet>
        <title>{topic.name}</title>
      </Helmet>
      <topic.Component />
    </Fragment>
  ) : (
    <ErrorPage />
  )
}

export default Topic
