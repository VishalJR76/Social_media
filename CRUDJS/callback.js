const doworkCall = (callback)=>{
setTimeout(()=>{
       //callback('This is the one',undefined)
      callback(undefined,[1,2,3])
    },2000)
}

doworkCall((error,result)=>{
    if(error){
        return console.log(error)
    }
    console.log(result)
})