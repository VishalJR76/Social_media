const jwt =require('jsonwebtoken')

const tokengenerate =async function(email){
    const token = jwt.sign(
        {email}
        ,process.env.JWT_KEY,
        {expiresIn:40000})
        

        return token
}


const tokenvalidate = (token)=>{
    try{
          const data = jwt.verify(token,process.env.JWT_KEY)
          return data
    }catch(err){
        return false
        }
}
module.exports.tokengenerate=tokengenerate
module.exports.tokenvalidate=tokenvalidate