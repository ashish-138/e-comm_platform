import Cart from "../models/cart.model.js"


const getCartItems = async(req,res)=>{
    try {
        const result = await Cart.find({userId:req.user._id})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}


const addCartItems = async(req,res)=>{
    try {
        const cart = Cart({
            userId:req.user._id,
            cartItems:req.body.data
        })
        await cart.save()
        res.status(200)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateCart = async(req,res)=>{
    try {
        await Cart.deleteOne({userId:req.user._id})
        if(req.body.data==null) return res.status(200)
        const cart = Cart({
            userId:req.user._id,
            cartItems:req.body.data
        })
        await cart.save()
        res.status(200)
    } catch (error) {
        res.status(500).json(error)
    }
}


export {addCartItems,updateCart,getCartItems}