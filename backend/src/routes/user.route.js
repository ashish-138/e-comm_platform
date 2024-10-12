import { Router } from "express";
import { checkEmail, loginUser, registerUser } from "../controllers/user.controller.js";


const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/check-email/:email").get(checkEmail)


export default router