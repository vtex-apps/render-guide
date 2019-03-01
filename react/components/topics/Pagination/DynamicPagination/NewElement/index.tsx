import React from 'react'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'

import NewDetailEditor from '../../../../NewDetailEditor'

import { updateCache } from './utils'

const NewElement: React.SFC<RenderContextProps> = props => (
  <NewDetailEditor onUpdate={updateCache(props)} />
)

export default withRuntimeContext(NewElement)
