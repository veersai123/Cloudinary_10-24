const mongoose=require("mongoose")

mongoose.connect('mongodb+srv://'+process.env.USER+':'+process.env.PASSWORD+'@cluster0.k3h4jot.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("connected")
}).catch(()=>{
    console.log("err")
})
