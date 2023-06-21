import express from 'express'; 

import {getAllCourses , addCourse ,addStudentToCourse ,addTeacherToCourse} from '../controllers/course-controller.js';
const courseRouter = express.Router();

courseRouter.get("/" , getAllCourses);
courseRouter.post("/addCourse" , addCourse)
courseRouter.post("/addStudentToCourse" , addStudentToCourse);
courseRouter.post("/addTeacherToCourse" , addTeacherToCourse);


export default courseRouter;