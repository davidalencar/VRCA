require('../config/config')
const {
  mongoose
} = require('../db/mongoose')
const {
  Province
} = require('../domain/models/province')
const {
  Property
} = require('../domain/models/property')

const importProvinces = new Promise((resolve, reject) => {
  const provincesData = require('./data/provinces-data.json')
  const provincesDataKeys = Object.keys(provincesData)
  var saves = []
  for (var i = 0; i < provincesDataKeys.length; i++) {
    var province = new Province({
      name: provincesDataKeys[i],
      boundaries: provincesData[provincesDataKeys[i]].boundaries
    })
    saves.push(province.save())
  }
  Promise.all(saves)
    .then((ret) => {
      resolve()
    })
    .catch((e) => {
      reject(e)
    })
})

const importProperties = new Promise((resolve, reject) => {
  const propertiesData = require('./data/properties-data.json').properties
  var saves = []
  for (var i = 0; i < propertiesData.length; i++) {
    const propData = propertiesData[i]
    var property = new Property({
      id: propData.id,
      title: propData.title,
      price: propData.price,
      description: propData.description,
      x: propData.lat,
      y: propData.long,
      beds: propData.beds,
      baths: propData.baths,
      squareMeters: propData.squareMeters
    })
    saves.push(property.save().then((doc) => {
      doc.id = propData.id;
      return doc.save();
    }))
  }
  Promise.all(saves)
    .then((ret) => {
      resolve()
    })
    .catch((e) => {
      reject(e)
    })
})

Promise.all([importProvinces, importProperties])
  .then((result) => {
    mongoose.connection.close()
  })
