import Order from "../models/order.model.js"




const saveOrders = async(req,res)=>{
   
    try {
        const newOrder = new Order({
            userId:req.user._id,
            orderedItems:req.body.data.orderedItems,
            totalPrice:req.body.data.totalPrice
        })
        await newOrder.save()
        res.status(200).json("Order placed successfully")
    } catch (error) {
        res.status(500).json(error)
    }
    
}

const getOrders = async(req,res)=>{
   try{
        const result = await Order.find({userId:req.user._id})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
    
}


export{saveOrders,getOrders}