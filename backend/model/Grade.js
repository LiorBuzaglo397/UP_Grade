import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    user_Id: {
      type:String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    semester_Year: {
      type: String,
      required: true,
    },
    semester_Num: {
      type: String,
      required: true,
    },
    gradeType: {
      type: String,
      enum: ['test', 'lab', 'hw'],
      required: true,
    },
    gradeTypeNum: {
      type: Number,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
  });


  
  const Grade = mongoose.model('Grade', gradeSchema);
  
  export default Grade;