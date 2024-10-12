import Product from "../models/product.model.js"


const getProducts = async(req,res)=>{
   
    try {
        const result = await Product.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

const getProduct = async(req,res)=>{
   try{
        const result = await Product.findById({_id:req.params.id})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

const getProductByCategory = async(req,res)=>{
    try{
        const result = await Product.find({category:req.params.category})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export {getProducts,getProduct,getProductByCategory}