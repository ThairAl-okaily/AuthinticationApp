
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost/authApp", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.render('home');
});


app.get('/secret', (req,res) => {
    res.render('secret');
});
 

// node server

const http = require('http');
const port = 4000;
const hostname = '127.0.0.1'; 
const server = http.createServer((request, respond) => {
respond.statusCode = 200;
respond.setHeader('Content-Type', 'text/plain');
respond.end("Hello");
});
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

