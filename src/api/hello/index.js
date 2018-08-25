/**
 * Hello
 * Returns a hello world message and the hostname of the machine the
 * server is running on
 *
 * url: /hello
 */

/**
 * System imports
 *
 **/

/**
 * Plugin
 *
 **/
import Logger from '../helpers/logger'

const log = Logger('hello').log

exports.plugin = {
  name: 'hello',
  register: async (server, options) => {
    server.route({
      method: 'POST',
      path: '/hello',
      handler: async (request, h) => {
        log('hi')
        const obj = {
          value: 'it works'
        }
        const response = h.response(obj)
        // response.type('application/json')
        console.log(request.payload, 'safdsafsfsf')
        return response
      }
    })
    return Promise.resolve()
  }
}
