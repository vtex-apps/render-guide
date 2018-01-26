import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import query from './query.graphql'

const Library = ({data: {books}}) => {
  return (
    <div>
      <h3>My Library</h3>
      {books && books.map(({id, name, author}) => <div key={id}>{name} - {author}</div>)}
    </div>
  )
}

Library.propTypes = {
  data: PropTypes.object,
}

export default graphql(query)(Library)
