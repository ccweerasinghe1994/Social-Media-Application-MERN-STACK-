import config from "../config/config";
import app from './express';
app.listen(config.port,(error)=>{
    if (error){
        console.log(error)
    }

        console.info('server started on port %s',config.port);
}


)