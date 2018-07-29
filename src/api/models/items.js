import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const itemSchema = new Schema({
  description: { type: String, default: '' },
  name: { type: String, default: '' },
  sku: { type: String, default: '' },
  price: { type: Number, default: 0 },
  agentid: { type: Schema.ObjectId, ref: 'Users' }
})

let Items

try {
  Items = Mongoose.model('Items', itemSchema)
} catch (error) {
  Items = Mongoose.model('Items')
}

module.exports = Items
