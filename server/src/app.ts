import express,{ Application,Request,Response,NextFunction } from "express";
import cors from "cors"
import router from "../route/user.LoginRoute";
import  BootCampRouter from "../route/user.modelRoute";
import {AppError,HttpCode} from "../utils/App.Error"
// import morgan from "morgan"

export const BootCampConnection=(app:Application)=>{
    app.use(express.json()).use(cors())

    app.use("/api/BootCamp",router)
    app.use("/api/BootCamp",BootCampRouter)

    app.all("*",(req:Request,res:Response,next:NextFunction)=>{
        next(
            new AppError({
                message:`This Route ${req.originalUrl} does not exists`,
                httpCode:HttpCode.NOT_FOUND
            })
        )
    })


}