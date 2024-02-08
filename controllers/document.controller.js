
// controller 

import Document from "../schema/documentSchema.js";


export const getDocument = async(id) => {
    if (id === null || id === undefined) {
        return;
    }

    try {
        const document = await Document.findOne({customId:id});
        
        if (document) {
            return document;
        }
        else{
        // If the document doesn't exist, create a new one with an empty data field
        const newDocument = await Document.create({customId: id , data: "" });
        return newDocument;
        }
    } catch (error) {
        return null;
    }
};



export const updateDocument = async (id, data) => {
    try {
        return await Document.findOneAndUpdate({customId:id}, { data });
    } catch (error) {
        console.error("Error in updateDocument:", error.message);
    }
};



