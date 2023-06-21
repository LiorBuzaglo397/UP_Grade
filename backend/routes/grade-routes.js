import express from 'express'; 
import {getAllGrades ,addGrade ,getGradesByStudentID,getGradesByCourseID} from '../controllers/grade-controller.js';

const gradeRouter = express.Router();

gradeRouter.get("/" ,getAllGrades);
gradeRouter.post("/add" , addGrade);
gradeRouter.get("/getGradesByStudentID" ,getGradesByStudentID);
gradeRouter.get("/getGradesByCourseID" ,getGradesByCourseID);


export default gradeRouter;