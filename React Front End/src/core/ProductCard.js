import React from "react"
import {Link} from "react-router-dom"
import ImageCard from "./ImageCard";
import moment from "moment"

//showViewProductButton : true for shop and home pages , showViewProductButton : false for single produuct page
const Card = ({product,showViewProductButton=true}) =>{

    const showViewButton = (showViewProductButton) =>{
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                        <button className="btn btn-outline-primary mb-2 mt-2 mr-2">View Product</button>
                </Link>
            )
        )
    }

    const showAddToCartButton = () =>{
        return (
            <button className="btn btn-outline-warning mb-2 mt-2 mr-2">Add to cart</button>
        )
    }

    const showStockStatus = (quantity) =>{
        return (
            quantity > 0 ? <span className="badge badge-success badge-pill mb-2">Stock : In stock</span> :<span className="badge badge-warning badge-pill mb-2">Stock : Out of stock</span>
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
                    {showAddToCartButton()}
                </div>
            </div>
    )
}

export default Card