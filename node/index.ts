import { Service } from '@vtex/api'

import { Clients } from './clients'
import resolvers from './resolvers'

export { Runtime } from '@vtex/api'

const TWO_SECONDS_S = 2

export default new Service({
  clients: {
    implementation: Clients,
    options: {
      default: {
        timeout: TWO_SECONDS_S,
      },
    },
  },
  graphql: {
    resolvers,
  },
})
