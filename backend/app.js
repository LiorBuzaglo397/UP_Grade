import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js'; // Update the file extension to .js
import cookieParser from 'cookie-parser';

import courseRouter from './routes/course-routes.js'; // Update the file extension to .js
import gradeRouter from './routes/grade-routes.js'; // Update the file extension to .js
import assignmentRouter from './routes/Assignment-routes.js'; // Update the file extension to .js
import cors from 'cors';

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/user', router);
app.use('/api/course', courseRouter);
app.use('/api/grade', gradeRouter);
app.use('/api/assignment', assignmentRouter);

mongoose
  .connect('mongodb+srv://LiorBuzaglo:Ll18061996@cluster1.ybcsdrv.mongodb.net/UP_Grade?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log('Connected to Database and listening on port 5001');
    });
  })
  .catch((err) => {
    console.log(err);
  });
