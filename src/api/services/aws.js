// import moment from 'moment'
import AWS from 'aws-sdk'

import Logger from '../helpers/logger'
// import Config from '../config'

// const config = Config.get('/aws')
// const log = Logger('aws service logger').log

export default class Aws {
  constructor() {
    this.accessKeyId = process.env.AWS_ACCESS_KEY_ID
    this.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  }

  async getSignedUrl(name, type) {
    AWS.config.update({ accessKeyId: this.accessKeyId, secretAccessKey: this.secretAccessKey })
    const s3 = new AWS.S3({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey
    })

    try {
      const url = await s3.getSignedUrl('putObject', {
        Bucket: 'truepackageinventory',
        Key: name,
        Expires: 60,
        ContentType: type,
        ACL: 'public-read'
      })
      return { signedRequest: url }
    } catch (error) {
      return 'no data'
    }
  }
}
