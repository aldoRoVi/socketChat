const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const route = require('./network/routers')
const socket = require('./socket')
const db = require('./db')
const password = require('./components/message/password')
const url = password.uri
const cors = require('cors')

db.connect(url)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

socket.connect(server)
route(app)

app.use(cors())

server.listen(3000, function () {
  console.log('Server connected')
});
console.log('La aplicacion esta escuchando en http://localhost:3000')
