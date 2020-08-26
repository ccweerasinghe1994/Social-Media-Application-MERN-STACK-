import express from 'express';
//body-parser: Request body-parsing middleware to handle the
// complexities of parsing streamable request objects so that we can simplify
// browser-server communication by exchanging JSON in the request body.

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

import template from "../template";
import userRoutes from './routes/user.routes'

const app = express();
//  configure the Express app
// with bodyParser.json() and bodyParser.urlencoded({ extended:
// true })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

// app.get('/',userRoutes)
app.get('/', (req, res) => {
    res.status(200).send(template())
})

export default app;