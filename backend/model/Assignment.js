import mongoose from 'mongoose';

const { Schema } = mongoose;

const assignmentSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  course_ID: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  assignment_Name: {
    type: String,
    required: true,
  },
  upload_Date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['test', 'hw', 'lab'],
    required: true,
  },
});

export default mongoose.model('Assignment', assignmentSchema);
