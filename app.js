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
app.use('/', auth);
app.use('/', index);





//Import Route 


//Use View Engine
app.set('view engine','ejs')

//Middleware route



const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`This app is listening on port ${PORT}`));


