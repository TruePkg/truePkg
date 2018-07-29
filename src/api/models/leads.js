import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const leadSchema = new Schema({
  agentid: { type: Schema.ObjectId, ref: 'Users' },
  customerid: { type: Schema.ObjectId, ref: 'Customers' },
  details: { type: Object, default: {} }
})

let Leads

try {
  Leads = Mongoose.model('Leads', leadSchema)
} catch (error) {
  Leads = Mongoose.model('Leads')
}

module.exports = Leads
