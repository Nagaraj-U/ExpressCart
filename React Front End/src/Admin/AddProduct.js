import React, { useState , useEffect} from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { createProduct , getCategories } from "./apiAdmin";

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

    //load catrgories and set form data
    const init = () =>{
        getCategories()
        .then((data) =>{
            if(data.error){
                setValues({...values,error : data.error})
            }else{
                setValues({...values,categories : data , formData : new FormData()}) //sending formdata to API (by creating instance of form)
            }
        })
    } 
    
    useEffect(() =>{
        init() 
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
                    createdProduct : data.name,
                    loading : false
                })
            }
        })
        // event.target.reset()
    }

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{display : error ? "" : "none"}}>{error}</div>
        )
    }

    const showSuccess = ()=>{
        return (
            <div className="alert alert-success" style={{display : createdProduct ? "" : "none"}}>
                <h4>New Product {`${createdProduct}`} is created</h4>
            </div>
        )
    }

    const showLoading = () =>{
        return (
            loading && <div className="alert alert-success">
                <h4>Loading ... </h4>
            </div>
        )
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
                    <input onChange={handleChange('name')} className="form-control" type="text" value={name} autoFocus/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Select Category</label>

                    <select onChange={handleChange('category')} className="form-control"> 
                        <option>Select Category</option>
                            
                            {categories && categories.map((c,i)=>{
                                return (
                                    <option key={i} value={c._id}>{c.name}</option>
                                )
                            })} 
                       
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
        <Layout title="Create Product" description="Create your product here" className="">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {productForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct

