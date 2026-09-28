import axios from 'axios';
import { motion } from 'framer-motion';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';



const mySchema =  yup.object( {
  
  name: yup.string().required('name is required').min(3, "must be at least 3 letters").max(15, "max 15 letters"),
  email: yup.string().required('email is required').email(),
  phone: yup.string().required('phone is required').matches( /^01[0125][0-9]{8}$/, "you must write an egyption number" ),
  password: yup.string().required('password is required').min(6,'min 6 letters are required').max(12,'max letters is 12'),
  rePassword: yup.string().oneOf([yup.ref('password')],'it must match the password'),

} )

export default function Register() {


  
const userData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  rePassword: '',
};

const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [errorMessage, setErrorMessage] = useState(undefined);

const nav = useNavigate();



async function mySubmit(values){
  setIsLoading(true);
// console.log("submited..", values); 

await axios.post( `https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
.then((x)=>{
console.log("in case of success..x", x);
setIsSuccess( true ); 

setTimeout(function(){
  setIsSuccess( false );
}, 2000);
nav('/login');
})
.catch((x)=>{

  console.log("in case of error..x", x);

  setErrorMessage(x.response.data.message);
  setTimeout(function(){
    setErrorMessage('');
  }, 2000);
});
setIsLoading(false);
};

const registerFormik = useFormik({


initialValues: userData,


onSubmit: mySubmit,


validationSchema: mySchema,

  });

  return <>
  <motion.div className='w-75 m-auto p-5' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

    {isSuccess ? <div className="alert alert-success text-center">Account Created Successfully</div> : ""}

    {errorMessage ? <div className="alert alert-danger text-center">{errorMessage}</div> : ""}

    <h2 style={{fontWeight:"bold"}} className='text-center p-4'>REGISTER NOW</h2>

  
    <form onSubmit = { registerFormik.handleSubmit } >

      <label htmlFor="name">Name:</label>
      <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.name} id='name' type="text"className='form-control mb-3' />
      {  registerFormik.errors.name && registerFormik.touched.name ? <div className='alert alert-danger'> {registerFormik.errors.name} </div>:"" } 



      <label htmlFor="email">Email:</label>
      <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.email} id='email' type="email" className='form-control mb-3' />
      {  registerFormik.errors.email && registerFormik.touched.email ? <div className='alert alert-danger'> {registerFormik.errors.email}</div>:'' }


      <label htmlFor="phone">Phone:</label>
      <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.phone} id='phone' type="text" className='form-control mb-3' />
      {  registerFormik.errors.phone && registerFormik.touched.phone ? <div className='alert alert-danger'> {registerFormik.errors.phone}</div>:'' }



      <label htmlFor="password">Password:</label>
      <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.password} id='password' type="password" className='form-control mb-3' />
      {  registerFormik.errors.password && registerFormik.touched.password ? <div className='alert alert-danger'> {registerFormik.errors.password}</div>:'' }


      <label htmlFor="rePassword">Re-Password:</label>
      <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.rePassword} id='rePassword' type="Password" className='form-control mb-3' />
      {  registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <div className='alert alert-danger'> {registerFormik.errors.rePassword}</div>:'' }


      <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} style={{fontWeight:"bold"}} type='submit' className='btn btn-success text-center w-100'>

      {isLoading ? <ColorRing
  visible={true}
  height="30"
  width="30"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
  />:"REGISTER"}
        </motion.button>
      
    </form>
  </motion.div>
  </>
}


