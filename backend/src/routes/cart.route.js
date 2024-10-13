import { Router } from "express";
import { getCartItems, updateCart } from "../controllers/cart.controller.js";
import {verifyJWT} from "../../middleware/jwtverification.js"


const router = Router()

router.use(verifyJWT);


router.route("/").get(getCartItems)
router.route("/").put(updateCart)


export default router