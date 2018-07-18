import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const customerSchema = new Schema({
  name: { type: String, default: '' },
  agentid: { type: Schema.ObjectId, ref: 'Users' },
  status: { type: String }
})

let Customers
try {
  Customers = Mongoose.model('Customers', customerSchema)
} catch (error) {
  Customers = Mongoose.model('Customers')
}

module.exports = Customers
