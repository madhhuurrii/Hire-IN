const express = require('express');
const hirexp = require('express').Router()
const mongoose = require('mongoose')
const Explore = require('../model/explore');

// const path = require("path")


require('dotenv').config()

mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err))

hirexp.get('/index', (req, res) => {
  res.render('index')
})


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



//  Explore Page
hirexp.post('/hirenow',  async (req, res) => {

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

hirexp.get('/explore', async (req,res)=>{

    await Explore.find({}, function(err,explo){
        res.render('hireexplore',{
            exploList : explo
        })
    })
    // console.log()
    
})


module.exports = hirexp;
