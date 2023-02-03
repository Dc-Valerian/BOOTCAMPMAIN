import {Document,model,Schema} from "mongoose";

interface products{
    name:string;
    price:string;
    category:string;
    productImage:string;
}

interface IProduct extends products ,Document{}


const productSchema:Schema<IProduct> = new Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        productImage:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        }
    }
},{timeStamps:true,versionKey:false})

const ProductModel = model<IProduct>("Product",productSchema)

export default ProductModel;