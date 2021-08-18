var express = require('express')
const db = require('../db/config')

var router = express.Router()


//로그인
router.get('/', (req, res, next) => {
    res.render('login')
})
router.post('/', function (req, res) {
    var user_email = req.body.user_email;
    var user_password = req.body.user_password;
    var sql = 'select * from user_info where user_email =? and user_password = ?'
    var params = [user_email, user_password]

    db.query(sql, params, (error, rows, fields) => {
        if (rows[0].user_email === user_email && rows[0].user_password === user_password) {
            console.log(rows[0])
            res.render('plc_list',{"rows":rows})
        }

    });
});

//회원가입
router.get('/join', (req, res, next) => {
    res.render('join')
})
router.post('/join', (req, res, next) => {
    var user_name = req.body.user_name
    var user_email = req.body.user_email
    var user_password = req.body.user_password

    if (!user_name || !user_email || !user_password) {
        // 하나라도 누락된 경우
        res.send('정보를 모두 입력해주세요..');
        return;
    }

    var sql = 'insert into user_info (user_id,user_name,user_email,user_password,user_date) value (0,?,?,?,now())'
    var params = [user_name, user_email, user_password]

    db.query(sql, params, (err, rows, fields) => {
        if (err)
            console.log(err)
        else {
            console.log(rows)
            res.render('login')
        }
    })
})

//
router.get('/plc_list',(req,res,next)=>{
    var plc_name = req.body.plc_name
    var plc_number = req.body.plc_number
    var plc_ip = req.body.plc_ip
    var plc_port = req.body.plc_port
    var plc_payload = req.body.plc_payload
    var plc_value_function_code = req.body.plc_value_function_code
    var plc_protocol =req.body.plc_protocol

    var params = [plc_name,plc_number,plc_ip,plc_port,plc_payload ,plc_value_function_code,plc_protocol]

    var sql ='SELECT plc_name AS PLC, plc_number AS 국번,plc_ip AS IP, plc_port AS PORT, plc_payload AS Payload,plc_value_function_code AS Bit_word,plc_protocol AS Protocol FROM plc_info INNER JOIN plc_value ON plc_info.plc_id = plc_value.plc_id'

    db.query(sql, params,(err,rows)=>{
        if(err)
            console.log(err)
        else{
            console.log(rows)
            res.render('plc_list',{"rows":rows})
        }
    })
})

router.get('/plc',(req,res,next)=>{
    var plc_name = req.body.plc_name
    var plc_number = req.body.plc_number
    var plc_ip = req.body.plc_ip
    var plc_port = req.body.plc_port
    var plc_payload = req.body.plc_payload
    var plc_value_function_code = req.body.plc_value_function_code
    var plc_protocol =req.body.plc_protocol

    var params = [plc_name,plc_number,plc_ip,plc_port,plc_payload ,plc_value_function_code,plc_protocol]

    var sql ='SELECT plc_name AS PLC, plc_number AS 국번,plc_ip AS IP, plc_port AS PORT, plc_payload AS Payload,plc_value_function_code AS Bit_word,plc_protocol AS Protocol FROM plc_info INNER JOIN plc_value ON plc_info.plc_id = plc_value.plc_id'

    db.query(sql, params,(err,rows)=>{
        if(err)
            console.log(err)
        else{
            console.log(rows)
            res.render('plc',{"rows":rows})
        }
    })
})
// router.post('/plc', (req, res, next) => {
//     var plc_name = req.body.plc_name
//     var plc_driver = req.body.plc_driver
//     var plc_connect=req.body.plc_connect
//     var plc_ip = req.body.plc_ip
//     var plc_port = req.body.plc_port
//     var plc_number = req.body.plc_number
// })

//변환된 설비/센서 리스트
router.get('/equipment_sensor_list', (req, res, next) => {
    var equipment_name = req.body.equipment_name
    var equipment_date = req.body.equipment_date
    var equipment_use = req.body.equipment_use
    var sensor_name = req.body.sensor_name
    var sensor_value = req.body.sensor_value

    var params = [equipment_name,sensor_name,sensor_value,equipment_date,equipment_use]

    var sql = 'select equipment_name, concat(sensor_name,"(",sensor_value,")") as sensor,equipment_date,equipment_use from equipment_sensor_info inner join sensor_info on equipment_sensor_info.equipment_id = sensor_info.equipment_id'

    db. query(sql, params,(err,rows)=>{
        if(err)
            console.log(err)
        else {
            var obj = { "title": "plc 리스트", "rows": rows };
            console.log(rows)
            res.render('equipment_sensor_list',obj)
        }
    })

    db.query('select count(*) from equipment_sensor_info inner join sensor_info on equipment_sensor_info.equipment_id = sensor_info.equipment_id',params,(err,rows)=>{
        console.log(rows)
    })
})

//설비/센서 리스트
router.get('/equipment_sensor', (req, res, next) => {
    var equipment_name = req.body.equipment_name
    var equipment_date = req.body.equipment_date
    var equipment_use = req.body.equipment_use
    var sensor_name = req.body.sensor_name
    var sensor_value = req.body.sensor_value
    var equipment_id = req.body.equipment_id

    var params = [equipment_id,equipment_name,sensor_name,sensor_value,equipment_date,equipment_use]

    var sql = 'select equipment_sensor_info.equipment_id, equipment_name, concat(sensor_name,"(",sensor_value,")") as sensor,equipment_date,equipment_use from equipment_sensor_info inner join sensor_info on equipment_sensor_info.equipment_id = sensor_info.equipment_id'

    db. query(sql, params,(err,rows)=>{
        if(err)
            console.log(err)
        else {
            
            var obj = {"rows": rows };
            console.log(rows)
            res.render('equipment_sensor',obj)
            
        }
    })
})

//설비/센서 등록
router.post('/equipment_sensor', (req, res, next) => {
    var equipment_name = req.body.equipment_name
    var equipment_comment = req.body.equipment_comment
    var equipment_location_lat = req.body.equipment_location_lat
    var equipment_loaction_lng = req.body.equipment_loaction_lng
    var equipment_date = req.body.equipment_date
    var equipment_use = req.body.equipment_use

    var sensor_name = req.body.sensor_name
    var sensor_value = req.body.sensor_value
    var sensor_measure = req.body.sensor_measure

    var equipment_sql = 'insert into equipment_sensor_info (equipment_id, equipment_name, equipment_comment, equipment_location_lat, equipment_loaction_lng,equipment_date) value (0,?,?,?,?,now())'

    var sensor_sql = 'insert into sensor_info (sensor_id,sensor_name,sensor_measure,sensor_value,equipment_id) value(0,?,?,?,last_insert_id())'

    var equipment_params = [equipment_name, equipment_comment, equipment_location_lat, equipment_loaction_lng]
    var sensor_params = [sensor_name, sensor_measure, sensor_value]

    db.query(equipment_sql, equipment_params, (err, rows) => {
        if (err)
            console.log(err)
        else {
            console.log(rows)
            res.render('equipment_sensor',{"rows": rows })
        }
    })
    
    db.query(sensor_sql, sensor_params, (err, rows) => {
        if (err)
            console.log(err)
        else {
            console.log(rows)
        }
    })
})

module.exports = router