import React,{useState,useEffect} from "react"
import Layout from "./Layout"
import {getSingleProduct,getRelatedProducts} from "./apiCore"
import Card from "./ProductCard"

const SingleProuduct = (props) =>{

    const [product,setProduct] = useState({})
    const [error,setError] = useState(false)
    const [relatedProducts,setRelatedProducts] = useState([])

    const getProduct = (productId) => {
        getSingleProduct(productId)
        .then((data) =>{
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data)
                getRelatedProducts(data._id)
                .then((data)=>{
                    if(data.error){
                        setError(data.error)
                    }else{
                        setRelatedProducts(data)
                    }
                })
            }
        })
    }

    useEffect(()=>{
        let productId = props.match.params.productId //getting product id from url
        getProduct(productId)
    },[props]) //whenver there is change in prop (different product may selected from related products)

    return (
        <Layout title={product && product.name} 
                description={product && product.description && product.description.substring(0,100)}
                className="container-fluid"
        >
            <div className="row">
                
                <div className="col-8">
                    {product && product.description && <Card product={product} showViewProductButton={false}/>}
                </div>

                <div className="col-4">
                    {
                        relatedProducts.map((p,i)=>{
                            return (
                                <Card key={i} product={p} className="mb-3 mt-2" />
                            )
                        })
                    }
                </div>
            </div>
        </Layout>
    )
}

export default SingleProuduct