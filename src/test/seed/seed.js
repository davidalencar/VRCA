const createPropertyBodyReq = (prop) => {
  var propValidData = require('./property-validbody.json')
  return {
    x: prop.x || propValidData.x,
    y: prop.y || propValidData.y,
    title: prop.title || propValidData.title,
    price: prop.price || propValidData.price,
    description: prop.description || propValidData.description,
    beds: prop.beds || propValidData.beds,
    baths: prop.baths || propValidData.baths,
    squareMeters: prop.squareMeters || propValidData.squareMeters
  }
}

const createInvalidReq = (propBody, invalidField, errorName, errorMsg, missingField) => {
  if (missingField) {
    delete propBody[invalidField]
  }
  return {
    prop: propBody,
    error: {
      invalidField: invalidField,
      name: errorName,
      message: errorMsg
    }
  }
}

const validReq = createPropertyBodyReq({})

const invalidReqList = [
  // validate field X
  createInvalidReq(
    createPropertyBodyReq({
      x: 'str'
    }),
    'x',
    'CastError',
    'Cast to Number failed for value "str" at path "x"'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      x: -1
    }),
    'x',
    'ValidatorError',
    'X must be greater than or equal to 0'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      x: 1401
    }),
    'x',
    'ValidatorError',
    'X must be less than or equal to 1400'
  ),
  createInvalidReq(
    createPropertyBodyReq({}),
    'x',
    'ValidatorError',
    'Field `x` must be completed',
    true
  ),
  // validate field y
  createInvalidReq(
    createPropertyBodyReq({
      y: 'str'
    }),
    'y',
    'CastError',
    'Cast to Number failed for value "str" at path "y"'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      y: -1
    }),
    'y',
    'ValidatorError',
    'Y must be greater than or equal to 0'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      y: 1001
    }),
    'y',
    'ValidatorError',
    'Y must be less than or equal to 1000'
  ),
  createInvalidReq(
    createPropertyBodyReq({}),
    'y',
    'ValidatorError',
    'Field `y` must be completed',
    true
  ),
  // validate field title
  createInvalidReq(
    createPropertyBodyReq({
      title: 'title'
    }),
    'title',
    'ValidatorError',
    'Path `title` (`title`) is shorter than the minimum allowed length (20).'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae mattis quam. Vivamus venenatis lacus nec quam metus.'
    }),
    'title',
    'ValidatorError',
    'Path `title` (`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae mattis quam. Vivamus venenatis lacus nec quam metus.`) is longer than the maximum allowed length (120).'
  ),
  createInvalidReq(
    createPropertyBodyReq({}),
    'title',
    'ValidatorError',
    'Field `title` must be completed',
    true
  ),
  // validate field price
  createInvalidReq(
    createPropertyBodyReq({
      price: 'str'
    }),
    'price',
    'CastError',
    'Cast to Number failed for value "str" at path "price"'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      price: -1
    }),
    'price',
    'ValidatorError',
    'Price must be greater than zero'
  ),
  createInvalidReq(
    createPropertyBodyReq({}),
    'price',
    'ValidatorError',
    'Field `price` must be completed',
    true
  ),
  // validate field description
  createInvalidReq(
    createPropertyBodyReq({
      description: 'description'
    }),
    'description',
    'ValidatorError',
    'Path `description` (`description`) is shorter than the minimum allowed length (20).'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie nulla lectus, sed pellentesque purus placerat sed. Nulla auctor elementum augue. Cras sollicitudin vehicula semper. Fusce vitae nisl sagittis, cursus nisl ut, egestas ante. Nam nullam.'
    }),
    'description',
    'ValidatorError',
    'Path `description` (`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie nulla lectus, sed pellentesque purus placerat sed. Nulla auctor elementum augue. Cras sollicitudin vehicula semper. Fusce vitae nisl sagittis, cursus nisl ut, egestas ante. Nam nullam.`) is longer than the maximum allowed length (255).'
  ),
  createInvalidReq(
    createPropertyBodyReq({}),
    'description',
    'ValidatorError',
    'Field `description` must be completed',
    true
  ),
  // validate field beds
  createInvalidReq(
    createPropertyBodyReq({
      beds: 'str'
    }),
    'beds',
    'CastError',
    'Cast to Number failed for value "str" at path "beds"'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      beds: -1
    }),
    'beds',
    'ValidatorError',
    'Number of beds must be greater than 0'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      beds: 6
    }),
    'beds',
    'ValidatorError',
    'Number of beds can not be greater than 5'
  ),
  createInvalidReq(
    createPropertyBodyReq({}),
    'beds',
    'ValidatorError',
    'Field `beds` must be completed',
    true
  ),
  // validate field baths
  createInvalidReq(
    createPropertyBodyReq({
      baths: 'str'
    }),
    'baths',
    'CastError',
    'Cast to Number failed for value "str" at path "baths"'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      baths: -1
    }),
    'baths',
    'ValidatorError',
    'Number of baths must be greater than 0'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      baths: 5
    }),
    'baths',
    'ValidatorError',
    'Number of baths can not be greater than 4'
  ),
  createInvalidReq(
    createPropertyBodyReq({}),
    'baths',
    'ValidatorError',
    'Field `baths` must be completed',
    true
  ),
  // validate field squareMeters
  createInvalidReq(
    createPropertyBodyReq({
      squareMeters: 'str'
    }),
    'squareMeters',
    'CastError',
    'Cast to Number failed for value "str" at path "squareMeters"'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      squareMeters: 19
    }),
    'squareMeters',
    'ValidatorError',
    'Area must be greater than or equal to 20 square meters'
  ),
  createInvalidReq(
    createPropertyBodyReq({
      squareMeters: 241
    }),
    'squareMeters',
    'ValidatorError',
    'Area must be less than or equal 240 square meters'
  ),
  createInvalidReq(
    createPropertyBodyReq({}),
    'squareMeters',
    'ValidatorError',
    'Field `squareMeters` must be completed',
    true
  )
]

module.exports = {
  invalidReqList,
  validReq
}
