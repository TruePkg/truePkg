import Hoek from 'hoek'
import Jwt from 'jsonwebtoken'

import Config from '../config'

export const createJwt = user => {
  const contents = {
    id: user._id,
    scope: user.roles,
    organization: user.organization,
    createdAt: Date.now()
  }

  const options = Hoek.applyToDefaults(
    {
      key: null,
      expires: '1m',
      verifyOptions: { algorithms: ['HS256'] }
    },
    Config.get('/auth')
  )

  const token = Jwt.sign(contents, options.key, {
    algorithm: options.verifyOptions.algorithms[0],
    expiresIn: options.expires
  })

  return token
}
