import React from 'react'
import { Grid } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import axios from 'axios'
export default function Brand() {

async function getAllBrands(){
 return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  // .then((res)=>{
  //   console.log('res',res.data.data);
  //   const product = (res.data);
  
  // })
  // .catch((error)=>{
  //   console.log('error',error);
  // })
  
}

const {isLoading, data}= useQuery('getALLBrands', getAllBrands);




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

  <h1 className='text-center' style={{color:"green", fontWeight:"bold", margin:"20px"}}>All Brands</h1>
  <div className="container">
    <div className="row justify-content-center align-items-center g-2 brand">

      {data?.data.data.map((product, idx)=> {

  
      
     return <div key={idx} className="col-md-2 brand g-2">
        <img className='w-100' src={product.image} alt={product.name} />
        
        
      </div>})}
      
    </div>
    
  </div>
  
  </>
}


