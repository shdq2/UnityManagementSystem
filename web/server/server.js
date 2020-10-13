const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const app = express();
const auth = require('./routers/authRouter');
const collection = require('./routers/collectionRouter');
const user = require('./routers/userRouter');
const location = require('./routers/locationRouter');

const cors = require('cors');
//var cookie = require('cookie-parser');

app.use(cors());
app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({ limit:"50mb",extended:false }));
//app.use(cookie());
app.use(express.static(path.join(__dirname,'../build')));
app.use(express.json({
    limit:"50mb"
}));

app.use(express.urlencoded({
    limit:"50mb",
    extended:false
}));
 var mysql_dbc = require('./database/db')();
 var connection = mysql_dbc.init();
 mysql_dbc.test_open(connection);


//var md5 = require('md5');

app.use('/auth',auth);
app.use('/collection',collection);
app.use('/user',user);
app.use('/location',location);

const port = process.env.PORT || 4000;
app.set('port' , port );

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));