import { Schema, model } from 'mongoose';
import Courses from './Courses';

const userSchema = new Schema({
  user_ID: {
    type: String,
    unique: true,
    required: true,
  },
  first_Name: {
    type: String,
    required: true,
  },
  last_Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user_Description: {
    type: String,
    required: true,
  },
  user_Approved: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Courses',
    },
  ],
  user_Password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

export default model('User', userSchema);

