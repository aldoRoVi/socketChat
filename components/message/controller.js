const store = require('./store')
const socket = require('../../socket').socket

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
      if (!chat || !user || !message) {
          console.error('[messageController] No hay chat usuario o mensaje')
          reject('Los datos son incorrectos')
          return false
      }

      let fileUrl = ''
      if (file) {
          fileUrl = `http://localhost:3000/app/files/${file.filename}.jpg`
      }

      const fullMessage = {
          chat: chat,
          user: user,
          message: message,
          date: new Date(),
          file: fileUrl,
      }
      store.add(fullMessage)
      socket.io.emit('message', fullMessage)
      resolve(fullMessage)
  })
}

function getMessage(filterUser) {
  return new Promise ((resolve, reject) => {
    resolve(store.list(filterUser))
  })
}

function updateMessage (id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject('Invalid data')
      return false
    }
    const result = await store.update(id, message)
    resolve(result)
  })
}

function deleteMessage(id) {
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
  addMessage,
  getMessage,
  updateMessage,
  deleteMessage
}

