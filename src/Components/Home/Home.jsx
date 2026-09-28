import axios from 'axios'
import { Grid } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import SimpleSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../categorySlider/categorySlider';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Context store/CartContext';
import toast from 'react-hot-toast';

export default function Home() {

  const {addProductToCart} = useContext(CartContext);

 async function addProduct(id){
   const res = await addProductToCart(id);

   if(res){
    toast.success('Product Added Successfully', {duration:1500 , position:"top-center"})
   }
   else{
    toast.error('error ocurred', {duration:1500, position:"top-center"})
   }
  }

   async function getAllProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

   const { isLoading , data } = useQuery('getAllProducts', getAllProducts);

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

  return <>
<div className="container py-4">

<motion.div className="row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
  <div className="col-md-9">
    <SimpleSlider/>
  </div>
  <div className="col-md-3">
    <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
      <img style={{height:"150px" , borderRadius:"5px"}} className='w-100' src={require('../../images/grocery-banner-2.jpeg')} alt="" />
    </motion.div>
    <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }} className='mt-3'>
      <img style={{height:"150px" , borderRadius:"5px"}} className='w-100' src={require('../../images/grocery-banner.png')} alt="" />
    </motion.div>
  </div>
</motion.div>


<CategorySlider/>

    <div className="row mt-3 gy-3">
      {data?.data.data.map((product,idx) => { 
        return <motion.div key={idx} className="col-md-2" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: idx * 0.05 }} whileHover={{ y: -6, scale: 1.01 }}>

        <Link to={`/ProductDetails/${product.id}`}>
        <div style={{borderRadius:"8px"}} className="product">
          <img style={{borderRadius:"8px"}} className='w-100' src={product.imageCover} alt="banner" />
          <h3 className='h6 text-main text-center'>{product.category.name}</h3>
          <h2 style={{fontSize: "15px" ,fontWeight:"bold", textAlign:"center"}}>{product.title.split(" ").slice(0 , 2).join(" ")}</h2>

        <div className="d-flex justify-content-between">
          {product.priceAfterDiscount ? <p><span style={{color:"red"}} className='text-decoration-line-through'> {product.price} </span> - {product.priceAfterDiscount} </p> : <p>{product.price}</p>}
          <p> <span> <i style={{color: "gold"}} className='fa-solid fa-star'></i> </span>  {product.ratingsAverage}</p>
        </div>
        </div>
        </Link>
        <motion.button whileTap={{ scale: 0.96 }} onClick={ ()=> addProduct(product.id)} className='btn bg-main text-white m-auto d-block mt-2'>ADD</motion.button>
      </motion.div>
    })}

    </div>
  </div>

  </>
}


