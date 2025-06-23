import express from 'express'; 

import {getAllAssignment , addAssignment , getAllAssignmentByCourseID ,addOrUpdateAssignment } from '../controllers/assignment-controller.js';
const assignmentRouter = express.Router();

assignmentRouter.get("/" , getAllAssignment);
assignmentRouter.post("/addAssignment" , addAssignment);
assignmentRouter.get("/getAllAssignmentByCourseID" , getAllAssignmentByCourseID);
assignmentRouter.post("/addOrUpdateAssignment" , addOrUpdateAssignment);



export default assignmentRouter;