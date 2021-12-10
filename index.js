const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const cookieParser = require("cookie-parser")


const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())



const User = require("./routers/userRouter")

app.use("/api",User)

app.listen(process.env.PORT || 8000 , ()=>{
    console.log("Server is up")
})