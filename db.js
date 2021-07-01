const db = require('mongoose')
const chalk = require('chalk')

db.Promise = global.Promise

async function connect (url) {
  await db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log(chalk.green('[db]: Connected succesfully'))
}

module.exports = {
  connect
}
