import React from "react"
import {Link} from "react-router-dom"
import ImageCard from "./ImageCard";

const Card = ({product}) =>{
    return (
        <div className="col-4 mb-5">
            <div className="card" style={{backgroundColor : "#f5f5f5"}}>

                <div className="card-header">
                    {product.name}
                </div>

                <div className="card-body">
                    <ImageCard product={product} url="product"/>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                </div>

                <Link to="/">
                    <button className="btn btn-outline-primary mb-2 mt-2 mr-2">View Product</button>
                    <button className="btn btn-outline-warning mb-2 mt-2 mr-2">Add to cart</button>
                </Link>
            </div>
        </div>
    )
}

export default Card