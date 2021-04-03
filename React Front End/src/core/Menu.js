import React, { Fragment } from "react"
import {Link,withRouter} from "react-router-dom"
import { isAuthenticated, signout } from "../auth"

//highlighting current page with different color in navbar
const isActive = (history,path)=>{  //hisory : comes with props ,  path : manually sending path 
    if(history.location.pathname === path){
        return {color : "#ff9900"}
    }else{
        return {color : "#ffffff"}
    }
}

//alternative to props.history => {history} destructing props
  
const Menu = (props) =>{    //default prop comes with BrowserRouter
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(props.history,"/")}>Home</Link>
                </li>

                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin" style={isActive(props.history,"/signin")}>Login</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={isActive(props.history,"/signup")}>Signup</Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                    <span className="nav-link" onClick={()=>{
                        signout(()=>{
                            props.history.push("/")
                        })
                        }} style={{cursor : "pointer" , color : "#ffffff"}}>Signout</span>
                     </li>
                )}

            </ul>
        </div>
    )
}

export default withRouter(Menu)