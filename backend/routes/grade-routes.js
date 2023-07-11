import express from 'express'; 
import {getAllGrades ,addGrade ,getGradesByStudentID,getGradesByCourseIDForTeacher} from '../controllers/grade-controller.js';

const gradeRouter = express.Router();

gradeRouter.get("/" ,getAllGrades);
gradeRouter.post("/add" , addGrade);
gradeRouter.get("/getGradesByStudentID" ,getGradesByStudentID);
gradeRouter.get("/getGradesByCourseIDForTeacher" ,getGradesByCourseIDForTeacher);
//gradeRouter.get("/getGradesByCourseIDForStudent" ,getGradesByCourseIDForStudent);



export default gradeRouter;