import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes';
import router from './routes/user-routes';
import cors from 'cors';

const app = express();
app.use(cors({
   origin: "*"
}));
app.use(express.json());
/**Here using the express.json bcoz in postparameters we are providing the json format 
 * which is not understood by the application that's why in functions like signup we won't
 * get any post parameters in the request body if we don't have express.json here..*/

app.use("/user",router);
app.use("/blogs",blogRouter);

mongoose.connect(
    'mongodb://localhost:27017/BlogProj'
    )
    .then(()=>app.listen(5000))
    .then(()=>
       console.log("Connected,Listening on port 5000")
    )
    .catch((err) => console.log(err));

