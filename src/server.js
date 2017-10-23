/**
 * @file Starts the application by creating a HTTP server that holds the API
 */
require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./config/routes')

const app = express()

app.use(bodyParser.json())

routes(app)

const server = app.listen(process.env.PORT, () => {
  log.info(`Started on: http://localhost:${process.env.PORT}`)
})

module.exports = {
  app,
  server
}
