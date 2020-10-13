var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');

router.post('/login',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};    
    
    var stmt = 'select user_id from user where user_id = \''+data.id+'\' and user_pw = \''+md5(data.pw)+'\'';
    connection.query(stmt, function (err, result) {
        // if(err) {     
        //     resultJson.id = data.id;       
        //     resultJson.err = err;            
        //     // res.json(err);
        // }else{
        //     resultJson.id = data.id;       
        //     resultJson.result = result;            
        //     resultJson.err = err;            
        //     //   res.json(result);
        // }   
        resultJson.id = data.id;       
        resultJson.result = result;            
        resultJson.err = err;          
        
        res.json(resultJson);
    })
})

module.exports = router;