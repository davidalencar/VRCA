const expect = require('expect')
const request = require('supertest')
const {
  invalidReqList,
  validReq
} = require('./seed/seed')

const {
  app
} = require('../server')

describe('POST /Property', () => {
  invalidReqList.forEach((invalidReqListItem) => {
    it(`Should return an invalid value error in field "${invalidReqListItem.error.invalidField}"`, (done) => {
      request(app)
        .post('/properties')
        .set('Content-Type', 'application/json')
        .send(invalidReqListItem.prop)
        .expect(400)
        .expect((err) => {
          const erroRet = JSON.parse(err.text)
          const validateError = erroRet.errors[invalidReqListItem.error.invalidField]
          expect(validateError.name).toBe(invalidReqListItem.error.name)
          expect(validateError.message).toBe(invalidReqListItem.error.message)
        })
        .end(done)
    })
  })

  it('Should create a property', (done) => {
    request(app)
      .post('/properties')
      .set('Content-Type', 'application/json')
      .send(validReq)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBeDefined()
      })
      .end(done)
  })
})

describe('GET /properties/:id', () => {
  it('Should return an error for invalid parameter', (done) => {
    request(app)
      .get('/properties/test')
      .expect(400)
      .end(done)
  })

  it('Should return a Property', (done) => {
    request(app)
      .get('/properties/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(1)
      })
      .end(done)
  })

  it('Should not return a Property', (done) => {
    request(app)
      .get('/properties/0')
      .expect(404)
      .end(done)
  })
})

describe('GET /properties/', () => {
  it('Should return error for missing parameter ax', (done) => {
    request(app)
      .get('/properties?ay=0&bx=5&by=5')
      .expect(400)
      .end(done)
  })

  it('Should return error for missing parameter ay', (done) => {
    request(app)
      .get('/properties?ax=0&bx=5&by=5')
      .expect(400)
      .end(done)
  })

  it('Should return error for missing parameter bx', (done) => {
    request(app)
      .get('/properties?ax=0&ay=0&by=5')
      .expect(400)
      .end(done)
  })

  it('Should return error for missing parameter by', (done) => {
    request(app)
      .get('/properties?ax=0&ay=0&bx=5')
      .expect(400)
      .end(done)
  })

  it('Should return 404', (done) => {
    request(app)
      .get('/properties?ax=0&ay=0&bx=1&by=1')
      .expect(404)      
      .end(done)
  })

  it('Should return all properties in a quadrant', (done) => {
    request(app)
      .get('/properties?ax=0&ay=0&bx=5&by=5')
      .expect(200)
      .expect((res) => {
        expect(res.body.foundProperties).toBeGreaterThan(0)
        expect(res.body.properties.length).toBe(res.body.foundProperties)
      })
      .end(done)
  })
})
