const express = require('express');
const hirexp = require('express').Router()
const mongoose = require('mongoose')
const Explore = require('../model/explore');
const fs= require('fs')
const multer=require('multer')
const path=require('path')
// const path = require("path")
var imgModel = require('../model/img')

require('dotenv').config()

mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },6000000)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err))

hirexp.get('/index', (req, res) => {
  res.render('index')
})

// hirexp.use(express.static(__dirname + '/public'));
// hirexp.use('/uploads', express.static('uploads'));


hirexp.get('/hireapply', (req, res) => {
  res.render('hireprep')
})

hirexp.get('/hirenow', (req, res) => {
  res.render('hirenow')
})
// hirexp.get('/explore', (req, res) => {
//   res.render('hireexplore')
// })

//
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

hirexp.get('/profile',(req,res)=>{
  res.render('index1')
})

hirexp.post('/explore', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  // var response = '<a href="/">Home</a><br>'
  // response += "Files uploaded successfully.<br>"
  // response += `<img src="${req.file.path}" /><br>`
  // return res.send(response)
  var obj={
    img:{
      data: fs.readFileSync(path.join('./uploads/'+req.file.filename)),
      contentType: 'image/png'
    }
  }
  imgModel.create(obj,(err,item)=>{
    if(err){
      console.log(err)

    }
    else{
      console.log("Done!")
      res.redirect('/explore')
    }
    
  })
})


// var upload = multer({ storage: storage })
//  Explore Page
hirexp.post('/hirenow', async (req, res,next) => {
  // console.log(JSON.stringify(req.file))
  // var obj={
  //   img: req.file.path
  // }
  const {
    hirename,
    hireemail,
    hirecompany,
    hirestipend,
    hiredate,
    hirecontact,
    hireposition,
    hirecompanyemail,
    hireeli,
    hiredesc,
    hirelink,
   
  

   
    
    
  } = req.body

 
  
  


  try {
    const data1 = await Explore.create({
      hirename,
      hireemail,
      hirecompany,
      hireposition,
      hirestipend,
      hireeli,
      hiredate,
      hirecontact,
      hirecompanyemail,
      hiredesc,
      hirelink,
      
    })
    console.log('Job Openeing created Successfully!', data1)
  
   
    
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: 'Job already exists!' })
    }
    throw error
  }
  res.json({ status: 'ok' })
})

hirexp.get('/explore',(req,res)=>{

    Explore.find({}, function(err,explo){
       
        imgModel.find({},function(err,items){
          res.render('hireexplore',{
            exploList : explo,
            items:items
        })
        })
    })
    
    // console.log()
    
})


module.exports = hirexp;
