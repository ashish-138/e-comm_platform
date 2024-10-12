import mongoose from "mongoose";
import dotenv from "dotenv"
import {database} from "../utils/constants.js"


dotenv.config()

const DBconnect = async() => {
    try {
        await mongoose.connect(`${process.env.DB_CON}/${database}`)
    } catch (error) {
        console.log(error)
    }
}


export default DBconnect