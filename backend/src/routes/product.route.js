import { Router } from "express";
import {getProduct,getProducts } from "../controllers/product.controller.js";
import {verifyJWT} from "../../middleware/jwtverification.js"


const router = Router()
router.use(verifyJWT);

router.route("/").get(getProducts)
router.route("/:id").get(getProduct)



export default router