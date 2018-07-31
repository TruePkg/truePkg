// import Bcrypt from 'bcrypt'
// import Boom from 'boom'
// import Joi from 'joi'

// import Users from '../models/users'

/**
 * Plugin
 *
 **/
import Logger from '../helpers/logger'

const log = Logger('login').log

const handler = async (request, h) => {
  return h.response('Ok')
}

exports.plugin = {
  name: 'logout',
  register: async (server, options) => {
    server.route({
      method: 'POST',
      path: '/logout',
      handler,
      config: {
        auth: false
      }
    })
    return Promise.resolve()
  }
}
