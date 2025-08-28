import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        required:true,
    }
});

const userModel = mongoose.model('User',userSchema);

export default userModel;