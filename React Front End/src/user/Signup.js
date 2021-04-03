import React,{useState} from "react"
import Layout from "../core/Layout"
import {Link} from "react-router-dom"
import {signup} from "../auth/index"


const Signup = ()=>{

    const [values,setValues] = useState({
        name : "",
        email : "",
        password : "",
        error : "",
        success : false
    })
    const {name,email,password,error,success} = values
    
    //eventName can be "name","email","password"
    const handleChange = (name)=> (event) =>{
        setValues({...values , error:false , [name] : event.target.value}) //spread old values and update the current event , set error to false if user starts typing again
    }
    
  
    const clickSubmit = (event) =>{
        event.preventDefault() //prevent refresh
        setValues({...values,error:false}) //clear all prev values
        signup({name,email,password})
        .then((data)=>{
            if(data.error){
                setValues({...values , error :data.error , success : false}) 
            }else{
                setValues({...values,name : "",email : "" , password : "" , error : "", success : true}) //clear all values in input field
            }
        })
    }


    const signUpForm = ()=> {
        return (
            <div>
                <form>

                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input type="text" className="form-control" onChange={handleChange('name')} value={name}></input>
                    </div>

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

    const showSuccess = ()=>{
        return <div className="alert alert-info" style={{display : success? "" : "none"}}>
            Successfully created new account. Please <Link to="/signin">Login</Link>
        </div>
    }

    return <div>
        <Layout title="SignUp Page" description="Node React SignUp Page" className="container col-md-6 offset-md-3">
            {showError()}
            {showSuccess()}
            {signUpForm()}
        </Layout>
    </div>
}

export default Signup