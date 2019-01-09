import React from 'react'

interface Props {
  children: React.ReactNode
}

class BlockQuote extends React.PureComponent<Props> {
  public render() {
    return (
      <blockquote>
        <p>
          {this.props.children}
        </p>
      </blockquote>
    )
  }
}

export default BlockQuote
