// This is a simple header component to generate the back button
// in the detail view

import React from 'react'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { PageHeader } from 'vtex.styleguide'

type Props = RenderContextProps & {
  linkToPage: string
}

const HeaderDetail: React.SFC<Props> = ({ runtime, linkToPage: page }) => (
  <PageHeader
    linkLabel="Back"
    onLinkClick={() => runtime.navigate({ page })}
    title=""
  />
)

export default withRuntimeContext(HeaderDetail)
