const doworkprom = new Promise((resolve,reject)=>{
setTimeout(()=>{
    
    reject('Wrong')
},2000)
})
doworkprom.then((result)=>{
console.log('Gracias',result)
}).catch((error)=>{
    console.log('Error',error)
})
