import React, { FunctionComponent } from 'react'
import { Query } from 'react-apollo'
import Markdown from 'react-markdown'
import { Spinner } from 'vtex.styleguide'

import markdownQuery from '../../graphql/markdown.graphql'
import ErrorPage from '../ErrorPage'

import BlockQuote from './BlockQuote'
import CodeBlock from './CodeBlock'

interface Props {
  source: string
}

// This component renders a markdown block synchronously.
const MarkdownBlock: FunctionComponent<Props> = ({ source }) => (
  <Query query={markdownQuery} variables={{ id: source }}>
    {({ data: { source: markdownSource }, loading }) =>
      loading ? (
        <Spinner />
      ) : markdownSource ? (
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
  </Query>
)

export default MarkdownBlock
