require('../dbsrc/mongoose')
const Task = require('../dbsrc/src/models/task')


Task.findByIdAndDelete('6391b82afeba4a7101bde2fe').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed:false})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})