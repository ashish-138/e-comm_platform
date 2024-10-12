import jwt from "jsonwebtoken"


const generateToken = async (data)=>{
    const token = await jwt.sign(data,process.env.TOKEN_SECRET)
    return token;

}

const verifyToken = async (data)=>{
    const token = await jwt.verify(data,process.env.TOKEN_SECRET)
    return token;
}



export {generateToken,verifyToken}