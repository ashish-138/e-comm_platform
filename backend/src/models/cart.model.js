import mongoose, { Schema } from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },cartItems: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true }
    }]
},
    { timestamps: true }
)

export default mongoose.model("Cart", CartSchema);