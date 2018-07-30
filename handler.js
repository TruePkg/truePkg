import hapi from 'hapi'
import mongoose from 'mongoose'
import lambdaPlayground from 'graphql-playground-middleware-lambda'

import Manifest from './src/api/manifest'

let server = null
const MongoDBUrl = process.env.MONGODB_URI

exports.handler = async (event, context) => { //eslint-disable-line
  try {
    if (server === null) {
      server = new hapi.Server({
        host: 'localhost',
        port: 3001,
        routes: { cors: true }
      })
      await server.register(Manifest.register.plugins)
    }
    mongoose.connect('mongodb+srv://devadmin:huzzah@cluster0-g1jmo.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }).then(() => {console.log('connected to mongo db')}).catch(error => {console.log(error, 'asfsafsaf')})
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
  return { statusCode, headers, body }
}

exports.playground = lambdaPlayground({
  endpoint: `/graphql`
})
