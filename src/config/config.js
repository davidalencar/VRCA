/**
 * @file Initialize the environment variables
 */

const Log = require('log')
log = new Log('info')

var env = process.env.NODE_ENV || 'development'

log.info(`Set environment: "${env}"`)

if (env === 'development' || env === 'test') {
  var config = require('./config.json')
  var envConfig = config[env]
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
  })
}
