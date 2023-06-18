import mongoose from "mongoose";


const Schema = mongoose.Schema;

const courseSchema = new Schema ({
    course_ID :{
        type: Schema.Types.ObjectId,
        auto: true,
    } , 

    course_Name : {
        type : String ,
        unique : true ,
        require : true 
    }, 

    semester_Year :{

        type : String,
        require :true
    },

    semesrer_Num :{
        type : String , 
        require :true
    },

    course_Description :{
        type : String ,
        require : true 
    },

    student_List :{
        type : [String],
        default : []

    },

    teacher_list :{
        type : [String],
        default : []
    },

    syllabus : {
        type : Buffer ,
        require : true 
    }
});

export default mongoose.model("Courses" , courseSchema);