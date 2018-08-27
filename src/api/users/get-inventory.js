import jwt from 'jsonwebtoken'

import Inventory from '../models/inventory'


const handler = async (request, h) => {
  console.log('made it in herer')
  const token = request.query.token
  const decoded = await jwt.decode(token)  
  const inventory = await Inventory.findOne({ organization: decoded.organization.name }).exec()
  if (!inventory) {
    return h.response([])
  } else {
    return h.response(inventory)
  }
}

exports.plugin = {
  name: 'inventory',
  register: async (server, options) => {
    server.route({
      method: 'GET',
      path: '/users/inventory',
      handler,
      config: {
        auth: false
      }
    })
    return Promise.resolve()
  }
}
