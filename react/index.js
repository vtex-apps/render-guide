import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import query from './query.graphql'

const Library = ({data: {loading, books, sampleStaticResolver}}) => {
  return (
    <div>
      <h3>My Library</h3>
      {loading && 'loading'}
      {!loading && books.map(({id, name, author}) => <div key={id}>{name} - {author}</div>)}
      {!loading && sampleStaticResolver.result}
    </div>
  )
}

Library.propTypes = {
  data: PropTypes.object,
}

export default graphql(query, {
  options: {
    variables: {
      param: "hardcoded",
    }
  }
})(Library)
