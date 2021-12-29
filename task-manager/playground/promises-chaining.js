const {MongoClient, ObjectID} = require("mongodb");
const mongoose = require("mongoose");
require('../src/db/mongoose.js')
const User = require('../src/models/user.js')

const id="61b5b65348d0f1b92652e5f5";

User.findByIdAndUpdate({_id:id}, {age:50}).then((users)=>{
    console.log(users);
    return User.countDocuments({age:50})
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})
console.log(id);

// User.updateOne({
//         _id: new ObjectID("61b5b65348d0f1b92652e5f5"),
//     },{
//         $set:{
//             name: "Aziz",
//         }
//     })
//     updatePromise.then((result)=>{
//         console.log(result);
//     }).catch((error)=>{
//         console.log(error);
//     })
