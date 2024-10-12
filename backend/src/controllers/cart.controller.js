import Cart from "../models/cart.model.js"


const getCartItems = async(req,res)=>{
    try {
        const cart = await Cart.findOne({ userId:req.user._id })
        .populate({
            path: 'cartItems.productId', 
            model: 'Products' 
        })
        .exec();

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItems = cart.cartItems.map(item => ({
            product: item.productId, 
            quantity: item.quantity
        }));

        res.status(200).json(cartItems);

    return cartItems.map(item => ({
        product: item.productId,
        quantity: item.quantity
    }));
    } catch (error) {
        res.status(500).json(error)
    }
}


const addCartItems = async(req,res)=>{
    try {

        const { userId, cartItems } = req.body;

        if (!userId || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ message: 'Invalid data format. Expected userId and a non-empty array of cart items.' });
        }

        const cart = new Cart({
            userId,
            cartItems
        });

        await cart.save();
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateCart = async(req,res)=>{
    try {       

        const existingCart = await Cart.findOne({ userId: req.user._id });
        if (existingCart) {
            await Cart.deleteOne({ userId: req.user._id });
        }
        if (req.body.data === null || !Array.isArray(req.body.data)) {
            res.status(200)
        }
        const cart = new Cart({
            userId: req.user._id,
            cartItems: req.body.data
        });

        await cart.save();
        res.status(200)
    } catch (error) {
        res.status(500).json(error)
    }
}


export {addCartItems,updateCart,getCartItems}