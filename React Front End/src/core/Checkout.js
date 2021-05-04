import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import {isAuthenticated} from "../auth"
import DropIn from "braintree-web-drop-in-react"; //provides credit cart payment interface
import {getBraintreeClientToken,processPayment,createOrder} from "./apiCore"
import { emptyCart } from "./cartHelper";



const Checkout = ({products}) =>{
    const [data,setData] = useState({
        success : false,
        error : "",
        clientToken : null,
        instance : {}, //values present in DropIn at any instance
        address : ""
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId,token) =>{
        getBraintreeClientToken(userId,token)
        .then((response) =>{
            if(response.error){
                setData({...data,error : response.error})
            }else{
                setData({clientToken : response.clientToken})
            }
        })
    }

    useEffect(() =>{
        getToken(userId,token)
    },[])

    const buy = () =>{
        //send nonce to server (nonce : gives payment method)
        //nonce : data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
                        .then((response)=>{ 
                            //response -> {nonce: "tokencc_bh_mjt3rm_cctgvt_sz5k2b_3d6pxg_tf4", details: {…}, type: "CreditCard", description: "ending in 11", binData: {…}}
                            // console.log(data);
                            nonce = response.nonce  //set payment type

                            //passing this to backend
                            const paymentData = {
                                paymentMethodNonce : nonce,
                                amount : totalAmount(products)
                            }
                            processPayment(userId,token,paymentData)
                            .then((response) =>{
                                setData({...data,success : response.success})
                                console.log(response);

                                //create order before empty cart
                                const orderData = {
                                    products : products,
                                    transaction_id : response.transaction.id,
                                    amount : parseInt(response.transaction.amount),
                                    updated : response.transaction.createdAt,
                                    address : data.address
                                }
                                createOrder(userId,token,orderData)
                                // console.log(orderData);

                                //empty cart
                                emptyCart(()=>{
                                    console.log("cart empty");
                                })
                                
                            })
                            .catch((error)=>{
                                console.log(error);
                            })
                        })
                        .catch((error) =>{
                            //Error -> DropinError {name: "DropinError", message: "No payment method is available.", _braintreeWebError: undefined}
                             setData({...data,error : error.message})
                        })
    }

    const showError = (error) =>{
        return(
            <div className="alert alert-danger" style={{display : error? "" : "none"}}>
                {error}
            </div>
        )
    }

    const showSuccess = (success) =>{
        return (
            success && <div className="alert alert-success">
                Payment successfull ! , Your order has been placed
            </div>
        )
    }

    const handleAddress = (event) =>{
        setData({...data,address : event.target.value})
    }
   
    const showDropIn = () =>{
        return (
            <div onBlur={() => {setData({...data,error:""})}}>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>

                        <div className="gorm-group mt-4">
                            <label className="text-muted">Delivery Address </label>
                            <textarea onChange={handleAddress} className="form-control mb-5" value={data.address} placeholder="enter delivery address here..."/>
                        </div>

                        <DropIn options={
                                { 
                                    authorization : data.clientToken,
                                    paypal : {
                                        flow : "vault"
                                    }
                                }   
                            }
                                onInstance={(instance) => (data.instance = instance)}
                        />
                        <button className="btn btn-success btn-block" onClick={buy}>Pay  {`${totalAmount()}`}</button>
                    </div>
                ) : null }
            </div>
        )
    }

    const showCheckout = () => {
        return (
            isAuthenticated() ? (
                 <div>
                     {showSuccess(data.success)}
                     {showError(data.error)}
                     {showDropIn()}
                 </div>
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