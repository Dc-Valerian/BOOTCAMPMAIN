import mongoose, { Schema ,Document,model} from "mongoose"


interface BootCamp {
    name:string;
    password:string;
    email:string;
    isAdmin:Boolean
}

interface BootCampSchema extends  BootCamp,Document{}

const BootCampSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    password:{
        type:String,
        required:[true,"Please Enter The Valid Password"],
        minlength:8,
    },
    email:{
        type:String,
        required:[true,"Please Enter The Correct Email"],
        unique:true,
        lowercase:true,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})

export default mongoose.model<BootCampSchema>("BootCamp",BootCampSchema)



