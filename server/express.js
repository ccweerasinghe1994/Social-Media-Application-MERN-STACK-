import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import template from "../template";
import userRoutes from './routes/user.routes'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.get('/',(req,res)=>{
    res.status(200).send(
        template()
    )
})
export default app;