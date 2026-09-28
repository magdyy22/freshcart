import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {authContext} from './AuthContext';


export const CartContext = createContext();

export default function CartContextProvider( {children} ) {

 const {Token} = useContext(authContext);


 const[numOfCartItems, setNumOfCartItems] = useState(0);
 const[totalCartPrice, setTotalCartPrice] = useState(0);
 const[allproducts, setAllProducts] = useState([]);
 const[cartId, setCartId] = useState(null);

 const getToken = useCallback(() => localStorage.getItem('tkn'), []);

 async function addProductToCart(id){
  const token = getToken();
  if (!token) {
    return false;
  }
  
const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
    "productId": id
}, {
  headers: { token }
}).then((res)=>{
console.log('res', res.data);
getUserCart();

return true;
}).catch((error)=>{
  console.log('error',error);
  return false;
});

return res;



}

const getUserCart = useCallback(() => {
  const token = getToken();
  if (!token) {
    setCartId(null);
    setAllProducts([]);
    setNumOfCartItems(0);
    setTotalCartPrice(0);
    return;
  }

  axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
    headers: {token}
  })
  .then((res)=>{
console.log('res', res.data);
setCartId(res.data.data._id);
localStorage.setItem('userID',res.data.data.cartOwner);
setAllProducts(res.data.data.products);
setNumOfCartItems(res.data.numOfCartItems);
setTotalCartPrice(res.data.data.totalCartPrice);
  })
  .catch((error)=>{
console.log('error', error);
  })
}, [getToken]);

async function updateCount(id, newCount){
 const token = getToken();
 if (!token) {
  return false;
 }
 const booleanFlag = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    "count": newCount
}, {
  headers: {
    token
  }
}).then((res)=>{
  setTotalCartPrice(res.data.data.totalCartPrice);
  setNumOfCartItems(res.data.numOfCartItems);
  setAllProducts(res.data.data.products);

  return true;
})
.catch((error)=>{
  console.log('error', error);
  return false;
})

return booleanFlag;

}

async function deleteProduct(id){
 const token = getToken();
 if (!token) {
   return false;
 }
 const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    headers:{token}
  })
  .then((res)=>{
    setTotalCartPrice(res.data.data.totalCartPrice);
    setNumOfCartItems(res.data.numOfCartItems);
    setAllProducts(res.data.data.products);

    return true;
  })
  .catch((error)=>{
    console.log('error', error);

    return false;
  })

  return res;
}
async function clearCart(){
 const token = getToken();
 if (!token) {
  return false;
 }
 const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers:{token}
  })
  .then((res)=>{
    console.log('res',res.data);
    setTotalCartPrice(0);
    setAllProducts([]);
    setNumOfCartItems(0);

    return true;
  })
  .catch((error)=>{
    console.log('error', error);

    return false;
  })

  return res;
}



useEffect(()=>{
  if (!Token) {
    setCartId(null);
    setAllProducts([]);
    setNumOfCartItems(0);
    setTotalCartPrice(0);
    return;
  }
  getUserCart();
}, [Token, getUserCart]);

  return <CartContext.Provider value={{
    addProductToCart,
    numOfCartItems,
    totalCartPrice,
    allproducts,
    updateCount,
    deleteProduct,
    clearCart,
    cartId,
    getUserCart
    }}>
  
  {children}
  </CartContext.Provider>
    
}


