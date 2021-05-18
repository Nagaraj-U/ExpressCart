import Layout from "../core/Layout"
import React,{useState,useEffect} from "react"
import {getAllProducts,deleteProduct} from "./apiAdmin"
import { isAuthenticated } from "../auth"
import {Link} from "react-router-dom"

const ManageProducts = () => {

    const [products,setProducts] = useState([])

    const token = isAuthenticated().token
    const userId = isAuthenticated().user._id

    const loadProducts = () =>{
        getAllProducts()
        .then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                setProducts(data)
            }
        })
    }

    const destroyProduct = (productId) =>{
        deleteProduct(productId,userId,token)
        .then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                loadProducts()
            }
        })
    }

    useEffect(()=>{
        loadProducts()
    },[])

 

    return (
        <Layout title="E-commerce application" description="Manage Products" dlassName="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <ul className="list-group">
                        {products.map((p,i)=>{
                            return (
                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    <strong>{` ${i+1  }  .  ${p.name}`}</strong>
                                    <Link className="badge badge-warning badge-pill" to={`/admin/product/update/${p._id}`}>
                                        <span>Update</span>
                                    </Link>
                                    <button className="btn-lg badge badge-danger badge-pill" onClick={() =>{
                                        destroyProduct(p._id)
                                    }}>delete</button>
                                </li>
                            )
                        })}
                    </ul>
                    
                </div>
            </div>
        </Layout>
    )
}


export default ManageProducts