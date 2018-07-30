/**
 * Module imports
 *
 **/
import Confidence from 'confidence'

/**
 * Project imports
 *
 **/

import pkg from '../../../package.json'

const criteria = {
  env: process.env.NODE_ENV,
  dockerEnv: process.env.DOCKER_ENV
}

import server from './server'
import auth from './auth'

const config = {
  $meta: 'main server config',
  pkg,
  server,
  auth
}

const store = new Confidence.Store(config)

export default {
  get: key => store.get(key, criteria),
  load: doc => store.load(doc),
  store
}
