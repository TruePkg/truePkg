// import Confidence from 'confidence'

import playground from './playground'
import Config from './config'
import graphql from './graphql'
import { userPlugins } from './users'

// const mongo = require('./mongo')

// const criteria = { env: process.env.NODE_ENV }
const manifest = {
  $meta: 'main server manifest',
  server: Config.get('/server'),
  register: {
    plugins: [
      {
        plugin: require('./hello')
      },
      // {
      //   plugin: require('./login')
      // },
      // {
      //   plugin: mongo
    // },
      graphql,
      playground
    ]
  }
}

manifest.register.plugins = manifest.register.plugins.concat(userPlugins)
export default manifest
