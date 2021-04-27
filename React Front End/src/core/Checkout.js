import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import {isAuthenticated} from "../auth"
import DropIn from "braintree-web-drop-in-react"; //provides credit cart payment interface
import {getBraintreeClientToken} from "./apiCore"


const Checkout = ({products}) =>{
    const [data,setData] = useState({
        success : false,
        error : "",
        clientToken : null,
        instance : {},
        address : ""
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId,token) =>{
        getBraintreeClientToken(userId,token)
        .then((data) =>{
            if(data.error){
                setData({...data,error : data.error})
            }else{
                setData({...data,clientToken : data.clientToken})
            }
        })
    }

    useEffect(() =>{
        getToken(userId,token)
    },[])

   
    const showDropIn = () =>{
        return (
            <div>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn options={{authorization : data.clientToken}} onInstance={(instance) => (data.instance = instance)}/>
                        <button className="btn btn-primary">proceed to payment</button>
                    </div>
                ) : null }
            </div>
        )
    }

    const showCheckout = () => {
        return (
            isAuthenticated() ? (
                 <div>{showDropIn()}</div>
             ) : (
                 <Link to="/signin"><button className="btn btn-md btn-primary">SignIn to proceed</button></Link>
             )
        )
    }

     const totalAmount = () =>{
        return products.reduce((accumulator,currentProduct) => {
            return accumulator + currentProduct.count*currentProduct.price
        },0)
    }

    return (
        <div>
             <h5>Order total : {totalAmount()} Rs</h5>
             {showCheckout()}
        </div>
    )
}

export default Checkout