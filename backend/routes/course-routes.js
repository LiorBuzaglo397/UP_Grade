import express from 'express'; 

import {getAllCourses , addCourse ,addStudentToCourse ,addTeacherToCourse , getUserByCourseInfo} from '../controllers/course-controller.js';
const courseRouter = express.Router();

courseRouter.get("/" , getAllCourses);
courseRouter.post("/addCourse" , addCourse)
courseRouter.post("/addStudentToCourse" , addStudentToCourse);
courseRouter.post("/addTeacherToCourse" , addTeacherToCourse);
courseRouter.get("/getUserByCourseInfo" , getUserByCourseInfo);



export default courseRouter;