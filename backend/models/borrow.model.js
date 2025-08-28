import mongoose, { Schema } from "mongoose";

const borrowSchema = mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    bookId:{
        type:Schema.Types.ObjectId,
        ref:'Book',
        required: true,
    },
    borrowDate:{
        type:Date,
        default:Date.now,
    },
    returnDuration:{
        type:String,
        required:true,
    }
});

const borrowModel = mongoose.model('Borrow',borrowSchema);
export default borrowModel;