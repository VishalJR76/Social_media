require('../dbsrc/mongoose')
const User = require('../dbsrc/src/models/user')


User.findByIdAndUpdate('6392e2f2472d86c95720bfd3',{age:0}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:0})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})