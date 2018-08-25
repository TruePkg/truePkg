import Bcrypt from 'bcryptjs'
import Boom from 'boom'
import Joi from 'joi'

import Users from '../models/users'
import { createJwt } from '../helpers'
/**
 * Plugin
 *
 **/


const handler = async (request, h) => {
  const payload = request.payload
  try {
    console.log(payload, ' this is the payload, hello testing a log in here')
    // log(payload, 'payload')
    const userCheck = await Users.findOne({ email: payload.email, organization: payload.organization }).exec()
    if (userCheck) {
      throw Boom.unauthorized()
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
    const saltRounds = 10
    const salt = await Bcrypt.genSalt(saltRounds)
    const hash = await Bcrypt.hash(payload.password, salt)
    update.$set.password = hash

    const user = await Users.findOneAndUpdate({ email: payload.email }, update, { upsert: true, new: true }).exec()
    const token = createJwt(user)
    return h.response({ token, user })
  } catch (error) {
    throw Boom(error)
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
