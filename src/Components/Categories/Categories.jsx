import axios from 'axios'
import React from 'react'
import { Grid } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Categories() {

function getAllCategory(){
 return axios.get('https://ecommerce.routemisr.com/api/v1/categories');

}

const {isLoading, data}= useQuery('gatAllCategory', getAllCategory);

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

  console.log('data', data);
  return <>
  <h1 style={{textAlign:"center", fontWeight:"bold",color:"green"}}>Categories</h1>
  <div className="container">
    <div className="row justify-content-center align-items-center g-2">
      {data.data.data.map((product, idx)=> {
      
      
     return <div key={idx} className='col-md-3 brand g-3' style={{borderRadius:"5px"}}>
        <img className='w-100' style={{height:"250px", borderRadius:"5px"}} src={product.image} alt={product.name} />
        <h3 style={{color:"green", margin:"10px"}}>{product.name}</h3>
      </div>})}
      
      
    </div>
    
  </div>
  </>
}
