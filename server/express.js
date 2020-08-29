import express from 'express';
//only in development
 import devBundle from "./devBundle";
//----------------------------------



//body-parser: Request body-parsing middleware to handle the
// complexities of parsing streamable request objects so that we can simplify
// browser-server communication by exchanging JSON in the request body.
import path from 'path';
const CURRENT_WORKING_DIRECTORY = process.cwd();

import bodyParser from 'body-parser';

//helmet: Collection of middleware functions to help secure Express apps by
// setting various HTTP headers.
import helmet from 'helmet';

//cors: Middleware to enable cross-origin resource sharing (CORS)
import cors from 'cors';

//compression: Compression middleware that will attempt to compress
// response bodies for all requests that traverse through the middleware.
import compression from 'compression';

//cookie-parser: Cookie parsing middleware to parse and set cookies in
// request objects.
import cookieParser from 'cookie-parser';


import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import template from "../template";

const app = express();

  devBundle.compile(app);


//  configure the Express app
// with bodyParser.json() and bodyParser.urlencoded({ extended:
// true })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIRECTORY, 'dist')))



app.get('/', (req, res) => {
    res.status(200).send(template())
})

app.use('/', authRoutes);
app.use('/', userRoutes);


app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error-------------->>>": err.name + ": " + err.message})
    } else if (err) {
        res.status(400).json({"error>>>>>>>>>>>>>>>>>": err.name + ": " + err.message})


    }
})


export default app;