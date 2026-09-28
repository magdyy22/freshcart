import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Grid } from 'react-loader-spinner';

export default function AllOrders() {


const[allOrders, setAllOrders]= useState(null);


function getUserOrders(){
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('tkn');

  if (!userID || !token) {
    setAllOrders([]);
    return;
  }

  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`, {
    headers: { token }
  })
  .then((res)=>{
    setAllOrders(res.data);
    console.log('data', res.data);
  })
 .catch((error)=>{
console.log('error',error);
setAllOrders([]);
 })
}

useEffect(()=>{
  getUserOrders();
}, [])

if(!allOrders){
  return <div className="d-flex vh-100 bg-white bg-opacity-50 justify-content-center align-items-center">
      <Grid
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass="grid-wrapper"
      />
      </div>
}



  
  return <>
  <h1 className='text-center' style={{color:"green",fontWeight:"bold"}}>Your Orders</h1>
  <div className="container">
    <div className="row gy-3">

      {allOrders.map((order, idx)=>{
      
     return <div key={idx} className="col-md-6">
        <div className="order h-100" style={{border:"1px solid green",borderRadius:"5px"}}>

          <div className="container">
            <div className="row">
              
              {order?.cartItems.map((item, secIndex)=> {
              
              console.log('item', item);
              
             return <div key={secIndex} className="col-md-4 brand g-2">
              <div className=" h-100">
                <img className='w-100' src={item.product.imageCover} alt={item.product.title} />
                <h5 className='text-center m-2' style={{color:"green"}}>{item.product.title}</h5>
                <p className='text-center'>count: <span style={{color:"green"}}>{item.count}</span></p>
                <p className='text-center'>Price: <span style={{color:"green"}}>{item.price}</span></p>
                
              </div>
              </div>})}
            
            </div>
          </div>
          <div className='text-center m-3'>
            <h5>Payment Method: <span style={{color:"green"}}>{order.paymentMethodType}</span> </h5>
            <h5>Order Price: <span style={{color:"green"}}>{order.totalOrderPrice}</span> </h5>
            <p>This Order Is Delivering To :{order.shippingAddress.city} On Phone Number :
           {order.shippingAddress.phone} With Some Details : {order.shippingAddress.details}</p>
          </div>
          
        
          

          
        </div>
      </div>})}
      
    </div>
  </div>
  </>
}

