import hapi from 'hapi'
import mongoose from 'mongoose'
import lambdaPlayground from 'graphql-playground-middleware-lambda'
import Bluebird from 'bluebird'

import Manifest from './src/api/manifest'

let server = null
const MongoDBUrl = process.env.MONGODB_URI

const options = {
  // useMongoClient: true,
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
// options.socketOptions = {}
// options.socketOptions.keepAlive = 30000
// options.socketOptions.connectTimeoutMS = 300000
// options.socketOptions.socketTimeoutMS = 120000
options.useNewUrlParser = true

exports.handler = async (event, context) => { //eslint-disable-line
  try {
    if (server === null) {
      server = new hapi.Server({
        host: 'localhost',
        port: 3002,
        routes: { cors: true }
      })
      await server.register(Manifest.register.plugins)
    }
    await mongoose.connect('mongodb+srv://devadmin:huzzah@cluster0-g1jmo.mongodb.net/test?retryWrites=true', options)
    await server.start()
  } catch (error) {
    return error
  }

  const { path, queryStringParameters: params, httpMethod: method, body: payload, headers: reqHeaders } = event

  let url = path
  if (params) {
    const qs = Object.keys(params).map(key => `${key}=${params[key]}`)
    if (qs.length > 0) url = `${url}?${qs.join('&')}`
  }
  const { statusCode, headers, result: body } = await server.inject({
    method,
    url,
    payload,
    headers: reqHeaders,
    validate: false
  })
  
  delete headers['content-encoding']
  delete headers['transfer-encoding']
  return { statusCode, headers, body: JSON.stringify(body) }
}

exports.playground = lambdaPlayground({
  endpoint: `/graphql`
})
