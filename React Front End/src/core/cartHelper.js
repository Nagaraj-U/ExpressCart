export const addItem = (item,next) =>{
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){ //if already products present in cart
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({...item , count : 1}) //add new product array

        //handling duplicates (storing product only once)
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // run map() on it again and return the actual product from the cart
        cart = Array.from(new Set(cart.map((p) => (p._id)))) //returns array from set with products ids
                .map((id) => { //looping through array 
                    return cart.find((p) =>{  //find method returns value if it evaluates true
                        return p._id === id //original products id == new array ids
                    })
                } )
    }

    //setting back to local storage
    localStorage.setItem('cart',JSON.stringify(cart))
    next()
}

export const countItems = () =>{
    if(typeof window !== 'undefined'){
         if(localStorage.getItem("cart")){
             return JSON.parse(localStorage.getItem("cart")).length
         }
    }
    return 0;
}

export const getCartItems = () =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
    return [];
}



export const updateCartCount = (productId,count) =>{
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
    }
    cart.map((p,i) => {
        if(p._id === productId){
            cart[i].count = count
        }
    })

    localStorage.setItem("cart",JSON.stringify(cart))
}

export const removeItem = (productId) =>{
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((p,i) =>{
            if(productId === p._id){
                cart.splice(i,1); 
            }
        }) 

        localStorage.setItem("cart",JSON.stringify(cart))
    }
    return cart
}