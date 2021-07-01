// const chalk = require('chalk')
const Model = require('./model')

function addUser (user) {
  const myUser = new Model(user)
  return myUser.save()
}

async function getUser (filterUser) {
  let filter = {}
  if (filterUser != null) {
    filter = { name: filterUser }
  }
  const messages = await Model.find(filter)
  return messages
}

async function updateUser (id, name) {
  const foundMessage = await Model.findOne({
    _id: id
  })
  foundMessage.name = name
  const newMessage = await foundMessage.save()
  return newMessage
}

function deleteUser (id) {
  return Model.deleteOne({
    _id: id
  })
}

module.exports = {
  add: addUser,
  get: getUser,
  update: updateUser,
  delete: deleteUser
}
