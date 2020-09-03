import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from './core/Home'
import {User} from "./user/Users.component";
import {Signup} from "./user/Signup.component";
import {SignIn} from "./auth/SignIn.component";

const MainRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact  path='/' component={Home}/>
                <Route path='/users' component={User}/>
                <Route path='/signup' component={Signup}/>
                <Route path='/signin' component={SignIn}/>
            </Switch>
        </div>
    )
}

export default MainRouter;