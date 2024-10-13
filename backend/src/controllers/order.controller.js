import Orders from "../models/order.model.js"




const saveOrders = async(req,res)=>{
   
    try {
        const newOrder = new Orders({
            userId:req.user._id,
            orderedItems:req.body.orderedItems,
            totalPrice:req.body.totalPrice,
            fullName:req.body.fullName,
            address:req.body.address,
            email:req.body.email,
        })
        await newOrder.save()
        res.status(200).json("Order placed successfully")
    } catch (error) {
        res.status(500).json(error)
    }
    
}

const getOrders = async(req,res)=>{
   try{
        const result = await Orders.find({userId:req.user._id})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
    
}


export{saveOrders,getOrders}