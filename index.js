import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from "path";
import { fileURLToPath } from 'url';
import {register} from './controllers/auth.js'


// configuration

const __filename=fileURLToPath(import.meta.url); //to grab file URL
const __dirname=path.dirname(__filename); //to grab modules

dotenv.config();// to use .env file
const app = express(); //to invoke express.js file
app.use(express.json); // 
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"})); // to set cross-origin policy to true
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended: true})); // to pass body as an object and receive as well in HTTP requests
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors()); // to use cross-origin policy
app.use("/assets", express.static(path.join(__dirname,'public/assets'))); //it will access the assets folder 

// file storage configuration

const storage= multer.diskStorage({
    destination: function(req,file,cb){ // any one who upload the image on app it will save here
        cb(null,"public/assets"); 
    },
    filename:function(req,file,cb){ // it will decide about what will be the file name that will save on the destination
        cb(null,file.originalname);
    }
});
const upload=multer({storage}); // anytime we are going to uploading any file we will use this multer variable to upload any image

//Configuring authentication and authorization
app.post("/auth/register", upload.single("picture"), register); // we are going to upload the picture on local host , we have a route/auth/register, we going to use register form, going to use register controller 
// Database configuration

const port=process.env.PORT;
mongoose
    .connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(()=>{
    app.listen(port,()=>console.log(`Server Port: ${port}`));
}).catch((error)=>{console.error(error)});