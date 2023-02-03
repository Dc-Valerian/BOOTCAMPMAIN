import express, { Application } from "express"
import { BcConnection } from "../config/db";
import {BootCampConnection} from "./app";

const PORT:number = 6055;

const app:Application = express()

BootCampConnection(app)

BcConnection()


app.listen(PORT,()=>{
    console.log(`BootCamp Server is listening to LOCALHOST PORT:${PORT}`);
})

