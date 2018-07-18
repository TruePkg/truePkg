import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const itemSchema = new Schema({
  description: { type: String },
  name: { type: String },
  sku: { type: String },
  price: { type: Number },
  agentid: { type: Schema.ObjectId, ref: 'Users' }
})

let Items

try {
  Items = Mongoose.model('Items', itemSchema)
} catch (error) {
  Items = Mongoose.model('Items')
}

module.exports = Items
