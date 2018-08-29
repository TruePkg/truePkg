import jwt from 'jsonwebtoken'

import Quotes from '../models/quotes'


const handler = async (request, h) => {
  const token = request.query.token
  const decoded = await jwt.decode(token)
  const userid = decoded.id
  const quotes = await Quotes.findOne({ agentid: userid }).exec()
  return h.response(quotes.quotes)
}

exports.plugin = {
  name: 'getquote',
  register: async (server, options) => {
    server.route({
      method: 'GET',
      path: '/users/quotes',
      handler,
      config: {
        auth: false
      }
    })
    return Promise.resolve()
  }
}