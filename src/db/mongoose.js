/**
 * Connect the database 
 */
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
  })
  .then((cnn) => {
    log.info(`Connected to DB: ${cnn.host}:${cnn.port}/${cnn.name}`)
  })
  .catch((e) => {
    log.error('Unable to connect database!')
    log.error(e);
  })

module.exports = {
  mongoose
}
