import config from "../config/config";
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri
    , {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
mongoose.connection.on('error',()=>{
    throw new Error(`unable to connect to database:${config.mongoUri}`)
})
import app from './express';

app.listen(config.port, (error) => {
        if (error) {
            console.log(error)
        }

        console.info('server started on port %s', config.port);
    }
)