const fs = require('fs')
const request = require('request')
const path = require('path')
const databaseId = 'aff4b7df4b2f451aaf2f9d53e21b1bdd'
const env = fs.readFileSync(path.join(__dirname, '/.env'), 'utf-8')
const WORKER_ENDPOINT = env.replace('WORKER_ENDPOINT=', '')

request
  .get(`${WORKER_ENDPOINT}/v1/table/${databaseId}`)
  .pipe(fs.createWriteStream(path.join(__dirname, './src/mocks/items.json')))
