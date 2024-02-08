import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    customId:{
        type:String,
        required:true,
        unique:true
    },
    data:{
        type:Object,
        required:true
    }
})


const Document = mongoose.model('document', documentSchema);

export default Document;




