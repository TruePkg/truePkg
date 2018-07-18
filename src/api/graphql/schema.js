import { makeExecutableSchema } from 'graphql-tools'
import _ from 'lodash'

// import userSchema from './user/user-schema'

import { userType, userResolvers } from './user'
import { customerType, customerResolvers } from './customer'
import { itemType, itemResolvers } from './item'

const baseSchema = `
schema {
  query: Query
  mutation: Mutation
}
`

const schema = makeExecutableSchema({
  typeDefs: [
    baseSchema,
    userType.default,
    customerType.default,
    itemType.default
  ],
  resolvers: _.merge(
    {},
    userResolvers,
    customerResolvers,
    itemResolvers
  )
})

export default schema

