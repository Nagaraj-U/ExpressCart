import React from "react"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Signin from "./user/Signin"
import Signup from "./user/Signup"
import Home from "./core/Home"
import Dashboard from "./user/UserDashboard"
import AdminDashboard from "./user/AdminDashboard"
import PrivateRoute from "./auth/PrivateRoute"
import AdminRoute from "./auth/AdminRoute"
import AddCategory from "./Admin/AddCategory"
import AddProduct from "./Admin/AddProduct"



const Routes = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/" exact component={Home}/>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}></PrivateRoute>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}></AdminRoute>
                <AdminRoute path="/create/category" exact component={AddCategory}></AdminRoute>
                <AdminRoute path="/create/product" exact component={AddProduct}></AdminRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes