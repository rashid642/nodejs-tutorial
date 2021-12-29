require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('61b5b65348d0f1b92652e5f5', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAge = async (id, age) =>{
    const user = await User.findByIdAndUpdate(id, {age : age});
    const count = await User.countDocuments({age: age});
    return count;
}

updateAge("61b5b65348d0f1b92652e5f5",12).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})