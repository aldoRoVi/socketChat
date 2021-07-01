const store = require('./store')

function addUser (name) {
  if (!name) {
    return Promise.reject('Invalid Name')
  }

  const user = {
    name,
  }
  return store.add(user)
}

function getUser (filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.get(filterUser))
  })
}

function updateUser (id, name) {
  return new Promise(async (resolve, reject) => {
    if (!id || !name) {
      reject('Invalid data')
      return false
    }
    const result = await store.update(id, name)
    resolve(result)
  })
}

function deleteUser (id) {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      reject('Invalid Id')
      return false
    }
    store.delete(id)
      .then (() => {
        resolve()
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser
}
