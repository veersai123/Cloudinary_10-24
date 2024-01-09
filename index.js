const express=require("express")
const app=express()
const mongoose=require("mongoose")
const fs = require('fs'); 
const multer  = require('multer')
const { v4:uuidv4 }=require('uuid')
const cloudinary=require("cloudinary").v2
require("dotenv").config()
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
  });

  //use for extention
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log("insidefilename fxn",file)
        const random=uuidv4()
      cb(null, random+""+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  //connecting

  require('./db/db')
  const Image = mongoose.model('Image', {Image_Url: String });

  //req hit krenge
  app.post('/',upload.single('myfile'),async (req,res)=>{
    console.log(req.file.path)


    const x= await cloudinary.uploader.upload(req.file.path)
    console.log("cloudianry",x)

    const newvar = new Image({Image_Url:x.secure_url});
    newvar.save().then(() => console.log('kaam ho gaya'));
    
    // Delete example_file.txt 
     fs.unlink((req.file.path),
     function(err){ 
     if (err) console.log(err); 
     else console.log("\nDeleted file");
   }) 
   res.json({
    msg:"file uploaded",
    your_url:{image_url:x.secure_url}
   })
})
let port=process.env.PORT||5000
app.listen(port,()=>{
    console.log("server is running on",port)
})