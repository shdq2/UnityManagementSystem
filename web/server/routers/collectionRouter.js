var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');

router.get('/getList',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.query;    
    var resultJson = {};    
    
    var stmt = 'select * from collection';
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

router.post('/createcollection',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};        
    var stmt = 'insert into collection values(\''+data.id+'\',\''+data.name+'\',\''+data.date+'\',\''+data.user_id+'\')';
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

router.post('/addItem',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};        
    console.log(data);
    var stmt = 'select * from collection_item where col_id = \''+data.col_id+'\'';
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
});

module.exports = router;