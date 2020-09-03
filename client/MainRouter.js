import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from './core/Home'
import {User} from "./user/Users.component";

const MainRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact  path='/' component={Home}/>
                <Route path='/users' component={User}/>
            </Switch>
        </div>
    )
}

export default MainRouter;