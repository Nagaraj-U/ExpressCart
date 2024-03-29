import Layout from "./Layout"
import React ,{useState,useEffect} from "react";
import {getProducts} from "./apiCore"
import Card from "./ProductCard"
import Search from "./Search";


const Home = ()=>{

    
    const [productsBySell,setProductsBySell] = useState([])
    const [productsByArrival,setProductsByArrival] = useState([])
    const [error,setError] = useState(false)

    const loadProductsBySold = () => {
        getProducts('sold')
        .then((data) =>{
          if(data.error){
              setError(data.error)
          }else{
            setProductsBySell(data)
          }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt')
        .then((data) =>{
          if(data.error){
              setError(data.error)
          }else{
            setProductsByArrival(data)
          }
        })
    }

    useEffect(()=>{
        loadProductsByArrival()
        loadProductsBySold()
    },[])



    return <div>
        <Layout title="E-commerce App" description="Node React E-commerce App" className="container-fluid">

        <Search/>

        <h4 className="mb-5">New Arrivals</h4>
        <div className="row">
            {productsByArrival.map((product,index) =>{
               return (
                  <div  key={index} className="col-4 mb-3">
                    <Card product={product}/>
                  </div>
               )
            })}

        </div>


        <h4 className="mb-5">Best Sellers</h4>
        <div className="row">
            {productsBySell.map((product,index) =>{
               return (
                  <div  key={index} className="col-4 mb-3">
                    <Card product={product}/>
                  </div>
               )
            })}

        </div>
            
            
        </Layout>
    </div>
}

export default Home