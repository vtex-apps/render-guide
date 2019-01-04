export const serializeArray = (array: string[] | void) => Array.isArray(array)
  ? array.join(',')
  : undefined

export const parseArray = (serialized: string | void) => serialized
  ? serialized.split(',')
  : []
