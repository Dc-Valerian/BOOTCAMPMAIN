import {Router} from "express";
import{Login,Register,getUser} from "../controller/user.controller"

const BootCampRouter = Router()

BootCampRouter.route("/register").post(Register)
BootCampRouter.route("/login").post(Login)
BootCampRouter.route("/getusers").get(getUser)



export default BootCampRouter;
