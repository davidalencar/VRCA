const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

var PropertySchema = mongoose.Schema({
  id: {
    type: Number
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'Field `title` must be completed'],
    minlength: 20,
    maxlength: 120
  },
  price: {
    type: Number,
    required: [true, 'Field `price` must be completed'],
    min: [1, 'Price must be greater than zero']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Field `description` must be completed'],
    minlength: 20,
    maxlength: 255
  },
  x: {
    type: Number,
    required: [true, 'Field `x` must be completed'],
    min: [0, 'X must be greater than or equal to 0'],
    max: [1400, 'X must be less than or equal to 1400']
  },
  y: {
    type: Number,
    required: [true, 'Field `y` must be completed'],
    min: [0, 'Y must be greater than or equal to 0'],
    max: [1000, 'Y must be less than or equal to 1000']
  },
  beds: {
    type: Number,
    required: [true, 'Field `beds` must be completed'],
    min: [1, 'Number of beds must be greater than 0'],
    max: [5, 'Number of beds can not be greater than 5']
  },
  baths: {
    type: Number,
    required: [true, 'Field `baths` must be completed'],
    min: [1, 'Number of baths must be greater than 0'],
    max: [4, 'Number of baths can not be greater than 4']
  },
  squareMeters: {
    type: Number,
    required: [true, 'Field `squareMeters` must be completed'],
    min: [20, 'Area must be greater than or equal to 20 square meters'],
    max: [240, 'Area must be less than or equal 240 square meters']
  }
})

PropertySchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'PropertyId'
})

var Property = mongoose.model('Property', PropertySchema)

module.exports = {
  Property
}
