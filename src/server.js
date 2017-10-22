require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./config/routes')

var app = express()

app.use(bodyParser.json())

routes(app)

app.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT}`)
})

module.exports = {
  app
}
