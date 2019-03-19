import highlightJs from 'highlight.js'
import React, { createRef, PureComponent } from 'react'

// import '../code-block.global.css'

interface Props {
  value: string
}

class CodeBlock extends PureComponent<Props> {
  private codeBlock = createRef<HTMLElement>()

  constructor(props: Props) {
    super(props)
  }

  public componentDidMount() {
    this.highlightCode()
  }

  public componentDidUpdate() {
    this.highlightCode()
  }

  public render() {
    return (
      <pre>
        <code className="br2" ref={this.codeBlock}>
          {this.props.value}
        </code>
      </pre>
    )
  }

  private highlightCode = () => {
    if (this.codeBlock.current) {
      highlightJs.highlightBlock(this.codeBlock.current)
    }
  }
}

export default CodeBlock
