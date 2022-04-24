const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');5
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

///paring MIddleware
//
app.use(bodyParser.urlencoded({ extend: false}));


///parser application/ json 
app.use(bodyParser.json());

//static file
app.use(express.static('public'));

// template engine
app.engine('hbs', exphbs.engine( {extname: '.hbs'}));
app.set('view engine','hbs');

// db connection pool
const pool =mysql.createPool({
    connectionLimit :100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME

});


//CONNECT TOB DB

pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID' + connection.threadId);
});





const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log('Listening on port 5000'));