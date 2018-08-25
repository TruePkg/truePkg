import hapi from 'hapi'
import mongoose from 'mongoose'

import Manifest from './manifest'

let server = null
// const MongoDBUrl = 'mongodb://localhost:27017/test'
const MongoDBUrl = 'mongodb+srv://devadmin:huzzah@cluster0-g1jmo.mongodb.net/test?retryWrites=true'

exports.handler = async (event, context) => { //eslint-disable-line
  try {
    if (server === null) {
      server = new hapi.Server({
        host: 'localhost',
        port: 3000,
        routes: { cors: true }
      })
      await server.register(Manifest.register.plugins)
    }
    await server.start()
    mongoose.connect(MongoDBUrl, {}).then(() => {console.log('connected to mongo db')}).catch(error => {console.log(error, 'asfsafsaf')})
  } catch (error) {
    console.log('asdfsadf', error)
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
