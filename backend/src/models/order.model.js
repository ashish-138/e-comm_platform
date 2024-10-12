import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    orderedItems: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    totalPrice: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
)

export default mongoose.model("Orders", OrderSchema);