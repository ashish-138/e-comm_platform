import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"



const getCartItems = async (req, res) => {
    try {

        const cartItem = await Cart.findOne({ userId: req.user._id })
        const newData = []
        if (cartItem) {
            for (const x of cartItem.cartItems) {
                const data = await Product.findOne({ _id: x.productId });
                if (data) {
                    newData.push({ ...data.toObject(), qty: x.qty });
                }
            }
        }
        res.status(200).json(newData)
    } catch (error) {
        res.status(500).json(error)
    }
}


const updateCart = async (req, res) => {
    try {
        const cartlength = req.body.cartItems
        if (cartlength === undefined) {
            await Cart.findOneAndUpdate(
                { userId: req.user._id },
                { $set: { cartItems: [] } },
                { new: true, upsert: true });
        } else {
            const newCartItems = req.body.cartItems
            await Cart.findOneAndUpdate(
                { userId: req.user._id },
                { $set: { cartItems: newCartItems } },
                { new: true, upsert: true }
            );
            res.status(200).json('Cart updated successfully.');
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};



export { updateCart, getCartItems }