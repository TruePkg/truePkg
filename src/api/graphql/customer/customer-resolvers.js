import Customers from '../../models/customers'

export const customerResolvers = {
  Query: {
    getCustomerByName: async (root, params) => {
      const customer = await Customers.findOne({ name: params.name })
      return customer
    }
  },

  Mutation: {
    createCustomer: async (root, params) => {
      console.log(params)
      const customer = await Customers.findOneAndUpdate(
        { name: params.name },
        { $set: { name: params.name, agentid: params.agentid, status: 'prospect' } },
        { new: true, upsert: true }
      )
      return customer
    }
  }
}
