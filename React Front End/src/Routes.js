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
import Shop from "./core/Shop"
import SingleProuduct from "./core/SingleProduct"
import Cart from "./core/Cart"
import Orders from "./Admin/Order"
import Profile from "./user/Profile"
import ManageProducts from "./Admin/ManageProducts"



const Routes = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/shop" exact component={Shop}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}></PrivateRoute>
                <PrivateRoute path="/profile/:userId" exact component={Profile}></PrivateRoute>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}></AdminRoute>
                <AdminRoute path="/create/category" exact component={AddCategory}></AdminRoute>
                <AdminRoute path="/create/product" exact component={AddProduct}></AdminRoute>    
                <AdminRoute path="/admin/orders" exact component={Orders}></AdminRoute>    
                <AdminRoute path="/admin/manage/products" exact component={ManageProducts}></AdminRoute>    
                <Route path="/product/:productId" exact component={SingleProuduct} />
                <Route path="/cart" exact component={Cart} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes