/**
 * Logic model of a Province
 */
const mongoose = require('mongoose')

var ProvinceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  boundaries: [{
    upperLeft: [{
      x: {
        type: Number,
        required: true,
        min: [0, 'X must be greater than or equal to 0'],
        max: [1400, 'X must be less than or equal to 1400']
      },
      y: {
        type: Number,
        required: true,
        min: [0, 'Y must be greater than or equal to 0'],
        max: [1000, 'Y must be less than or equal to 1000']
      }
    }],
    bottomRight: [{
      x: {
        type: Number,
        required: true,
        min: [0, 'X must be greater than or equal to 0'],
        max: [1400, 'X must be less than or equal to 1400']
      },
      y: {
        type: Number,
        required: true,
        min: [0, 'Y must be greater than or equal to 0'],
        max: [1000, 'Y must be less than or equal to 1000']
      }
    }]
  }]
})

var Province = mongoose.model('Province', ProvinceSchema)

module.exports = {
  Province
}
