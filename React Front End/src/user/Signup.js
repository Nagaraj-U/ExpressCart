import React,{useState} from "react"
import Layout from "../core/Layout"
import {API} from "../config"


const Signup = ()=>{

    const [values,setValues] = useState({
        name : "",
        email : "",
        password : "",
        error : "",
        success : false
    })
    const {name,email,password} = values
    
    //eventName can be "name","email","password"
    const handleChange = (name)=> (event) =>{
        setValues({...values , error:false , [name] : event.target.value}) //spread old values and update the current event
    }

    

    const signup = (user) => {
        fetch(`${API}/signup`,{
            method : "POST",
            headers : {
                Accept : 'application/json',
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(user)
        })
        .then((response)=>{
            return response.json()
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    
  
    const clickSubmit = (event) =>{
        event.preventDefault()
        signup({name,email,password})
    }


    const signUpForm = ()=> {
        return (
            <div>
                <form>

                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input type="text" className="form-control" onChange={handleChange('name')}></input>
                    </div>

                    <div className="form-group">
                        <label className="text-muted" >Email</label>
                        <input type="email" onChange={handleChange('email')} className="form-control"></input>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" className="form-control" onChange={handleChange('password')}></input>
                    </div>

                    <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
                </form>
            </div>
        )
    }
    return <div>
        <Layout title="SignUp Page" description="Node React SignUp Page" className="container col-md-6 offset-md-3">
            {signUpForm()}
            {JSON.stringify(values)}
        </Layout>
    </div>
}

export default Signup