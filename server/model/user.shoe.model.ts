import mongoose,{Schema} from "mongoose";
import isEmail from "validator/lib/isEmail"

interface ShoeModel{
    shoeName:string;
    views:[];
    brand:string;
    summary:string;
    category:string;
}

interface ShoeSchema extends ShoeModel,Document{}

const ShoeModelSchema = new mongoose.Schema({
    shoeName:{
        type:String,
        required:[true,"Please Enter your Name"]
    },
    views:{
        type:[]
    },
    brand:{
        type:String,
    },summary:{
        type:String,
    },
    category:{
        type:String
    }
},{timestamps:true})

export default mongoose.model<ShoeSchema>("ShoeModel",ShoeModelSchema)