import dotenv from "dotenv"
import DBconnect from "./db/index.js"
import { app } from "./src/app.js"



dotenv.config()

DBconnect().then(()=>{
    app.listen(env.process.PORT,()=>{
        console.log("Server and db is connected")
    })
}).catch((err)=>{
    console.log(err)
})