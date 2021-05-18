import React ,{useState,useEffect} from "react"
import Layout from "../core/Layout"
import {isAuthenticated} from "../auth/index" //returns {token,user}
import {Link} from "react-router-dom"
import {userPurchaseHistory} from "./apiUser"
import moment from "moment"


const Dashboard = () =>{

    const [history,setHistory] = useState([])

    const {name,email,password,role} = isAuthenticated().user
    const token = isAuthenticated().token
    const userId = isAuthenticated().user._id

    const init = () =>{
        userPurchaseHistory(userId,token)
        .then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                setHistory(data)
            }
        })
    }

    useEffect(() =>{
        init()
    },[])

    const userLinks = ()=>{
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">

                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>

                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${userId}`}>Update Profile</Link>
                    </li>

                </ul>
            </div>
        )
    }

    const userInfo  = ()=>{
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 0 ? "Registered User" : "Admin"}</li>
                </ul>
            </div>
        )
    }

    const purchaseHistory = (history) =>{
        return (
            <div className="card mb-1">
                <h3 className="card-header">Purchase History</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {/* {JSON.stringify(history)} */}
                        <div className="row">
                            {history.map((h,i)=>{
                               return (
                                    <div className="col col-md-6">
                                        {h.products.map((p,pId)=>{
                                            return(
                                                <div className="card text-white bg-dark mb-3 mt-3">
                                                <div className="card-header"><h6>Product : {p.name}</h6></div>
                                                <div className="card-body">
                                                    <p className="card-text">Price : {p.price}</p>
                                                    <p className="card-text">Quantity : {p.count}</p>
                                                    <p className="card-text">status : {h.status}</p>
                                                    <p className="card-text">Date : {moment(p.createdAt).fromNow()}</p>
                                                </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                               )
                            })}
                        </div>
                    </li>
                    
                </ul>
            </div>
        )
    }

    return (
        <div>
            <Layout title="Dashboard" description={`Welcome ${name} !`} className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        {userLinks()}
                    </div> 
                    <div className="col-9">
                        {userInfo()}
                        {purchaseHistory(history)}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Dashboard