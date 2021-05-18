import React,{useState,useEffect} from "react"
import { isAuthenticated } from "../auth"
import Layout from "../core/Layout"
import {userRead,userUpdate,updateUserLocal} from "./apiUser"
import {Redirect} from "react-router-dom"


//update in local storage
const Profile = (props) =>{

    const [values,setValues] = useState({
        name : "",
        email : "",
        password : "",
        error : false,
        success : false
    })

    const {name,email,password,error,success} = values
    const token = isAuthenticated().token

    const init = (userId) =>{
        userRead(userId,token)
        .then((data)=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,name : data.name, email:data.email})
            }
        })
    }

    useEffect(()=>{
        init(props.match.params.userId)
    },[])

    const handleChange = (name) => (e) =>{
        setValues({...values,error:false,[name] : e.target.value})
    }

    const clickSubmit = (e) =>{
        e.preventDefault()
        userUpdate(props.match.params.userId,token,{name,email,password})
        .then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                updateUserLocal(data,() =>{
                    setValues({...values , success : true , name : data.name , email : data.email })
                })
            }
        })
    }

    const redirect = () =>{
        if(success){
            return (
                <Redirect to="/cart" />
            )
        }
    }

  

    const profileUpdate = (name,email,password) =>{
        return (
            <form className="container col-md-6 offset-md-3">
                <div className="form-group">
                    <label className="text-muted">name</label>
                    <input type="text" className="form-control" value={name} onChange={handleChange("name")} />
                </div>

                <div className="form-group">
                    <label className="text-muted">email</label>
                    <input type="email" className="form-control" value={email} onChange={handleChange("email")} />
                </div>

                <div className="form-group">
                    <label className="text-muted">password</label>
                    <input type="password" className="form-control" value={password} onChange={handleChange("passwprd")} />
                </div>

                <button className="btn btn-info" onClick={clickSubmit}>Update</button>
            </form>
        )
    }

    return (
        <Layout title="Ecom Application" description="Update profile" className="container-fluid">
             {/* {showSuccess()} */}
             {profileUpdate(name,email,password)}
             {redirect()}

        </Layout>
    )
}

export default Profile