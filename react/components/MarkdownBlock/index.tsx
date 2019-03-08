import React from 'react'
import Markdown from 'react-markdown'

import markdownQuery from '../../graphql/markdown.graphql'
import ErrorPage from '../ErrorPage'
import SyncQueryData from '../SyncQueryData'

import BlockQuote from './BlockQuote'
import CodeBlock from './CodeBlock'

interface Props {
  source: string
}

// This component renders a markdown block synchronously.
const MarkdownBlock: React.SFC<Props> = ({ source }) => (
  <SyncQueryData query={markdownQuery} variables={{ id: source }} prop="source">
    {({ data: { source: markdownSource } }) =>
      markdownSource ? (
        <div className="lh-copy">
          <Markdown
            renderers={{ blockquote: BlockQuote, code: CodeBlock }}
            source={markdownSource}
          />
        </div>
      ) : (
        <ErrorPage />
      )
    }
  </SyncQueryData>
)

export default MarkdownBlock
