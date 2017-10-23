require('../db/mongoose')

/* eslint-disable no-dupe-keys */
const _ = require('lodash')

var {
  Property
} = require('./models/property')

var {
  Province
} = require('./models/province')

const findProvinceByLocation = (x, y) => {
  return Province.find({
    'boundaries.upperLeft.x': {
      $lte: x
    },
    'boundaries.bottomRight.x': {
      $gte: x
    },
    'boundaries.upperLeft.y': {
      $gte: y
    },
    'boundaries.bottomRight.y': {
      $lte: y
    }
  })
}

const createProperty = (prop) => {
  return new Promise((resolve, reject) => {
    const property = new Property({
      title: prop.title,
      price: prop.price,
      description: prop.description,
      beds: prop.beds,
      baths: prop.baths,
      squareMeters: prop.squareMeters,
      x: prop.x,
      y: prop.y
    })

    property.save()
      .then((doc) => {
        fullProperty(doc)
          .then((propObj) => {
            resolve(propObj)
          })
      })
      .catch((e) => {
        reject(e)
      })
  })
}

const findPropertyById = (id) => {
  return new Promise((resolve, reject) => {
    Property.findOne({
        'id': id
      })
      .then((doc) => {
        if (!doc) {
          return resolve(null)
        }

        fullProperty(doc)
          .then((propObj) => {
            return resolve(propObj)
          })
      })
      .catch((e) => {
        reject(e)
      })
  })
}

const findPropertyByQuadrant = (ax, ay, bx, by) => {
  return new Promise((resolve, reject) => {
    Property.find({
        'x': {
          $gte: ax,
          $lte: bx
        },
        'y': {
          $gte: by,
          $lte: ay
        },
      })
      .then((docs) => {
        var retObj = {}
        retObj.foundProperties = docs.length

        if (!docs.length) return resolve(retObj)

        var fullProperties = []

        for (var i = 0; i < docs.length; i++) {
          fullProperties.push(fullProperty(docs[i]))
        }
        Promise.all(fullProperties)
          .then((result) => {
            retObj.properties = result
            return resolve(retObj)
          })
      })
      .catch((e) => {
        return reject(e)
      })
  })
}

const fullProperty = (prop) => {
  return new Promise((resolve, reject) => {
    findProvinceByLocation(prop.x, prop.y)
      .then((provinces) => {
        if (!provinces.length) {
          throw new Error(`None provices for property ${prop.id} : ${prop.title}`)
        }
        var propObject = prop.toObject()
        propObject.provinces = []

        for (var i = 0; i < provinces.length; i++) {
          propObject.provinces.push(provinces[i].name)
        }

        resolve(_.pick(propObject, 'id', 'title', 'price', 'description', 'x', 'y', 'beds', 'baths', 'provinces', 'squareMeters'))
      })
      .catch((e) => {
        reject(e)
      })
  })
}

module.exports = {
  createProperty,
  findPropertyById,
  findPropertyByQuadrant
}
