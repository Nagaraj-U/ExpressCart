import React , {useState,useEffect} from "react"
import Layout from "./Layout"
import {getCategories, getFilteredProducts} from "./apiCore"
import Checkbox from "./Checkbox"
import RadioCheck from "./RadioCheck"
import {prices} from "./priceRange"
import Card from "./ProductCard"

const Shop = () =>{

    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)
    const [limit,setLimit] = useState(6)
    const [skip,setSkip] = useState(0)
    const [size,setSize] = useState(0)
    //filters (categories and price range ) sent to backend
    const [myFilters,setMyFilters] = useState({
        filters : {category : [] , price : []}
    })

    const [filteredProducts,setFilteredProducts] = useState([])

    const init = () =>{
        getCategories()
        .then((data) =>{
            if(data.error){
                setError(data.error)
            }else{
                setCategories(data)
            }
        })
    }

    useEffect(() =>{
        init()
        loadFilteredResults(skip,limit,myFilters.filters)
    },[])

    const loadFilteredResults = (newFilters) =>{
        console.log(newFilters);
        getFilteredProducts(skip,limit,newFilters)
        .then((data)=>{
            if(data.error){
                setError(data.error)
            }else{
                setFilteredProducts(data.data) //open console -> network to check (products available under "data" name)
                setSize(data.size);
                setSkip(0);
            }
        })
    }

    const loadMore = () =>{
        let toSkip = skip + limit
        getFilteredProducts(toSkip,limit,myFilters.filters) //filters remains same
        .then((data)=>{
            if(data.error){
                setError(data.error)
            }else{
                setFilteredProducts([...filteredProducts, ...data.data]) //open console -> network to check (products available under "data" name)
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    //getting data from parent to child (by using callback)
    const handleFilters = (filters,filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters  //filters coming from parent (checkbox) , called everytime on change in input

        //setting price range
        //NOTE : filter coming from Checkbox (price) contains price id "0","1","2" ...
        if(filterBy === "price"){
            let range = extractPriceRange(filters)
            newFilters.filters[filterBy] = range
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters) 
    }

    const extractPriceRange = (filters) =>{
        let arr = []
        const data = prices
        for(let key in data){
            if(data[key]._id === parseInt(filters) ){
                arr = data[key].array
            }
        }
        return arr
    }

    //size > 0 : show only if results available and size >= limit : more than limit(6) results available
    const LoadMoreButton = () => {
        return (
            size > 0 && size >= limit && <button className="btn btn-warning mb-5" onClick={loadMore}>Load more</button>
        )
    }
    return (
        <Layout title="Shop Page" description="Find and shop books of your choice" className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={(filters) => handleFilters(filters,'category')} />
                    </ul>

                    <h4>Filter by Prices</h4>
                    <div>
                        <RadioCheck prices={prices} handleFilters={(filters) => handleFilters(filters,'price')} />
                    </div>
                </div>

                
                <div className="col-8">
                    <h3 className="mb-4">Search Results</h3>
                    <div className="row">
                        {
                            filteredProducts.map((product,index) => {
                                return (
                                    <div className="col-4 mb-3">
                                        <Card product={product}/>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <hr/>
                    {LoadMoreButton()}
                </div>

            </div>
        </Layout>
    )
}

export default Shop