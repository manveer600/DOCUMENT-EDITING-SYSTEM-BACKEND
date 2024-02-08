import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    documentId:{
        type:String,
    }
})

const userModel = mongoose.model('user', userSchema);
export default userModel;