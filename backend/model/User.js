import mongoose from "mongoose";    

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_ID : {
        type : String,
        unique : true ,
        require : true
    },

    first_Name : {
        type : String ,
        required : true
    },
    last_Name : {
        type : String ,
        required : true
    },

    email : {
        type : String ,
        required : true,
        unique : true
    },
    user_Description : {
        type : String ,
        required : true
    },

    user_Approved : {
        type : String ,
        required : true

    },

    courses :{
        type : [String] , 
        default : []
    } ,
    user_Password : {
        type : String ,
        required : true,
        minlength : 8
    }
    

});

export default mongoose.model("User" , userSchema)
//user