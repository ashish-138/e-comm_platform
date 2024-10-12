import { Router } from "express";
import { checkAuth, checkEmail, loginUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../../middleware/jwtverification.js";


const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/check-email/:email").get(checkEmail)
router.route("/checkauth").get(verifyJWT,checkAuth)


export default router