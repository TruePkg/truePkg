import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const userSchema = new Schema({
  name: { type: String, default: '' },
  organization: {
    name: { type: String, default: '' },
    office: { type: String, default: '' },
    offcies: { type: Array, default: [] }
  },
  profile: {
    name: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' }
  },
  roles: { type: Array, default: ['basic bitch'] },
  password: { type: String, default: '' },
  gender: { type: String, default: 'male' },
  managerid: { type: Schema.ObjectId, ref: 'Users' },
  customerids: [{ type: Schema.ObjectId, ref: 'Customers' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  dialogflow: {
    userStorage: { type: Object, default: {} }
  }
})

let Users

try {
  Users = Mongoose.model('Users', userSchema)
} catch (error) {
  Users = Mongoose.model('Users')
}
module.exports = Users
