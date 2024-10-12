import express from "express"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import productRoute from "./routes/product.route.js"
import orderRoute from "./routes/order.route.js"
import cartRoute from "./routes/cart.route.js"
import {seedProductData} from "./db/seedData.js"


const app = express()


app.use(express.json())
app.use(cors())

seedProductData()

app.use("/api/v1/user",userRouter)
app.use("/api/v1/product",productRoute)
app.use("/api/v1/order",orderRoute)
app.use("/api/v1/cart",cartRoute)

export {app}