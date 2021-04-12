import React from "react"
import {API} from "../config"


const ImageCard = ({product,url}) =>{
    return (
        <div className="product-img"> 
            <img 
                src={`${API}/${url}/photo/${product._id}`} 
                alt={product.name} 
                className="mb-3" 
                style={{maxHeight :  "100%" , maxWidth : "100%"}}                
            />
        </div>
    )
}

export default ImageCard