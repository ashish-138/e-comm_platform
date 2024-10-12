import { Router } from "express";
import {getProduct,getProductByCategory,getProducts } from "../controllers/product.controller.js";


const router = Router()


router.route("/").get(getProducts)
router.route("/:id").get(getProduct)
router.route("/category/:category").get(getProductByCategory)



export default router