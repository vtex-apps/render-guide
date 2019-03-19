import React, { Fragment, FunctionComponent } from 'react'
import { Helmet } from 'vtex.render-runtime'

import ErrorPage from './components/ErrorPage'
import topics from './components/topics'

interface Props {
  params: {
    id?: string;
    topic: string;
  }
}

const Topic: FunctionComponent<Props> = ({ params }) => {
  const topic = topics.find(entry => entry.slug === params.topic)

  return topic ? (
    <Fragment>
      <Helmet>
        <title>{topic.name}</title>
      </Helmet>
      <topic.Component id={params.id} />
    </Fragment>
  ) : (
    <ErrorPage />
  )
}

export default Topic
