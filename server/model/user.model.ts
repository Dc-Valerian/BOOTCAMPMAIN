import {Document,model,Schema} from "mongoose";
import isEmail from "validator/lib/isEmail"

interface user{
    name:string;
    email:string;
    password:string;
}

interface IUser extends user,Document{}

const userSchema:Schema<IUser> = new Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter a valid Email"],
        trim:true,
        unique:true,
        lowercase:true,
        validate:[isEmail,"Please Enter the correct email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minlength:6
    }
},{versionKey:false,timeStamps:true});

const UserModel = model<IUser>("User",userSchema)

export default UserModel;