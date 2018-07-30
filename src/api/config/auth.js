// https://github.com/dwyl/hapi-auth-jwt2#optional-parameters
const auth = {}

auth.key = {
  $filter: 'env',
  development: 'development-key',
  sandbox: 'giQqgR98eAJJtF[92mRoAnV]U3}sUhtPd$z&vW]>h7%Us3R24ZL)Kb3)',
  production: process.env.JWT_SECRET || 'giQqgR98eAJJtF[92mRoAnV]U3}sUhtPd$z&vW]>h7%Us3R24ZL)Kb3)',
  test: 'test-key',
  $default: null
}

auth.expires = {
  $filter: 'env',
  development: '30d',
  sandbox: '30d',
  production: '30d',
  test: '1m',
  $default: '1h'
}

auth.verifyOptions = {
  algorithms: ['HS256']
}

auth.complete = false
auth.headerKey = process.env.NODE_ENV === 'test' ? true : false
// auth.ignoreExpiration = process.env.NODE_ENV === 'production' ? false : true
auth.urlKey = process.env.NODE_ENV === 'test' ? false : 'jwt'

export default auth
