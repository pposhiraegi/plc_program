var express = require('express')
var router = express.Router()

router.get('/',(req,res,next)=>{
    res.render('login')
})

router.get('/index',(req,res,next)=>{
    res.render('index',{title:'PLC'})
})
router.get('/join',(req,res,next)=>{
    res.render('join')
})
router.get('/plc',(req,res,next)=>{
    res.render('plc')
})
module.exports = router