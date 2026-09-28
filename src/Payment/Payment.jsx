import axios from 'axios'
import React, { useContext } from 'react'
import { CartContext } from '../Context store/CartContext'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Payment() {

 const nav= useNavigate();


 const {cartId , clearCart}= useContext(CartContext);
console.log('cartId',cartId);

function confirmCashPayment(){

  const details = document.getElementById('details').value;
  const phone = document.getElementById('phone').value;
  const city = document.getElementById('city').value;

 const shippingObject = {
    "shippingAddress":{
        "details": details,
        "phone": phone,
        "city": city
        }
}


  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, shippingObject, {
    headers:{token: localStorage.getItem('tkn')}
  }).then((res)=>{
if(res.data.status==='success'){
toast.success('Payment Confirmed', {position:"top-right"});


setTimeout(()=>{
nav('/home');
},1500);
clearCart();
}
  })
  .catch((error)=>{
    console.log('error', error);
    toast.error('error',{position:"top-right"})
  })
}
function confirmOnlinePayment(){

  const details = document.getElementById('details').value;
  const phone = document.getElementById('phone').value;
  const city = document.getElementById('city').value;

 const shippingObject = {
    "shippingAddress":{
        "details": details,
        "phone": phone,
        "city": city
        }
}


  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, shippingObject, {
    headers:{token: localStorage.getItem('tkn')},
    params:{url: `${window.location.origin}/#/ThankYou`}
  }).then((res)=>{
if(res.data.status==='success'){
// toast.success('Payment Confirmed', {position:"top-right"});
// getUserCart();
window.open(res.data.session.url, '_self');
}
  })
  .catch((error)=>{
    console.log('error', error);
    toast.error('error',{position:"top-right"})
  })
}


  return<>
  
<div className="w-50 m-auto py-3">

<label htmlFor="city" className='mb-2'>City</label>
<input type="text" id='city' placeholder='city' className='form-control mb-2' />

<label htmlFor="phone" className='mb-2'>phone</label>
<input type="text" id='phone' placeholder='phone' className='form-control mb-2' />

<label htmlFor="details" className='mb-2'>details</label>
<textarea  id="details" placeholder='details' className='form-control mb-3'></textarea>
<button onClick={confirmCashPayment} className='btn btn-outline-success'>Confirm Cash Payment</button>
<button onClick={confirmOnlinePayment} className='btn btn-outline-success'>Confirm Online Payment</button>
</div>


  </>
}


