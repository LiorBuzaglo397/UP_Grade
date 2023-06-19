import mongoose from "mongoose";


const Schema = mongoose.Schema;

const courseSchema = new Schema ({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
    

    course_ID :{
        type : String,
        require : true
    } , 

    course_Name : {
        type : String ,
        require : true 
    }, 

    semester_Year :{

        type : String,
        require :true
    },

    semester_Num :{
        type : String , 
        require :true
    },


    student_List :{
        type : [String],
        default : []

    },

    teacher_list :{
        type : [String],
        default : []
    }
});

export default mongoose.model("Courses" , courseSchema);