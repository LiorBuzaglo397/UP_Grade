
import express from 'express'; 
import mongoose from 'mongoose';
const app = express();

mongoose
    .connect("mongodb+srv://<LiorBuzaglo>:<Ll18061996>@UP_Grade.ybcsdrv.mongodb.net/?retryWrites=true&w=majority")
    .then(() => app.listen(5000)
    )
    .then(() =>
    console.log("Connected to Data Base and listen to 5000 ")
    )
    .catch((err) => console.log(err));



