import userLoginModel from "../model/user.Login.model";
import express,{Request,Response} from "express"
import bcrypt from "bcrypt"



// TO REGISTER 
export const Register = async(req:Request,res:Response):Promise<Response>=>{
try {
    const {email,name,password} = req.body;
    if(password.length <= 7){
       return res.status(400).json({
            status:"Password must be least of eight characters"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const user = await userLoginModel.create({
        email,
        password:hashed,
        name
    })
    if(!user)return res.status(401).json("Please Enter the Required Fields")
    return res.status(201).json({
        message:"Successfully Registered",
        data:user
    })
} catch (error) {
    return res.status(404).json({
        message:"oops!....an error has occurred {couldn't register }",
        data:error
    })
}
}

// TO LOGIN 
export const Login =async (req:Request,res:Response):Promise<Response> => {
    try {
        
        const {email,password} = req.body;

        if(!email)  {

            return res.status(404).json("Please Enter The Correct Email")
        }
        const user =await userLoginModel.findOne({email})

        if(!user )   {

            return res.status(401).json("User not Found ...Please Register")
        }

       const checkPassword = await bcrypt.compare(password, user!.password)
    if(!checkPassword) {

        return res.status(401).json({
            status:"password not correct"
        }
        )
    }
    

        return res.status(201).json({
            message:`Welcome ${user.name}`,
            data:user
        })

    } catch (error) {
        return res.status(401).json({
            message:"oops!....an error occurred {couldn't Login}",
            data:error,
        })
    }
}



// TO GET ALL USER
export const GetUsers = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const user = await userLoginModel.find()
        return res.status(200).json({
            message:"Suuccessfully Got All Users",
            data:user
        })
    } catch (error) {
        return res.status(404).json({
            message:"oops!....an error occurred{Couldn't Get All Users}",
            data:error
        })        
    }
}






