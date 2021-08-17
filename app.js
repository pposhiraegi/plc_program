const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const app = express()

app.set('views', path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))

app.use('/',index)

app.use(function(req,res,next){
    var err = new Error('Not found')
    err.status = 404
    next(err)
})

app.use(function(err,req,res,next){
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status||500)
    res.render('error')
})

app.listen(3000)
console.log('Server start....')


// --ModbusTCP--//
const Modbus = require('jsmodbus')
const net = require('net')
const socket = new net.Socket()
const client = new Modbus.client.TCP(socket)
const d = require('events').EventEmitter.defaultMaxListeners=3;

const options = {
'host' : 'localhost',
'port' : 502
}

socket.connect(options)

var time

time = setInterval(function(){
    socket.on('connect',function () {
        client.readInputRegisters(0,2).then(function (resp){
            console.log(resp)
        },console.error)
    },5000)
})


module.exports = app