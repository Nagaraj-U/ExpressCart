import React,{useState,useEffect} from "react"
import Layout from "./Layout"
import {Link} from "react-router-dom"
import {getCartItems,removeItem} from "./cartHelper"
import Card from "./ProductCard"
import Checkout from "./Checkout"


/*
When increment, decrement, removal of product happens in Card component, we are successfully updating localstorage cart.
 However we also need to inform the parent, in this case Cart component about the change so that we can run useEffect.
 Most importantly avoid infinit loop as well.

 Now in Card whenever we increment/decrement or remove product...
 we use setRun so that we can run useEffect in parent component > Cart


*/

const Cart = () =>{

    const [items,setItems] = useState([])
    const [run,setRun] = useState(false)

    useEffect(() =>{
        setItems(getCartItems())
    },[run]) //whenever change in items (after remove product from cart state should update)

    const showCartItems = (items) =>{
        return (
            <div>
                <h3>Your cart has {`${items.length}`} items</h3>
                <br></br>
                {
                    items.map((product,index) =>{
                        return <Card product={product} 
                                     key={index} 
                                     showAddToCartButton = {false} 
                                     showCartUpdateOption={true}
                                     showRemoveFromCartButton={true}
                                     run={run}
                                     setRun={setRun}
                                            
                                />
                    })
                }
            </div>
        )
    }

    const showEmptyCartMessage = () =>{
        return (
            <div>
                <h3>OOPS ! Your cart is Empty. </h3>
                <Link className="btn btn-sm btn-secondary mt-4" to="/shop">Go to Shopping Page</Link>
                
            </div>
        )
    }



    return (
        <Layout title="shoping cart" description="manage your cart" className="container-fluid" >
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showCartItems(items) : showEmptyCartMessage()}
                </div>
                <div className="col-6">
                    <h3 className="mb-4">Your cart summary</h3>
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    )
}

export default Cart