// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId
const { ObjectID } = require('bson')
const  {MongoClient, ObjectId } =require('mongodb')
const url='mongodb://127.0.0.1:27017'
const databasename='Task-manager'


MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databasename)
    
    db.collection('names').deleteOne({
        name:'Kaiser'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
}) 