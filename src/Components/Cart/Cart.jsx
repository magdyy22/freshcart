import React, { useContext } from 'react'
import { CartContext } from '../../Context store/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {

 const {updateCount,
  totalCartPrice,
  deleteProduct,
  clearCart,
  allproducts} = useContext(CartContext);


  

   async function updateMyCount(id, newCount){
     const res = await updateCount(id, newCount);

     if(res){
      toast.success('product updated', {position:"top-right"})
     }
     else{
      toast.error('update fail', {position:"top-right"})
     }
    }

   async function myDeleteProduct(id){
    const res = await deleteProduct(id);
    if(res){
      toast.success('item deleted successfully', {position:"top-right"})
    }
    else{
      toast.error('error', {position:"top-right"})
    }
    }


    

  return <>

  { allproducts?.length ? <div className="container">
    <div className='text-center mt-1'>
    <h2 style={{fontWeight:"bolder", marginBottom:"10px"}}>SHOP CART:</h2>
    <h5 style={{fontWeight:"bold"}}>Total Price: <span style={{color:"green", fontWeight:"bolder"}}>{totalCartPrice}</span> LE </h5>
  </div>
  <div className="d-flex justify-content-between"><button onClick={clearCart} className='btn btn-danger '>Clear Items</button>
    <Link to='/Payment'><button className='btn btn-outline-success'>Confirm Order</button>
    </Link>
    
        
  </div>
  
    {allproducts?.map((product, idx)=><div key={idx} className="row border-1 border-bottom border-black py-2 align-items-center mb-2">


      <div className="col-1">
        <figure>
          <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
        </figure>
      </div>
      <div className="col-9">
        <article>
          <h3>{product.product.title}</h3>
          <h5>price : {product.price}</h5>
          <button onClick={()=> myDeleteProduct(product.product.id)} className='btn btn-outline-danger'>Remove</button>
          <br />
         {/* 1: {product._id} */}
         {/* <br />
         2: {product.product.id} */}
        </article>
      </div>

      <div className="col-2">
        <div className='d-flex justify-content-between align-items-center'>
          <button onClick={()=> updateMyCount(product.product.id,product.count + 1) } className='btn btn-outline-success'>+</button>
          <p>{product.count}</p>
          <button disabled={product.count === 1} onClick={()=> updateMyCount(product.product.id,product.count - 1) }  className='btn btn-outline-success'>-</button>
        </div>
      </div>
    </div>)}
    
  </div> : <h1>Cart is Clear</h1> }

  


  </>
}


