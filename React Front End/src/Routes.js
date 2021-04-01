import React from "react"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Signin from "./user/Signin"
import Signup from "./user/Signup"
import Home from "./core/Home"


const Routes = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/" exact component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes