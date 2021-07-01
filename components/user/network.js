const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.post('/', function (req, res) {
  controller.addUser(req.body.name)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(e => {
      response.error(req, res, 'Internal error', 500, e)
    })
})

router.get('/', function (req, res) {
  const filterMessage = req.query.name || null
  controller.getUser(filterMessage)
    .then((messageList) => {
      response.success(req, res, messageList, 200)
    })
    .catch(e => {
      response.error(req, res, 'Unexpected error', 500, e)
    })
})

router.patch('/:id', function (req, res) {
  controller.updateUser(req.params.id, req.body.name)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(e => {
      response.error(req, res, 'Internal Error', 500, e)
    })
})

router.delete('/:id', function (req, res) {
  controller.deleteUser(req.params.id)
    .then(() => {
      response.success(req, res, `Usuario ${req.params.id} eliminado`, 200)
    })
    .catch(e => {
      response.error(req, res, 'Interna error', 500, e)
    })
})

module.exports = router
