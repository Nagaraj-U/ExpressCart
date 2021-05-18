import {API} from "../config"

export const userRead = (userId,token) =>{
    return fetch(`${API}/user/${userId}`,{
        method : "GET",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}


export const userUpdate = (userId,token,user) =>{
    return fetch(`${API}/user/${userId}`,{
        method : "PUT",
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(user)
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const userPurchaseHistory = (userId,token) =>{
    return fetch(`${API}/orders/by/user/${userId}`,{
        method : "GET",
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const updateUserLocal = (user,next) =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem("jwt")){
            let currentJWT = JSON.parse(localStorage.getItem("jwt")) //jwt : {user,token} properties
            currentJWT.user = user
            localStorage.setItem("jwt",JSON.stringify(currentJWT))
        }
        next()
    }
}