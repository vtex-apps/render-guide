import React, { Component } from 'react'
import { MutationFn } from 'react-apollo'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'

interface CustomProps {
  id: string
  isDisabled: boolean
  isLoading: boolean
  mutation: MutationFn<any>
}

type Props = CustomProps & RenderContextProps

class DeleteButton extends Component<Props> {
  public render() {
    return (
      <Button
        isDisabled={this.props.isDisabled}
        isLoading={this.props.isLoading}
        onClick={this.handleDelete}
        variation="danger"
      >
        Delete
      </Button>
    )
  }

  private handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    const { id, mutation, runtime } = this.props

    try {
      await mutation({
        variables: { id },
      })

      runtime.navigate({
        page: 'guide.topic',
        params: { topic: 'dynamic-pagination' },
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default withRuntimeContext(DeleteButton)
