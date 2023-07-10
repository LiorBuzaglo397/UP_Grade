import express from 'express'
import { getAllUser, login,signup ,getAllCourses,addCourseToStudent } from '../controllers/user-controller.js';

const router = express.Router();


router.get("/" , getAllUser);
router.post("/signup" ,signup);
router.post("/login" ,login);
router.get("/getAllCourses" , getAllCourses);
router.post("/addCourseToStudent" , addCourseToStudent);

//addCourseToStudent
export default router;