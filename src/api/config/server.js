
import Events from 'events'

const maximumListeners = 100
Events.EventEmitter.prototype._maxListeners = maximumListeners
process.setMaxListeners(maximumListeners)

export default {
  port: process.env.PORT,
  host: '0.0.0.0',
  routes: {
    cors: true
  }
}
