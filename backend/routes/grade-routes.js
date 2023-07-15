import express from 'express'; 
import {getAllGrades ,addGrade ,getGradesByCourseIDForTeacher, getGradesByCourseIDForStudent, addGradeWithFile ,getGradesByCourseID} from '../controllers/grade-controller.js';

const gradeRouter = express.Router();

gradeRouter.get("/" ,getAllGrades);
gradeRouter.post("/add" , addGrade);
gradeRouter.get("/getGradesByCourseIDForTeacher" ,getGradesByCourseIDForTeacher);
gradeRouter.get("/getGradesByCourseIDForStudent" ,getGradesByCourseIDForStudent);
//addGradeWithFile
gradeRouter.get("/addGradeWithFile" ,addGradeWithFile);
//getGradesByCourseID
gradeRouter.get("/getGradesByCourseID" ,getGradesByCourseID);





export default gradeRouter;