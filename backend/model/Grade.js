import mongoose from "mongoose";


const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
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
    type: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
  });
  
  const Grade = mongoose.model('Grade', gradeSchema);
  
  export default Grade;