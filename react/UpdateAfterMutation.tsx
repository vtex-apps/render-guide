import React from 'react'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

const Header: React.SFC = () => (
  <PageHeader
    title="Update After a Mutation"
  />
)

const Entrypoint: React.SFC = ({children}) => (
  <Layout
    fullWidth
    pageHeader={<Header />}>
    <PageBlock>
      <p>
        In this example you will learn how to use
        <a href="https://www.apollographql.com/docs/react/advanced/caching.html#automatic-updates"> Automatic Cache Updates</a>
      </p>
      <p>
        Automatic Cache Update let's you update the Apollo Client's cache without any code !
        This example shows how this feature can be handy. It starts by querying a book list, which is shown bellow. Clicking in a row will take you to the detail page. The detail page allows you to edit the name and authors of a book. By clicking in save, a mutation will be made to the GraphQL API, mutating one SINGLE Book object. By click in the back button, the mutated book in the list will also be changed, all with ONE SINGLE MUTATION !
      </p>
    </PageBlock>
    <PageBlock>
      {children}
    </PageBlock>
    <PageBlock>
      <p>
        It's a kid of magic !
      </p>
      <p>
        The whole magic is made by using the cacheId option available in type Book and supported by InMemoryCache.
      </p>
      <p>
        Since InMemoryCache is a normalized data store, each element in the list has a unique key in the cache. This key is given by the cacheId field returned from the books.graphql query.
      </p>
      <p>
        The result of the mutation updates the book object under the key given by the returned cacheId. Since the object under the cacheId key was changed, when hitting the back button and rerendering the book list, the list will be reconstructed with the new data, thus changing the rendered book.
      </p>
    </PageBlock>
    <PageBlock>
      Note that this feature can replace the use of Redux in most applications. Also, the name of the field cacheId is a convention and has to be respected
    </PageBlock>
  </Layout>
)

export default Entrypoint
