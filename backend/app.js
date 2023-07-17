import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import courseRouter from './routes/course-routes.js';
import gradeRouter from './routes/grade-routes.js';
import assignmentRouter from './routes/Assignment-routes.js';

const app = express();

app.use(cors({ origin: 'https://upgradebyliorandnofar.onrender.com' }));
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
    app.listen(5001, () => {
      console.log('Connected to Database and listening on port 5001');
    });
  })
  .catch((err) => {
    console.log(err);
  });
