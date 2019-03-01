// This component provides the layout of a detail view.
// It basically instanciates a header followed by an
// extension point so custom detail components can be
// rendered and set up in pages.json

import React, { Fragment } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'

import Header from './Header'

interface Props {
  params: {
    id: string
  }
  linkToPage: string
}

const DetailLayout: React.SFC<Props> = ({ linkToPage, params: { id } }) => (
  <Fragment>
    <Header linkToPage={linkToPage} />
    <ExtensionPoint id="component" itemId={id} />
  </Fragment>
)

export default DetailLayout
