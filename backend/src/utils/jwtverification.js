import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const verifyJWT =async(req, res, next) => {
    // console.log(req.header("x-auth-token"));
    try {
        const token = req.header("x-auth-token")
        
        console.log(token);
        if (!token) {
            res.status(401).json("Unauthorized request")
        }
    
        const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password")
    
        if (!user) {
            
            res.status(401).json("Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        res.status(400).json(error)
    }
    
}