import React from 'react'
import { Input } from 'vtex.styleguide'

import { Book } from '../interfaces'

interface Props {
  book: Partial<Book>
}

export const DetailEditorPreview: React.SFC<Props> = ({book}) => (
  <div className="w-40">
    <div className="mb5">
      <Input
        label="ID"
        value={book.id}
        disabled
      />
    </div>
    <div className="mb5">
      <Input
        label="Name"
        value={book.name}
        disabled
      />
    </div>
  </div>
)
