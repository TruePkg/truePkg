import Bcrypt from 'bcryptjs'
import Boom from 'boom'
import Joi from 'joi'

import Users from '../models/users'
import { createJwt } from '../helpers'
/**
 * Plugin
 *
 **/
// import Logger from '../helpers/logger'

// const log = Logger('login').log

const handler = async (request, h) => {
  const payload = request.payload
  try {
    // console.log(payload, 'asdfsafdsdaf')
    // return 'wtf bitch'
    console.log(payload, ' this is the payload, hello testing a log in here')
    // log(payload, 'payload')
    const userCheck = await Users.findOne({ email: payload.email }).exec()
    if (userCheck) {
      console.log(userCheck, 'aaaaaaaaaaaaaaaa')
      return Boom.unauthorized()
    }
    const update = {
      $set: {
        organization: {
          name: payload.organization
        },
        profile: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          name: `${payload.firstName} ${payload.lastName}`
        },
        role: payload.role,
        email: payload.email
      },
      $addToSet: {
        roles: payload.role
      }
    }
    console.log(update, 'updateeeee')
    const saltRounds = 10
    const salt = await Bcrypt.genSalt(saltRounds)
    const hash = await Bcrypt.hash(payload.password, salt)
    console.log(salt, hash, 'fuck me in the asss')
    update.$set.password = hash
    // Bcrypt.genSalt(saltRounds, (err, salt) => {
    //   console.log(err, 'bcrypt serror')
    //   Bcrypt.hash(payload.password, salt, (err, hash) => {
    //     // Store hash in your password DB.
    //     console.log(err, 'bycrpt hash error fmasss')
    //     update.$set.password = hash
    //     console.log(hash, 'this is the hash?')
    //   })
    // })
    const user = await Users.findOneAndUpdate({ email: payload.email }, update, { upsert: true, new: true }).exec()
    console.log(user, 'why the FUCK is this user not owrking')
    const token = createJwt(user)
    console.log(token, 'how the FUCK does bitcooin work')
    return h.response(token)
  } catch (error) {
    console.log(error, 'what the actual FUCK')
    return error
  }
}

exports.plugin = {
  name: 'users',
  register: async (server, options) => {
    server.route({
      method: 'POST',
      path: '/users',
      handler,
      config: {
        auth: false,
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            organization: Joi.string().required(),
            role: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
          }
        }
      }
    })
    return Promise.resolve()
  }
}
