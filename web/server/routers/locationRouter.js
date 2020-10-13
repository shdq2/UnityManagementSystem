var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');

router.get('/getLocationList',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};    
    
    var stmt = 'select * from location order by loc_date desc';
    connection.query(stmt, function (err, result) {
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
})

router.post('/createLocation',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};    
    
    var stmt = 'insert into location values(\''+data.id+'\',\''+data.addr+'\',\''+data.date+'\',\''+data.user_id+'\',\''+data.title+'\') '
    connection.query(stmt, function (err, result) {
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
})

module.exports = router;