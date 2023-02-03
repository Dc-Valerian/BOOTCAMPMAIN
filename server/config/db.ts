import mongoose from 'mongoose'

const BC_URL = "mongodb://0.0.0.0:27017/BootCampMain"

export  const BcConnection =async():Promise<void>=>{
    try {
        const BC = await mongoose.connect(BC_URL)
        console.log(`succesfully connect my BootCamp Databse ${BC.connection.host}`);
        
    } catch (error) {
        console.log(error);
    }
}