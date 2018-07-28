/**
 * Mongo
 * Sets up our mongo connection
 */

/**
 * Module imports
 *
 **/
import _ from 'lodash'
import Bluebird from 'bluebird'
import Hoek from 'hoek'
import Mongoose from 'mongoose'

import Config from '../config'
import Logger from '../helpers/logger'

const log = Logger('mongo').log

/**
 * Project imports
 */

/**
 * Setup
 *
 **/
Bluebird.config({
  // http://bluebirdjs.com/docs/api/promise.config.html
  // Enable cancellation
  cancellation: false,
  // Enable long stack traces
  longStackTraces: true,
  // Enable monitoring
  monitoring: true,
  // Enable warnings
  warnings: true
})

global.Promise = Bluebird
// @TODO Use native promises
// Mongoose.Promise = global.Promise
Mongoose.Promise = Bluebird

let defaults = Config.get('/mongo')

const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}

options.db = { native_parser: true } // eslint-disable-line camelcase
options.autoReconnect = true
options.promiseLibrary = Bluebird
options.socketOptions = {}
options.socketOptions.keepAlive = 30000
options.socketOptions.connectTimeoutMS = 300000
options.socketOptions.socketTimeoutMS = 120000

/**
 * Plugin
 *
 **/

exports.plugin = {
  name: 'mongo'
}

exports.plugin.register = async (server, options, next) => {
  // defaults = Hoek.applyToDefaults(defaults, options)
  defaults = {
    uri: 'mongodb+srv://devadmin:huzzah@cluster0-g1jmo.mongodb.net/test?retryWrites=true'
  }

  const isNotProduction = !_.includes(['production'], process.env.NODE_ENV)
  const isNotTesting = !_.includes(['test'], process.env.NODE_ENV)
  Mongoose.set('debug', isNotTesting)

  if (Mongoose.connection.readyState) {
    log('Mongo: next, readyState') // eslint-disable-line
    await Promise.resolve()
  }
  console.log('asdfsafsfd')
  // setup our connection
  log(['server', 'database', 'connection'], `${process.env.NODE_ENV} server CONNECTING to ${defaults.uri}`)

  /*
  NOTE: When your application starts up, Mongoose automatically calls createIndex for each defined
  index in your schema. Mongoose will call createIndex for each index sequentially, and emit an 'index'
  event on the model when all the createIndex calls succeeded or when there was an error. While nice for
  development, it is recommended this behavior be disabled in production since index creation can cause
  a significant performance impact. Disable the behavior by setting the autoIndex option of your schema to
  false, or globally on the connection by setting the option config.autoIndex to false.
  Online Reference
    http://mongoosejs.com/docs/guide.html
  */
  options.config = { autoIndex: isNotProduction }

  Mongoose.connect(defaults.uri, options).then(async () => {
    log(['server', 'database', 'connection'], `${process.env.NODE_ENV} server CONNECTED to ${defaults.uri}`)
    log('Mongo: next, connect') // eslint-disable-line
    // return next() // call the next item in hapi bootstrap
    await Promise.resolve()
  })

  /* istanbul ignore next */
  server.ext({
    type: 'onPostStop',
    method: (request, done) => {
      const startDisconnect = `${process.env.NODE_ENV} server DISCONNECTING from ${defaults.uri} due to server shutdown`
      const endDisconnect = `${process.env.NODE_ENV} server DISCONNECTED from ${defaults.uri} due to server shutdown`
      log(['server', 'database', 'connection'], startDisconnect)
      log(startDisconnect) // eslint-disable-line no-console

      const disconnectDB = () => {
        Mongoose.disconnect(() => {
          log(['server', 'database', 'connection'], endDisconnect)
          log(endDisconnect) // eslint-disable-line no-console
          return done()
        })
      }

    //   if (process.env.NODE_ENV === 'feature' && process.env.JOBS !== 'true') {
    //     log('We are on a feature branch, so drop database on server stop') // eslint-disable-line no-console
    //     Mongoose.connection.dropDatabase(err => {
    //       if (err) {
    //         log('There was an error dropping DB', err) // eslint-disable-line no-console
    //       } else {
    //         log('Database dropped') // eslint-disable-line no-console
    //       }
    //       disconnectDB()
    //     })
    //   } else {
    //     disconnectDB()
    //   }
    }
  })
}

