/**
 * Encapsulate data accesses 
 */

require('../db/mongoose')

/* eslint-disable no-dupe-keys */
const _ = require('lodash')

var {
  Property
} = require('./models/property')

var {
  Province
} = require('./models/province')

/**
 * @param {number} x Coordinate 'x' of the point
 * @param {number} y Coordinate 'y' of the point
 * @description Return all provinces by a specific point
 */
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

/**
 * @param {Object} prop Property request body
 * @description Create a new Property
 */
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

/**
 * @param {number} id Property Id
 * @description Return a Property with an array of Provinces
 */
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

/**
 * @param {number} ax Coordinate 'x' of the point A
 * @param {number} ay Coordinate 'y' of the point A
 * @param {number} bx Coordinate 'x' of the point B
 * @param {number} by Coordinate 'y' of the point B
 * @description Return an object that contains an array of all the Properties founded in the quadrant (ax,ay)(bx,by)
 */
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

/**
 * @param {Property} prop
 * @description Build a representation of a Property with an array of Provinces
 */
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
