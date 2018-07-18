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
  name: 'smd',
  register: async (server, options) => {
    server.route({
      method: 'GET',
      path: '/hello',
      handler: async (request, h) => {
        log('hi')
        return 'it works'
      }
    })
    return Promise.resolve()
  }
}
