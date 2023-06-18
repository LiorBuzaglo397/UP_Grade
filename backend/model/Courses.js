import mongoose from "mongoose";


const Schema = mongoose.Schema;

const courseSchema = new Schema ({
    course_ID :{
        type : String ,
        unique : true ,
        require : true
    } , 

    course_Name : {
        type : String ,
        unique : true ,
        require : true 
    }, 

    course_Description :{
        type : String ,
        require : true 
    },

    syllabus : {
        type : Buffer ,
        require : true 
    }
});

export default mongoose.model("Courses" , courseSchema);