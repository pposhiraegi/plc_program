var express = require('express')
var path = require('path')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var app = express()

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

module.exports = app