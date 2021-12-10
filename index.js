const express = require("express")

const app = express()

const User = require("./routers/userRouter")

app.use("/api",User)

app.listen(process.env.PORT || 8000 , ()=>{
    console.log("Server is up")
})