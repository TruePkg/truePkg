import path from 'path'

import debug from 'debug'
import stackTrace from 'stack-trace'

export default target => {
  const echo = () => {
    const trace = stackTrace.get()
    if (trace.length > 1) {
      const deep = 2
      const frame = trace[deep]
      const basename = path.basename(frame.getFileName()).replace('.js', '')
      const method = frame.getFunctionName()
      const functionName = method ? method : 'anonymous'
      return ` ${basename}:${functionName}:${frame.getLineNumber()}`
    }
    return ' '
  }
  const logger = {
    log: debug(`TP:${target}${echo()}`), // eslint-disable-line
    error: debug(`TP:${target}${echo()}`) // eslint-disable-line
  }

  logger.log.log = console.log.bind(console) // eslint-disable-line
  logger.error.log = console.error.bind(console) // eslint-disable-line

  return logger
}
