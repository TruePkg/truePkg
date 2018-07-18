import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const userSchema = new Schema({
  name: { type: String, default: '' },
  roles: [{ type: String }],
  gender: { type: String, default: 'male' },
  managerid: { type: Schema.ObjectId, ref: 'Users' },
  customerids: [{ type: Schema.ObjectId, ref: 'Customers' }],
  createdAt: { type: String },
  updatedAt: { type: String }
})

let Users

try {
  Users = Mongoose.model('Users', userSchema)
} catch (error) {
  Users = Mongoose.model('Users')
}
module.exports = Users
