import React from "react"
import {Link,withRouter} from "react-router-dom"

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

                <li className="nav-item">
                    <Link className="nav-link" to="/signin" style={isActive(props.history,"/signin")}>Login</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/signup" style={isActive(props.history,"/signup")}>Signup</Link>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Menu)