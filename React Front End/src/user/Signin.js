import React,{useState} from "react"
import Layout from "../core/Layout"
import {Redirect} from "react-router-dom"
import {authenticate, signin,isAuthenticated} from "../auth/index"

/*
authenticate : store jwt token in browser (set token)
isAuthenticated : check wether token is present in client browser and return token (get token)
 */

const Signin = ()=>{

    const [values,setValues] = useState({
        email : "nagarajullegaddi@gmail.com",
        password : "123456",
        error : "",
        loading : false,
        redirectToReferrer : false
    })
    const {email,password,error,loading,redirectToReferrer} = values

    const {user} = isAuthenticated() //redirecting user based on role
    
    //eventName can be "name","email","password"
    const handleChange = (name)=> (event) =>{
        setValues({...values , error:false , [name] : event.target.value}) //spread old values and update the current event , set error to false if user starts typing again
    }
    
  
    const clickSubmit = (event) =>{
        event.preventDefault() //prevent refresh
        setValues({...values , error:false,loading:true}) //clear all prev values
        signin({email,password})
        .then((data)=>{
            if(data.error){
                setValues({...values , error : data.error, loading:false}) 
            }else{
                //storing user token
                authenticate(data,()=>{
                    setValues({...values ,email : "",password : "", loading:false,redirectToReferrer : true}) 
                })
            }
        })
    }


    const signUpForm = ()=> {
        return (
            <div>
                <form>

                    <div className="form-group">
                        <label className="text-muted" >Email</label>
                        <input type="email" onChange={handleChange('email')} className="form-control" value={email}></input>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" className="form-control" onChange={handleChange('password')} value={password}></input>
                    </div>

                    <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
                </form>
            </div>
        )
    }

    const showError = ()=>{
        return <div className="alert alert-danger" style={{display : error? "" : "none"}}>{error}</div>
    }

    const showLoading = ()=>{
         return (loading && <div className="alert alert-info">
            <h3>Loading....</h3>
        </div>)
    }

    //redirect based on roles
    const redirect = ()=>{
        if(redirectToReferrer){
            if(user && user.role === 0){
                return <Redirect to="/user/dashboard" />
            }else{
                return <Redirect to="/admin/dashboard" />
            }
        }

        //Redirecting user to home if he try to access admin dashboard
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    return <div>
        <Layout title="SignIn Page" description="Node React Signin Page" className="container col-md-6 offset-md-3">
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirect()}
        </Layout>
    </div>
}

export default Signin