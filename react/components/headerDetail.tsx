// This is a simple header component to generate the back button
// in the detail view

import React from 'react'
import { RenderContextProps, withRuntimeContext } from 'render'
import { PageHeader } from 'vtex.styleguide'

type Props = RenderContextProps & {
  linkToPage: string
}

const BaseHeader: React.SFC<Props> = ({runtime, linkToPage: page}) => (
  <PageHeader
    title={''}
    linkLabel="Back"
    onLinkClick={() => runtime.navigate({page})}
  />
)

export const Header = withRuntimeContext(BaseHeader)
