const mariadb = require('mysql')

const db = mariadb.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    port : 3307,
    database : 'plc'
})
db.connect()
module.exports = db