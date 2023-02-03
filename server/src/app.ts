import express,{ Application } from "express";
import cors from "cors"
import router from "../route/user.LoginRoute";
// import morgan from "morgan"

export default function BootCampConnection(app:Application){
    app.use(express.json()).use(cors())

    app.use("/api/BootCamp",router)


}