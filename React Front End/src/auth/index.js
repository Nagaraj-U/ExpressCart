import {API} from "../config"

    export const signup = (user) => {
        return fetch(`${API}/signup`,{
            method : "POST",
            headers : {
                Accept : 'application/json',
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(user) //convert js object to json
        })
        .then((response)=>{
            return response.json()
        })
        .catch((error) => {
            console.log(error)
        })
    }


    export const signin = (user) => {
        return fetch(`${API}/signin`,{
            method : "POST",
            headers : {
                Accept : 'application/json',
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(user) //convert js object to json
        })
        .then((response)=>{
            return response.json()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //storing jwt token in browser localStorage
    export const authenticate = (data,next) =>{
        if(typeof window !== undefined){
            localStorage.setItem('jwt',JSON.stringify(data)) //js obj to json
        } 
        next() 
    } 



    export const signout = (next)=>{
        if(typeof window !== undefined){
            localStorage.removeItem("jwt")  //remove token from client browser
            next()   //redirecting to home
            return fetch(`${API}/signout`,{    //backend get request to logout
                method : "GET"
            })
            .then((response) => {
                console.log('signout', response);
            })
            .catch((error)=>{
                console.log(error);
            })
            
        }
    }

    export const isAuthenticated = ()=>{
        if(typeof window == 'undefined'){
            return false
        }

        if(localStorage.getItem("jwt")){
            return JSON.parse(localStorage.getItem("jwt"))
        }else{
            return false;
        }
    }
    