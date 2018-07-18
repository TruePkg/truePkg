import { graphqlHapi } from 'apollo-server-hapi'

import schema from './schema'

export default {
  plugin: graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: ({ payload }) => {
      console.log(payload, '<-- our graphQL request body')
      return {
        schema
      }
    }
  }
}

