import mongoose from "mongoose";

const connection = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Database connected`);
    }catch(e){
        console.log('Error connecting in database', e)
    }
}

export default connection;