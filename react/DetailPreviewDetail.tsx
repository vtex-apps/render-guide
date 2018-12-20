import React, { Fragment } from 'react'
import { withRuntimeContext } from 'render'
import { PageHeader } from 'vtex.styleguide'

import { DetailWithPreview } from './components/detailWithPreview'

interface Props {
  params: {
    id: string
  }
}

const Header: React.SFC = withRuntimeContext((props: any) => (
  <PageHeader
    linkLabel="Back"
    onLinkClick={() => props.runtime.navigate({page: 'learn/detail-preview/list'})}
  />
))

const Entrypoint: React.SFC<Props> = (props: Props) => (
  <Fragment>
    <Header />
    <DetailWithPreview {...props} />
  </Fragment>
)

export default Entrypoint
