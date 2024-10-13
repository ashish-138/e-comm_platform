import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    orderedItems: [{
        productId: { type: String, required: true },
        qty: { type: Number, required: true }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    fullName:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    }

},
    { timestamps: true }
)

export default mongoose.model("Orders", OrderSchema);