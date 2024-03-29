import React from "react"
import {Redirect, Route} from "react-router-dom"
import {isAuthenticated} from "./index.js"

const PrivateRoute = ({component : Component,...rest})=> { //renaming component to Component (jsx convention)
    return (
        <Route {...rest}  

        render = { (props) => (
            isAuthenticated() ? 
            (<Component {...props}/>) : 
            (<Redirect to={{pathname : "/signin" , state: {from : props.location}}}/>)
        )}/>

        
    )
}

export default PrivateRoute