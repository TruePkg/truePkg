import Users from '../../models/users'

export const userResolvers = {
  Query: {
    getUser: async (root, params) => {
      console.log(root, params)
      let user
      if (params.name) {
        user = await Users.findOne({ name: params.name })
      }
      if (params.gender) {
        user = await Users.findOne({ gender: params.gender })
      }
      return user
    }
  },
  Mutation: {
    createUser: async (root, params) => {
      console.log(root, params)
      const user = await Users.findOneAndUpdate(
        { name: params.name },
        { $set: { name: params.name, gender: params.gender } },
        { new: true, upsert: true }
      )
      return user
    }
  }
}

