import { Router } from "express";
import { Login, Register } from "../controller/user.logincontroller";
import { coverUpload } from "../multer/multer"


const router = Router()


router.route("/register").post(Register)
router.route("/login").post(Login)

export default router;