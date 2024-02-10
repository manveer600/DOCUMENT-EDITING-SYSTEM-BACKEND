import mongoose from "mongoose";

const connection = async() => {
    try{
        await mongoose.connect('mongodb+srv://singhmanveer645:1234567890@cluster0.dd5vd23.mongodb.net/document');
        console.log(`Database connected`);
    }catch(e){
        console.log('Error connecting in database', e)
    }
}

export default connection;