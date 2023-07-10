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


    student_List: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      teacher_List: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
});

courseSchema.index({ course_ID: 1, semester_Year: 1, semester_Num: 1 }, { unique: true });


export default mongoose.model("Courses" , courseSchema);