import React from 'react'
import { Query } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'

interface Props {
  children: any
  notifyOnNetworkStatusChange?: boolean
  prop: string
  query: any
  variables?: any
}

// This is a helper component that makes the query and waits untill
// all of the data is loaded to render the children. While the data
// is not loaded yet, a Spinner is shown.
const SyncQueryData = ({
  children,
  notifyOnNetworkStatusChange,
  prop,
  query,
  variables,
}: Props) => (
  <Query
    notifyOnNetworkStatusChange={notifyOnNetworkStatusChange}
    query={query}
    variables={variables}
  >
    {({ loading, data, fetchMore }) =>
      loading ? (
        <Spinner />
      ) : data && data[prop] !== undefined ? (
        children({ data, fetchMore })
      ) : null
    }
  </Query>
)

export default SyncQueryData
