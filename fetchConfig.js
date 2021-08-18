const fs = require('fs')
const request = require('request')
const path = require('path')
const categoriesDatabaseId = '741a0da234f64a7e8404ae8d433b26e4'
const WORKER_ENDPOINT = data.replace('WORKER_ENDPOINT=', '')

request
  .get(`${WORKER_ENDPOINT}/v1/table/${categoriesDatabaseId}`)
  .pipe(
    fs.createWriteStream(path.join(__dirname, './src/store/categories.json'))
  )
