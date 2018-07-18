import Items from '../../models/items'

export const itemResolvers = {
  Query: {
    getItemByName: async (root, params) => {
      const item = await Items.findOne({ name: params.name })
      return item
    }
  }
}
