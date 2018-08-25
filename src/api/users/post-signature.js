import Aws from '../services/aws'

const handler = async (request, h) => {
  const aws = new Aws()
  const payload = request.payload
  const url = await aws.getSignedUrl(
    payload.fileName,
    payload.fileType
  )
  return h.response(url)
}

exports.plugin = {
  name: 'signature',
  register: async (server, options) => {
    server.route({
      method: 'POST',
      path: '/users/signature',
      handler,
      config: {
        auth: false
      }
    })
    return Promise.resolve()
  }
}
