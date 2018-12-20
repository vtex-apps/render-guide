import React, { Fragment } from 'react'
import { withRuntimeContext } from 'render'
import { PageHeader } from 'vtex.styleguide'

import { Detail } from './components/detail'

interface Props {
  params: {
    id: string
  }
}

const Header: React.SFC = withRuntimeContext((props: any) => (
  <PageHeader
    linkLabel="Back"
    onLinkClick={() => props.runtime.navigate({page: 'learn/update-after-mutation/list'})}
  />
))

const Entrypoint: React.SFC<Props> = (props: Props) => (
  <Fragment>
    <Header />
    <Detail {...props} />
  </Fragment>
)

export default Entrypoint
