// This is a simple header component to generate the back button
// in the detail view

import React from 'react'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { PageHeader } from 'vtex.styleguide'

interface CustomProps {
  linkToPage: string
}

type Props = CustomProps & RenderContextProps

const Header: React.SFC<Props> = ({ linkToPage, runtime }) => (
  <PageHeader
    linkLabel="Back"
    onLinkClick={() => runtime.navigate({ page: linkToPage })}
    title=""
  />
)

export default withRuntimeContext(Header)
