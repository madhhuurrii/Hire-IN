const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const path = require('path');
const index = require('./routes/index');
const auth = require('./routes/auth');
const uploadContainer = require('./'); 
const cors = require('cors')

var multer  = require('multer');
var fs  = require('fs');

require("dotenv").config();



//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors());
// app.use(express.static(__dirname + '/public'));
// app.use('/uploads', express.static('uploads'));

app.use('/', auth);
app.use('/', index);



/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));



//Import Route 


//Use View Engine
app.set('view engine','ejs')

//Middleware route



const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`This app is listening on port ${PORT}`));


