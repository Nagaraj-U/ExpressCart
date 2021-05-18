import { API } from '../config';

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json', //'Content-Type : form data (default)
            Authorization: `Bearer ${token}`,
            // 'Content-Type' : 'form-data'
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};


export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method : "GET"
    })
    .then((response) =>{
        return response.json()
    })
    .catch((err) =>{
        console.log(err);
    })
}


export const listOrders = (userId,token) =>{
    return fetch(`${API}/order/list/${userId}`,{
        method  : "GET",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const getStatusValues = (userId,token) =>{
    return fetch(`${API}/order/status-values/${userId}`,{
        method  : "GET",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const updateStatus = (userId,token,orderId,status) =>{
    return fetch(`${API}/order/${orderId}/status/${userId}`,{
        method  : "PUT",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({orderId,status})
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}


/*
get products (api : /products)
get singleproduct (api : /product/:productId)
update product (api product/:productId/:userId)
delete product (api : product/:product/:productId/:userId )
*/



export const getProduct = (productId) =>{
    return fetch(`${API}/product/${productId}`,{
        method : "GET"
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const getAllProducts = () =>{
    return fetch(`${API}/products`,{
        method : "GET"
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}



export const updateProduct = (productId,userId,token,product) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method : "PUT",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : product
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}


export const deleteProduct = (productId,userId,token) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method : "DELETE",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}