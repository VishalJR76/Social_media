const doWork = async ()=>{
    throw new Error('Somethin fishy')
    return 'Alex'
}

doWork().then((result)=>{
    console.log('result',result)
}).catch((e)=>{
     console.log('e',e)
})