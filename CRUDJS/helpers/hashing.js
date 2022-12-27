const bcrypt = require('bcrypt')
const saltround=10

const hashgenerate = async (plainPassword)=>{
    const salt = await bcrypt.genSalt(saltround)
    const hash =await bcrypt.hash(plainPassword,salt)
    return hash
}

const hashvalidate = async(plainPassword,hashpassword)=>{
    try{
        const result= await bcrypt.compare(plainPassword,hashpassword)
        return result    }
        catch(err){
            return false
        }
}

module.exports.hashvalidate=hashvalidate

module.exports.hashgenerate = hashgenerate