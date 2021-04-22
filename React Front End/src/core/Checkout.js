import React from "react"
import {Link} from "react-router-dom"
import {isAuthenticated} from "../auth"

const Checkout = ({products}) =>{

    const totalAmount = () =>{
        return products.reduce((accumulator,currentProduct) => {
            return accumulator + currentProduct.count*currentProduct.price
        },0)
    }

    const showCheckout = () => {
        return (
            isAuthenticated() ? (
                 <button className="btn btn-success">Proceed to payment</button>
             ) : (
                 <Link to="/signin"><button className="btn btn-md btn-primary">SignIn to proceed</button></Link>
             )
        )
    }
    return (
        <div>
             <h5>Order total : {totalAmount()} Rs</h5>
             {showCheckout()}
        </div>
    )
}

export default Checkout