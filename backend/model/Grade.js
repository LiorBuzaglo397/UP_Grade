import mongoose from "mongoose";


const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    user_Id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    gradeType: {
      type: String,
      enum: ['test', 'lab', 'hw'],
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
  });
  
  const Grade = mongoose.model('Grade', gradeSchema);
  
  export default Grade;