import { Router } from "express";
import { getOrders, saveOrders } from "../controllers/order.controller.js";
import {verifyJWT} from "../utils/jwtverification.js"


const router = Router()
router.use(verifyJWT);

router.route("/").post(saveOrders)
router.route("/").get(getOrders)


export default router