import React from "react"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Signin from "./user/Signin"
import Signup from "./user/Signup"
import Home from "./core/Home"
import Dashboard from "./user/UserDashboard"
import AdminDashboard from "./user/AdminDashboard"
import PrivateRoute from "./auth/PrivateRoute"
import AdminRoute from "./auth/AdminRoute"



const Routes = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/" exact component={Home}/>
                <PrivateRoute path="/user/dashboard" component={Dashboard}></PrivateRoute>
                <AdminRoute path="/admin/dashboard" component={AdminDashboard}></AdminRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes