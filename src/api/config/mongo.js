import Hoek from 'hoek'
import _ from 'lodash'

const mongo = {}

mongo.uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test-tp'

Hoek.assert(!_.isEmpty(mongo.uri), 'you must have a mongo uri set')

export default mongo
