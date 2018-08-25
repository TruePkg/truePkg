import login from './login'
import logout from './logout'
import postUsers from './post-users'
import postCsv from './post-csv'
import postSignature from './post-signature'

export const userPlugins = [
  login,
  logout,
  postUsers,
  postCsv,
  postSignature
]
