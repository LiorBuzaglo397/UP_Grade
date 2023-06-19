import express from 'express'
import { getAllUser, login,signup ,getAllCourses } from '../controllers/user-controller';

const router = express.Router();

router.get("/" , getAllUser);
router.post("/signup" ,signup);
router.post("/login" ,login);
router.post("/getAllCourses" , getAllCourses)
export default router;