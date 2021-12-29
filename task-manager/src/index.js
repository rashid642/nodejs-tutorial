const express = require('express');
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next)=>{
//     res.status(503).send("Site is under maintainance")
//     next();
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const jwt = require("jsonwebtoken");
// const myFunct = async () => {
//     const token = jwt.sign({_id:"abc123"},"thisisanewtoken",{expiresIn:"7 days"});
//     const data = jwt.verify(token,"thisisanewtoken") 
//     console.log(token);
//     console.log(data);
// }

// myFunct();

// const router = new express.Router();
// router.get("/test",(req,res)=>{
//     res.send("testing file");
// })
// app.use(router);