import { Book } from '../../../typings/custom'

export interface Row {
  rowData: {
    id: Book['id']
    name: Book['name']
  }
}
