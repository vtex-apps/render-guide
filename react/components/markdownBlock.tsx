// This component renders synchronously a markdown block
import React from 'react'
import Markdown from 'react-markdown'
import { PageBlock } from 'vtex.styleguide'

import markdownQuery from '../graphql/markdown.graphql'
import { WithSyncQueryData } from './withSyncQueryData'

interface Props {
  source: string
}

export const MarkdownBlock: React.SFC<Props> = ({source}) => (
  <WithSyncQueryData query={markdownQuery} variables={{id: source}} prop="source">
  {({data: {source: markdownSource}}: any) => markdownSource
    ? (
      <PageBlock>
        <Markdown source={markdownSource} />
      </PageBlock>
    )
    : null
  }
  </WithSyncQueryData>
)
