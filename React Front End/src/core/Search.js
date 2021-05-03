import React ,{useState,useEffect} from "react"
import Layout from "./Layout"
import Card from "./ProductCard"
import {getCategories,getSearchProducts} from "./apiCore"

const Search = () =>{

    const [data,setData] = useState({
        categories : [],
        category : "",
        search : "",
        searchFound : false,
        results : []
    })

    const {categories,category,results,search,searchFound} = data

    const loadCategories = () =>{
        getCategories()
        .then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                setData({...data,categories : data})
            }
        })
    }
    
    useEffect(() =>{
        loadCategories()
    },[])

    const searchProducts = () =>{
        //console.log(search,category);
        if(search){
            getSearchProducts({search : search || undefined, category : category})
            .then((response) =>{
                if(response.error){
                    console.log(response.error);
                }else{
                    setData({...data,results : response , searchFound : true})
                }
            })
        }
    }

    const formSubmit = (event) =>{
        event.preventDefault()
        searchProducts()
    }

    const handleChange = (name) => (event) =>{
        setData({...data,[name] : event.target.value,searchFound:false})
    }

    const searchForm = () =>{
        return (
            <form onSubmit={formSubmit}>
                <span className="input-group-text">
                    <div className="input-group input-group-md">

                        <div className="input-group-prepend">
                            <select className="btn mr-2" onChange={handleChange("category")}>
                                <option value="all" >choose category</option>
                                {
                                    categories && categories.map((c,index)=>{
                                        return (
                                            <option key={index} value={c._id}>{c.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                         <input type="search" className="form-control" onChange={handleChange("search")} placeholder="search by name"/>

                    </div>

                    <div className="btn input-group-append" style={{border : "none"}}>
                        <button class="btn btn-outline-secondary" style={{borderRadius : "8px"}}>search</button>
                    </div>

                </span>
            </form>
        )
    }

    const showSearchStatusMessage = (results,searchFound) =>{
            if(results.length > 0 && searchFound){
                return `Showing ${results.length} products`
            }
            if(results.length < 1 && searchFound){
                return `No products found`
            }
        
    }

  

    const showSearchedProducts = (results=[]) =>{
        return (
            <div>
                <h3 className='mb-4 mt-4'>
                    {showSearchStatusMessage(results,searchFound)}
                </h3>
                <div className="row">
                {
                    results && results.map((product,index) =>{
                        return (
                            <div className="col-4 mb-3">
                                <Card product={product} key={index} />
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }

    return (
        <div className="row">
            <div className="container mb-3">
                {searchForm()}
            </div>

            <div className="container-fluid mb-3">
                {showSearchedProducts(results)}
            </div>
        </div>
    )
}

export default Search