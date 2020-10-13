var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');

router.get('/getUser',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.query;    
    var resultJson = {};    
    console.log(data);
    var stmt = 'select user_id,user_auth,user_name from user';
    connection.query(stmt, function (err, result) {
        // if(err) {     
        //     resultJson.id = data.id;       
        //     resultJson.err = err;            
        //     // res.json(err);
        // }else{
        //     resultJson.id = data.id;       
        //     resultJson.result = result;            
        //     //   res.json(result);
        // }   
        
        resultJson.id = data.id;       
        resultJson.result = result;            
        resultJson.err = err;          

        res.json(resultJson);
    })
})


module.exports = router;