import React, { useState , useEffect} from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
// import { Link } from "react-router-dom";
import { createProduct } from "./apiAdmin";

const AddProduct = ()=>{

    const [values,setValues] = useState({
        name : "",
        description : "",
        price : "",
        photo : "",
        quantity : "",
        categories : [], //populating all categories and display in (select tag)
        category : "",  //actual category
        shipping : "",
        error : "",
        loading : false,
        createdProduct : "",
        formData : "", //convert formdata(key/value) using FormData() 
        redirectToProfile : false
    })

    const {user,token} = isAuthenticated()
     
    const {
        name,
        description,
        quantity ,
        price,
        categories,
        category ,
        shipping ,
        error,
        loading ,
        createdProduct ,
        formData,
        redirectToProfile 
    } = values

    useEffect(() =>{
        setValues({...values,formData : new FormData()}) //sending formdata to API (by creating instance of form)
    },[])

    const handleChange = (name) => (event) =>{
        const value = (name === "photo" ? event.target.files[0] : event.target.value)
        formData.set(name,value) //key/value pairs   (name : photo,name,quantity ...)
        setValues({...values,[name] : value})
    } 

    const clickSubmit = (event) =>{
        event.preventDefault()
        setValues({...values , error : "", loading : true})
        createProduct(user._id,token,formData)
        .then((data) =>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name : "",
                    description : "",
                    price : "",
                    photo : "",
                    quantity : "",
                    shipping : "",
                    category : "",
                    error : "",
                    createdProduct : data.name,
                    loading : false
                })
            }
        })
    }

    const productForm = () => {
        return (
            <form className="mb-3" onSubmit={clickSubmit}>

                <h4>select product photo</h4>

                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" /> 
                    </label> 
                </div>

                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={handleChange('name')} className="form-control" type="text" value={name} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Select Category</label>

                    <select onChange={handleChange('category')} className="form-control"> 
                        <option value="607021941ee41b6a2c839803">Node Js</option> 
                        <option value="607021941ee41b6a2c839803">Node Js a dvanced</option> 
                    </select>

                </div>

                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea onChange={handleChange('description')} className="form-control" value={description} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input onChange={handleChange('price')} className="form-control" type="number" value={price} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input onChange={handleChange('quantity')} className="form-control" type="number" value={quantity} />
                </div>


                <div className="form-group">
                    <label className="text-muted">Shipping</label>

                    <select onChange={handleChange('shipping')} className="form-control"> 
                        <option value="1">Yes</option> 
                        <option value="0">No</option>        
                    </select>
                </div>

                <button className="btn btn-outline-primary">Create Product</button>

            </form>
        )
    }

    return (
        <Layout title="Create Product" description="Create your product here" className="container jumbotron">
            {productForm()}
        </Layout>
    )
}

export default AddProduct