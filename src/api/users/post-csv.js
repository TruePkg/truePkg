import csv from 'csvtojson'
import Request from 'request-promise'

// const Json2csvParser = require('json2csv').Parser

// const fields = ['name', 'description', 'sku', 'price']

// const opts = { fields }

// const fakeData = [
//   {
//     name: 'box',
//     description: 'a box',
//     sku: 247,
//     price: 1
//   },
//   {
//     name: 'cat',
//     description: 'a cat',
//     sku: 247,
//     price: 1
//   },
//   {
//     name: 'lid',
//     description: 'a lid',
//     sku: 247,
//     price: 1
//   }
// ]

const handler = async (request, h) => {
  const payload = request.payload
  try {
    const options = {
      method: 'GET',
      uri: payload.csvUrl,
      headers: {},
      json: true
    }
    try {
      const stream = await Request(options)
      return csv()
        .fromString(stream)
        .then(obj => {
          console.log(csv, 'csv object ')
          return h.response(obj)
        })
        .catch(err => {console.log(error, 'why')})
    } catch (error) {
      throw error
      console.log(error, 'whyyyyy')
    }
    // console.log(stream, 'hello?')
    // const myData = []
    // for (let i = 0; i < fakeData.length; i++) {
    //   const data = {}
    //   const d = fakeData[i]
    //   data.Name = d.name
    //   data.Description = d.description
    //   data.SKU = d.sku
    //   data.Price = d.price
    //   myData.push(data)
    // }
    // const parser = new Json2csvParser({ opts })
    // const fakeCsv = parser.parse(myData)
    // const json = await parse(csv, { columns: true })
    // return csv()
    //   .fromStream(stream)
    //   .then(obj => {
    //     console.log(csv, 'csv object ')
    //     return obj
    //   })
    //   .catch(err => {console.log(error, 'why')})
  } catch (error) {
    return error
  }
}

exports.plugin = {
  name: 'csv',
  register: async (server, options) => {
    server.route({
      method: 'POST',
      path: '/csv',
      handler,
      config: {
        auth: false
      }
    })
    return Promise.resolve()
  }
}
