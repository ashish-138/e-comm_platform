import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwtverification.js"


const registerUser = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const email = req.body.email.toLowerCase()
            const name = req.body.name.toUpperCase()

            const newUser = new User({
                email:email,
                name:name,
                password: hashedPassword
            })

            await newUser.save();
            res.status(200).json("User registered successfully!")
        }
        else {
            res.status(400).json("Email Id is already register!")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


const checkEmail = async(req,res)=>{
    try {
        const result = await User.find({email:req.params.email})
        res.status(200).json(result?true:false)
    } catch (error) {
        res.status(500)
    }
}



const loginUser = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase()
        const user = await User.findOne({ email:email})
        if (!user) {
            res.status(400).json("Invalid credentials!")
        }
        else {
            
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                res.status(400).json("Invalid credentials!")
            } else {
                const tokenData ={
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                }

                const token = await generateToken(tokenData)

                const data = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
                res.status(200).json({ token,data })
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}





export {registerUser,loginUser,checkEmail};