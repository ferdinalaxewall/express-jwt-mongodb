import mongoose from "mongoose"

export const connectDatabase = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGODB_URI); 
        console.log('Database Connected!');
    } catch (error) {
        console.log(error);
        process.exit()
    }
}