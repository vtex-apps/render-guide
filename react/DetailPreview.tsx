import React from 'react'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

const Header: React.SFC = () => (
  <PageHeader
    title="Detail Preview"
  />
)

const Entrypoint: React.SFC = ({children}) => (
  <Layout
    fullWidth
    pageHeader={<Header />}>
    <PageBlock>
      <p>
        In this example you will learn how to
        <a href="https://www.apollographql.com/docs/react/advanced/caching.html#readfragment"> Reuse Cache Data</a>
      </p>
      <p>
        Reuse cached data let's you reuse the Apollo Client's cache for previewing available data!
        This example shows how this feature can improve the user's experience. It starts by querying a book list, which is shown bellow. Clicking in a row will take you to the detail page. The detail page needs more data than the available in the list, like the author's name. We can deliver a better user experience by previewing the edit component with the already present, in cache, book's name.
      </p>
    </PageBlock>
    <PageBlock>
      {children}
    </PageBlock>
    <PageBlock>
      <p>
        Cool !
      </p>
      <p>
        The whole magic is made by using the Apollo Client. Apollo client allows you to read directly from the cache with the readFragments option.
      </p>
      <p>
        To read from a fragment you need to give the cacheId's of the object you want to read from. To help you generating it, Render exports the buildCacheLocator function that accepts as input the App's ID, the type of the fragment, and the cacheId returned by the GraphQL API.
      </p>
    </PageBlock>
  </Layout>
)

export default Entrypoint
