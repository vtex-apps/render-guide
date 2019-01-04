// This is a helper component that makes the query and waits untill
// all of the data is loaded to render the children. While the data
// is not loaded yet, a Spinner is shown

import React from 'react'
import { Query } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'

interface Props {
  query: any
  children: any
  prop: string
  variables?: any
  notifyOnNetworkStatusChange?: boolean
}

export const WithSyncQueryData = ({query, children, prop, variables, notifyOnNetworkStatusChange}: Props) => (
  <Query query={query} variables={variables} notifyOnNetworkStatusChange={notifyOnNetworkStatusChange}>
  {({loading, data, fetchMore}) => loading
    ? <Spinner />
    : data && data[prop] !== undefined
      ? children({data, fetchMore})
      : null
  }
  </Query>
)
