export const isValidIndex = <T>(array: T[], index: number) => Array.isArray(array) && index > -1

export const parseArray = (serialized: string | void) => (serialized ? serialized.split(',') : [])

export const serializeArray = (array: string[] | void) =>
  Array.isArray(array) ? array.join(',') : ''
