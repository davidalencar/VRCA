const validator = require('validator')
const repository = require('../domain/repository')

module.exports = (app) => {
  app.post('/properties', (req, res) => {
    repository.createProperty(req.body)
      .then((propObj) => {
        return res.status(201).send(propObj)
      })
      .catch((e) => {
        return res.status(400).send(e)
      })
  })

  app.get('/properties/:id', (req, res) => {
    const id = req.params.id

    if (!id || !validator.isNumeric(id)) {
      return res.status(400).send()
    }

    repository.findPropertyById(id)
      .then((propObj) => {
        if (propObj) {
          return res.status(200).send(propObj)
        } else {
          return res.status(404).send()
        }
      })
      .catch((e) => {
        return res.status(500).send(e)
      })
  })

  app.get('/properties', (req, res) => {
    const ax = req.query.ax
    const ay = req.query.ay
    const bx = req.query.bx
    const by = req.query.by

    if (!ax || !validator.isNumeric(ax)) {
      return res.status(400).send()
    }
    if (!ay || !validator.isNumeric(ay)) {
      return res.status(400).send()
    }
    if (!bx || !validator.isNumeric(bx)) {
      return res.status(400).send()
    }
    if (!by || !validator.isNumeric(by)) {
      return res.status(400).send()
    }

    repository.findPropertyByQuadrant(ax, ay, bx, by)
      .then((retObj) => {
        if(!retObj.foundProperties) return res.status(404).send();
        return res.status(200).send(retObj)
      })
  })
}
