import Layout from "../core/Layout"
import React,{useState,useEffect} from "react"
import {listOrders} from "./apiAdmin"
import {isAuthenticated} from "../auth/index"
import moment from "moment"

const Orders = () =>{

    const [orders,setOrders] = useState([])

    const user = isAuthenticated().user
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token

    const loadOrders = () =>{
        listOrders(userId,token)
        .then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                setOrders(data)
            }
  
        })
    }

    useEffect(() =>{
        loadOrders()
    },[])

    const showOrdersLength = (orders) =>{
            if(orders.length > 0){
                return (
                    <h4 className="text-danger ml-4">Total Orders : {orders.length}</h4>
                )
            }else{
                <h3 className="text-danger">No orders found</h3>
            }
            
    }

    const showProductDetail = (name,value) =>{
        return (
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                    <div className="input-group-text">{name}</div>
                </div>
                <input type="text" className="form-control" value={value} readOnly = "true" />
            </div>
        )
    }

    return (
        <Layout title="Orders" description={`Welcome ${user.name} , Manage Your orders here`}>
            {showOrdersLength(orders)}


   
            <div className="row">
                    {
                        orders.map((order,orderIndex) =>{
                            return (
                                <div className="col-md-5">
                                        <div key={orderIndex} className="col col-md-2 card text-white bg-dark mb-3 mr-5 ml-5 mt-5"  style={{"maxWidth": "80rem" , "fontSize":"17px"}}>
                                        {/* <div className="card-header"><h5>{order.user.name}</h5></div> */}
                                            <div className="card-body">
                                               <h5 className="card-title mt-9">Ordered By  :  {order.user.name.charAt(0).toUpperCase() + order.user.name.slice(1)}</h5>
                                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                                <ul className="list-group mb-2">
                                                    <li className="list-item mb-2">
                                                        status : {order.status}
                                                    </li>

                                                    <li className="list-item mb-2">
                                                        Transaction ID : {order.transaction_id}
                                                    </li>

                                                    <li className="list-item mb-2">
                                                        Amount : {order.amount}
                                                    </li>

                                                    <li className="list-item mb-2">
                                                        Addresss : {order.address}
                                                    </li>

                                                    <li className="list-item mb-2">
                                                        Ordered on : {moment(order.updated).fromNow()}
                                                    </li>

                                                    <li className="list-item mb-2">
                                                        Order Id : {order._id}
                                                    </li>

                                                </ul>

                                                <div>
                                                    Total products ordered : {order.products.length}
                                                    {
                                                        order.products.map((product,productIndex)=>{
                                                            return (
                                                                <div className="" style={{"padding" : "15px"}}>
                                                                    {showProductDetail("Product name",product.name)}
                                                                    {showProductDetail("Product id",product._id)}
                                                                    {showProductDetail("Product price",product.price)}
                                                                    {showProductDetail("Product count",product.count)}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                        </div>
                                        </div>
                                </div>
                            )
                        })
                    }
            </div>
                 
            
        </Layout>
    )
}

export default Orders