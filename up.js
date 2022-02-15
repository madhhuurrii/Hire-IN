var express = require('express')
var multer  = require('multer')
var port = 3000;
var cors = require('cors')
var imgModel = require('./model/img')

var up = express()
require('dotenv').config()
up.use(express.urlencoded({ extended: true}))
up.use(express.json())
up.use(cors());
mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
up.use(express.static(__dirname + '/public'));
up.use('/uploads', express.static('uploads'));

up.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  // var response = '<a href="/">Home</a><br>'
  // response += "Files uploaded successfully.<br>"
  // response += `<img src="${req.file.path}" /><br>`
  // return res.send(response)
  var obj={
    img:{
      data: fs.readFileSync(path.join(__dirname+'/uploads/'+req.file.filename)),
      contentType: 'image/png'
    }
  }
  imgModel.create(obj,(err,item)=>{
    if(err){
      console.log(err)

    }
    else{
      res.send('/explore')
    }
  })
})

up.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    for(var i=0;i<req.files.length;i++){
        response += `<img src="${req.files[i].path}" /><br>`
    }
    
    return res.send(response)
})
   

up.listen(port,() => console.log(`Server running on port ${port}!\nClick http://localhost:3000/`))
