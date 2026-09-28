import axios from 'axios';
import React, { useContext } from 'react';
import { Grid } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context store/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {

 const {addProductToCart} = useContext(CartContext);



 const {id} = useParams();

async function addProduct(id){
const res =  await addProductToCart(id);

if(res){
toast.success('Product Added Successfully', {duration:1500, position:"top-center"})
}
else{
  toast.error('error ocurred', {duration:1500, position:"top-center"})
}
}



async function getProductDetails(){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${ id }`);
 }

  const { isLoading , data } = useQuery('productDetails', getProductDetails);

  if( isLoading ){
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
    
    };



    const productDetails = data?.data.data;


  return <>
  <div className="container">
    <div className="row">
      <div className='col-md-3'>

        <figure>
          <img className='w-100' src={productDetails.imageCover} alt={productDetails.title} />
        </figure>


      </div>
      <div className='col-md-9' style={{display:"flex", flexDirection:"column" , justifyContent:"center" , alignItems:"center"}}>

        <article>
          <h1 className='text-center'> {productDetails.title} </h1>
          <p className='text-center'> {productDetails.description} </p>
          {productDetails.priceAfterDiscount ? <p className='text-center' style={{fontWeight:"bold"}}> price:<span style={{color:"red"}} className='text-decoration-line-through'> {productDetails.price} </span> - {productDetails.priceAfterDiscount} EGP</p> : <p className='text-center' style={{fontWeight:"bold" , color:"green"}}> price:{productDetails.price}EGP</p> }
          <p className='text-center'> {productDetails.id} </p>
        </article>

        <button onClick={()=> addProduct(productDetails.id)} className='btn bg-main text-white m-auto d-block'>ADD TO CART</button>

      </div>
    </div>
  </div>
  
  </>
}


