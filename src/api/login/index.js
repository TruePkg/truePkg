// import Bcrypt from 'bcryptjs'
// import Boom from 'boom'
// import Joi from 'joi'

// import Users from '../models/users'
// import { createJwt } from '../helpers'
// /**
//  * Plugin
//  *
//  **/
// import Logger from '../helpers/logger'

// const log = Logger('login').log

// const handler = async (request, h) => {
//   try {
//     const payload = request.payload
//     log(payload, 'payload')
//     const organization = payload.organization
//     const email = payload.email
//     const password = payload.password
//     const role = payload.role
//     const user = await Users.findOne({ email, role, organization }).exec()
//     if (!user) {
//       return Boom.unauthorized()
//     }
//     // const saltRounds = 10
//     // Bcrypt.genSalt(saltRounds, function(err, salt) {
//     //     Bcrypt.hash(payload.password, salt, function(err, hash) {
//     //         // Store hash in your password DB.
//     //         console.log(hash, 'sadfsadf')
//     //     })
//     // })
//     const success = await Bcrypt.compare(password, user.password)
//     if (success) {
//       const token = createJwt(user)
//       return token
//     } else {
//       return Boom.notFound('Sorry, that password or email is not recognized.')
//     }
//   } catch (error) {
//     throw error
//   }
// }

// exports.plugin = {
//   name: 'login',
//   register: async (server, options) => {
//     server.route({
//       method: 'POST',
//       path: '/login',
//       handler,
//       config: {
//         auth: false,
//         validate: {
//           payload: {
//             email: Joi.string().email().required(),
//             password: Joi.string().required(),
//             organization: Joi.string().required(),
//             role: Joi.string().required()
//           }
//         }
//       }
//     })
//     return Promise.resolve()
//   }
// }
