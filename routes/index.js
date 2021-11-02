const hirexp = require('express').Router()
const mongoose = require('mongoose')
const path = require("path")
const crypto = require("crypto")
const multer = require("multer")
const gridFs = require("multer-gridfs-storage")
const gridFstream = require("gridfs-stream");
const metod = require("method-override")
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



// const storage = new gridFs({
//   url : MONGO_PROD_URI,
//   file: (req, file)=>{
//     return new Promise((resolve, reject)=>{
//       crypto.randomBytes(16,(err,buf)=>{
//         if(err){
//           return reject(err);
//         }
//         const filename = buf.toString('hex')+path.extname(file.originalname);
//         const fileinfo ={
//           filename: filename,
//           bucketName : 'explore'
//         };
//         resolve(fileinfo);
//       });
//     });
//   }
// });
// const upload = multer({storage})


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

 
  // const obj= {
  //   img:{
  //     data: fs.readFileSync(path.join(__dirname+"/public"+req.file.filename)),
  //     contentType: 'image/png'
  //   }
  // }
  


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
  
    // const data2 = new Explore({
    //     avatar: result.secure_url,
    //     cloudinary_id: result.public_id,
    // });
    // await data2.save();
    
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

  
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
  
// var upload = multer({ storage: storage });

// hirexp.get("/show",(req,res)=>{
//   Explore.find().toArray(function (err,result){
//      const imgArray = result.map(element =>element._id);
//      console.log(imgArray);
//      if(err){
//          return console.error(err);
//      }
//      res.send(imgArray)
//  })
// });
// hirexp.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
//   var img = fs.readFileSync(req.file.path);
//   var encode_img = img.toString('base64');
//   var final_img = {
//       contentType:req.file.mimetype,
//       image:new Buffer(encode_img,'base64')
//   };
//   Explore.create(final_img,function(err,result){
//       if(err){
//           console.log(err);
//       }else{
//           console.log(result.img.Buffer);
//           console.log("Saved To database");
//           res.contentType(final_img.contentType);
//           res.send(final_img.image);
//       }
//   })
// })

// app.get('/', (req, res) => {
//   Explore.find({}, (err, items) => {
//       if (err) {
//           console.log(err);
//           res.status(500).send('An error occurred', err);
//       }
//       else {
//           res.render('imagesPage', { items: items });
//       }
//   });
// });
module.exports = hirexp;
