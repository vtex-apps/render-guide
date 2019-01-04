// This component generates the base layout for this app.
// It renders a sidebar and the children. If there is no children,
// a greeting message is shown
import React from 'react'
import { Layout, PageBlock } from 'vtex.styleguide'

import { MarkdownBlock } from './components/markdownBlock'
import { SideBar } from './components/sidebar'

interface Props {
  // The sidebar configuration JSON is given as an input and
  // is defined in pages.json
  sidebar: any
  params: {
    topic: string
  }
}

const ChildrenBlock: React.SFC = ({children}) => children
  ? <PageBlock>{children}</PageBlock>
  : null

const Entrypoint: React.SFC<Props> = ({ children, sidebar, params: {topic} }) => (
  <div className="flex flex-row">
    <div style={{minWidth: '300px'}}>
      <SideBar sidebar={sidebar} />
    </div>
    <Layout fullWidth>
      <MarkdownBlock source={`${topic}/before`} />
      <ChildrenBlock children={children} />
      <MarkdownBlock source={`${topic}/after`} />
    </Layout>
  </div>
)

export default Entrypoint
