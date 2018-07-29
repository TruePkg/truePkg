import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const quoteSchema = new Schema({
  agentid: { type: Schema.ObjectId, ref: 'Quotes' },
  customerid: { type: Schema.ObjectId, ref: 'Customers' },
  lead: { type: Schema.ObjectId, ref: 'Leads' },
  details: { type: Object, default: {} }
})

let Quotes

try {
  Quotes = Mongoose.model('Quotes', quoteSchema)
} catch (error) {
  Quotes = Mongoose.model('Quotes')
}

module.exports = Quotes
