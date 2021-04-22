import React ,{useState} from "react"
import {Link,Redirect} from "react-router-dom"
import ImageCard from "./ImageCard";
import moment from "moment"
import {addItem , updateCartCount , removeItem} from "./cartHelper"

//showViewProductButton : true for shop and home pages , showViewProductButton : false for single produuct page
const Card = ({product,showViewProductButton=true ,
                 showAddToCartButton=true ,    
                 showCartUpdateOption = false,
                 showRemoveFromCartButton = false,
                 run = undefined,
                 setRun = f => f
              }) =>{

    const [redirect,setRedirect] = useState(false)
    const [count,setCount] = useState(product.count)

    const showViewButton = (showViewProductButton) =>{
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                        <button className="btn btn-outline-primary mb-2 mt-2 mr-2">View Product</button>
                </Link>
            )
        )
    }


    //cart
    const handleRedirect = (redirect) => {
        if(redirect){
            return (
                <Redirect to="/cart" />
            )
        } 
    }
    
    const addToCart = () =>{
        addItem(product,() =>{
            setRedirect(true)
        })
    }


    const showCartButton = (showAddToCartButton) =>{
        return (
            showAddToCartButton && <button onClick={addToCart} className="btn btn-outline-warning mb-2 mt-2 mr-2">Add to cart</button>
        )
    }

    const showStockStatus = (quantity) =>{
        return (
            quantity > 0 ? <span className="badge badge-success badge-pill mb-2">Stock : In stock</span> :<span className="badge badge-warning badge-pill mb-2">Stock : Out of stock</span>
        )
    }

    //cart increment/decrement
    const handleChange = (productId) => (event) =>{
        setRun(!run)
        setCount(event.target.value < 1 ? 1 : event.target.value) //limit cart count to 1
        updateCartCount(productId,event.target.value) //updating count
    }

    const updateCart = () =>{
        return (
            showCartUpdateOption && <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust quantity</span>
                </div>

                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
        )
    }

    const showRemoveFromCart = (showRemoveFromCartButton) =>{
        return (
            showRemoveFromCartButton && <div className="btn btn-outline-danger" onClick={() => {
                setRun(!run)
                removeItem(product._id)
                }}>
                Remove Product
            </div>
        )
    }

    return (
            <div className="card" style={{backgroundColor : "#f5f5f5"}}>
                <div className="card-header name">
                    {product.name}
                </div>

                <div className="card-body">
                    <ImageCard product={product} url="product"/>
                    <p className="lead mt-2">{product.description}</p>
                    <p className="black-9">Price : {product.price}</p>
                    <p className="black-9">Category : {product.category && product.category.name}</p>
                    <p className="black-9">Added on : {moment(product.createdAt).fromNow()}</p>
                    {showStockStatus(product.quantity)}
                    <br></br>
                    {showViewButton(showViewProductButton)}
                    {showCartButton(showAddToCartButton)}
                    {showRemoveFromCart(showRemoveFromCartButton)}
                    {handleRedirect(redirect)}
                    {updateCart()}
                </div>
            </div>
    )
}

export default Card