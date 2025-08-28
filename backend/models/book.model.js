import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    isbn:{
        type:String,
        unique:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    available:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    bookImg:{
        type:String,
        required:true,
    }
});

const bookModel = mongoose.model('Book',bookSchema);

export default bookModel;