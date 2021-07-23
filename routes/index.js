var express = require('express')
const db = require('../db/config')

var router = express.Router()

//로그인
router.get('/',(req,res,next)=>{
    res.render('login')
})
router.post('/',(req,res,next)=>{
    var user_email = req.body.user_email
    var user_password = req.body.user_password

    var sql = ""
})
//회원가입
router.get('/join',(req,res,next)=>{
    res.render('join')
})   
router.post('/join',(req,res,next)=>{
    var user_name = req.body.user_name
    var user_email = req.body.user_email
    var user_password = req.body.user_password

    if(!user_name || !user_email || !user_password) {
        // 하나라도 누락된 경우
        res.send('정보를 모두 입력해주세요..');
        return;
      }
    
    var sql = 'insert into user_info (user_id,user_name,user_email,user_password,user_date) value (0,?,?,?,now())'
    var params = [user_name,user_email,user_password]

    db.query(sql,params,(err,rows,fields)=>{
        if(err)
        console.log(err)
        else{
            console.log(rows)
            res.send('회원가입이 완료되었습니다.')
        }
    })
})
//
router.get('/plc_list',(req,res,next)=>{
    res.render('plc_list')
})

router.get('/plc',(req,res,next)=>{
    res.render('plc')
})
router.get('/equipment_sensor_list',(req,res,next)=>{
    res.render('equipment_sensor_list')
})
router.get('/equipment_sensor',(req,res,next)=>{
    res.render('equipment_sensor')
})
module.exports = router