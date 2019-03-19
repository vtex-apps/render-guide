import React, { FunctionComponent } from 'react'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'

import { Topic } from '../../typings/custom'

interface Props extends RenderContextProps {
  name: Topic['name']
  slug?: Topic['slug']
}

const Item: FunctionComponent<Props> = ({ name, runtime, slug }) => {
  const isHome = !slug

  return (
    <li
      className={`mv6 ph8 f4 pointer ${isHome ? 'b' : ''}`}
      onClick={() => {
        runtime.navigate({
          page: isHome ? 'guide.home' : 'guide.topic',
          ...(slug && { params: { topic: slug } }),
        })
      }}
    >
      {name}
    </li>
  )
}

export default withRuntimeContext(Item)
