import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const inventorySchema = new Schema({
  organization: { type: String, default: '' },
  adminid: { type: Schema.ObjectId, ref: 'Users' },
  items: { type: Array, default: [] }
})

let Inventory

try {
  Inventory = Mongoose.model('Inventory', inventorySchema)
} catch (error) {
  Inventory = Mongoose.model('Inventory')
}

module.exports = Inventory
