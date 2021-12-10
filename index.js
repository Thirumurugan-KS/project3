const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require('mongoose');

const app = express()

mongoose.connect('mongodb+srv://thiru:thiru@cluster0.xoecv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , ()=>{
    console.log('DB Connected')
});

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/temp/"
}))



const User = require("./routers/userRouter")

app.use("/api",User)

app.listen(process.env.PORT || 8080 , ()=>{
    console.log("Server is up")
})