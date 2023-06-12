
import express from 'express'; 
import mongoose from "mongoose";
import router from './routes/user-routes';



const app = express();

app.use("/api/user",router);
mongoose
    .connect("mongodb+srv://LiorBuzaglo:<password>@cluster1.ybcsdrv.mongodb.net/UP_Grage?retryWrites=true&w=majority")
    .then(() => app.listen(5000)
    )
    .then(() =>
    console.log("Connected to Data Base and listen to 5000 "))
    .catch((err) => console.log(err));