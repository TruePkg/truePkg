import Hoek from 'hoek'
import _ from 'lodash'

const mongo = {}

mongo.uri = process.env.MONGODB_URI || 'mongodb+srv://devadmin:huzzah@cluster0-g1jmo.mongodb.net/test?retryWrites=true'

Hoek.assert(!_.isEmpty(mongo.uri), 'you must have a mongo uri set')

export default mongo
