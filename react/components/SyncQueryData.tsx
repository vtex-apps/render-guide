import React, { FunctionComponent } from 'react'
import { Query } from 'react-apollo'

interface Props {
  children: (queryResult: any) => JSX.Element
  notifyOnNetworkStatusChange?: boolean
  prop: string
  query: any
  variables?: any
}

// This is a helper component that makes the query and waits untill
// all of the data is loaded to render the children. While the data
// is not loaded yet, a Spinner is shown.
const SyncQueryData: FunctionComponent<Props> = ({
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
    {({ data, fetchMore, loading }) =>
      children && data && data[prop] !== undefined
        ? children({ data, fetchMore, loading })
        : null
    }
  </Query>
)

export default SyncQueryData
