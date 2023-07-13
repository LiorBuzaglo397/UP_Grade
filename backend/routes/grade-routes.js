import express from 'express'; 
import {getAllGrades ,addGrade ,getGradesByStudentID,getGradesByCourseIDForTeacher, getGradesByCourseIDForStudent, addGradeWithFile} from '../controllers/grade-controller.js';

const gradeRouter = express.Router();

gradeRouter.get("/" ,getAllGrades);
gradeRouter.post("/add" , addGrade);
gradeRouter.get("/getGradesByStudentID" ,getGradesByStudentID);
gradeRouter.get("/getGradesByCourseIDForTeacher" ,getGradesByCourseIDForTeacher);
gradeRouter.get("/getGradesByCourseIDForStudent" ,getGradesByCourseIDForStudent);
//addGradeWithFile
gradeRouter.get("/addGradeWithFile" ,addGradeWithFile);



export default gradeRouter;