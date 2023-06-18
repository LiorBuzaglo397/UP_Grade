import express from 'express'; 

import {getAllCourses , addCourse} from '../controllers/course-controller';
const courseRouter = express.Router();

courseRouter.get("/" , getAllCourses);
courseRouter.post("/add" , addCourse);

export default courseRouter;