import hapiPlayground from 'graphql-playground-middleware-hapi'

export default {
  plugin: hapiPlayground,
  options: {
    path: `/playground`, //eslint-disable-line
    endpoint: `/graphql` //eslint-disable-line
  }
}
