import jwt from 'jsonwebtoken'

import Quotes from '../models/quotes'


const handler = async (request, h) => {
  try {
    const payload = request.payload
    const token = request.payload.token
    const decoded = await jwt.decode(token)
    const userid = decoded.id
    const update = {
      $push: {
        quotes: payload.quote
      }
    }
    const quote = await Quotes.findOneAndUpdate({ agentid: userid }, update, { upsert: true, new: true } ).exec()
    return h.response(quote)
  } catch (error) {
    throw error
  }
}

exports.plugin = {
  name: 'post quote',
  register: async (server, options) => {
    server.route({
      method: 'POST',
      path: '/users/quote',
      handler,
      config: {
        auth: false
      }
    })
    return Promise.resolve()
  }
}
