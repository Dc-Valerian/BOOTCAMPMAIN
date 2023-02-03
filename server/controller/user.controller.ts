import {Request,Response,NextFunction} from "express"
import userModel from "../model/user.model";
import cloudinary from "../config/cloudinary"
import {asyncHandler} from "../utils/asyncHandler"
import {AppError,HttpCode} from "../utils/App.Error"
import productModel from "../model/user.product.model"
import bcrypt from "bcrypt"


// TO POST A PRODUCT
export const postproduct = asyncHandler(
async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
    const cloudImg = await cloudinary.uploader.upload(req?.file!.path)
    const {name,category,productImage,price} = req.body;

    const product = await productModel.create({
        name,category,productImage:cloudImg.secure_url,price
    })
    if(!product){
        next(
            new AppError({
                message:"Couldn't Upload Product",
                httpCode:HttpCode.BAD_REQUEST
            })
        )
    }
    return res.status(HttpCode.OK).json({
        product
    })
}
)


// TO REGISTER
export const Register = asyncHandler(
    async(req:Request,next:NextFunction,res:Response)=>{
        const {name,email,password} = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashedPassword:string = await bcrypt.hash(password,salt);

        const user = await userModel.create({
            name,email,password:hashedPassword
        })

        if(!user){
            new AppError({
                message:"Account Not Found",
                httpCode:HttpCode.BAD_REQUEST,
            })
        }
        return res.status(HttpCode.OK).json({
            user
        })
    }
)

export const Login = asyncHandler(
    async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
        const {email,password} = req.body;

        if(!email || !password){
            next(
                new AppError({
                    message:"Please Provide the valid email or passowrd",
                    httpCode:HttpCode.BAD_REQUEST,
                })
            )
        }
        const user = await userModel.findOne({email})
        const checkPass = await bcrypt.compare(password,user!.password)
        if(!user){
            next(
                new AppError({
                    message:"Couldn't Login",
                    httpCode:HttpCode.NOT_FOUND,
                })
            )
        }
        if(!checkPass){
            next(
                new AppError({
                    message:"Please Enter the valid password",
                    httpCode:HttpCode.UNAUTHORIZED
                })
            )
        }
        return res.status(HttpCode.OK).json({
            message:`${user!.name} you are welcome`,
            user
        })
    }
)
// to get 
export const getUser = asyncHandler(
    async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
        const user = await userModel.find()
        if(!user){
            next(
                new AppError({
                    message:"couldn't get user",
                    httpCode:HttpCode.NOT_FOUND,
                })
            )
        }
        return res.status(HttpCode.NOT_FOUND).json({
            message:`Successfully got all ${user.length} (S)user`,
            user
        })
    }
)