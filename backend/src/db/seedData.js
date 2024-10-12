import Product from "../models/product.model.js"
import { Products } from "../../public/seed/products.js";

export const seedProductData = async()=>{
    try {
        const result = await Product.find()
        if(result.length==0){
            await Product.insertMany(Products);
            console.log('Products seeded successfully!');
        }
    } catch (error) {
        console.log(error);
    }
}