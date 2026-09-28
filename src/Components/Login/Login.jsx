import React from 'react';
import { motion } from 'framer-motion';
import * as yup from 'yup';
import  axios  from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useFormik } from 'formik';
import  { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context store/AuthContext';

const mySchema =  yup.object( {
  
  email: yup.string().required('email is required').email(),
  password: yup.string().required('password is required').min(6,'min 6 letters are required').max(12,'max letters is 12'),

} )

export default function Login() {
  const userData = {
    email: '',
    password: '',
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const nav = useNavigate();
  const {setToken, getUserData} = useContext(authContext)

  async function mySubmit(values){
    setIsLoading(true); 

  await axios.post( `https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
  .then((x)=>{
  if(x.data.message === "success"){

    localStorage.setItem("tkn", x.data.token); 

    setToken(x.data.token);
    getUserData()
  setIsSuccess( true ); 
  
  setTimeout(function(){
    setIsSuccess( false );
  }, 2000); 
}
  nav('/Home');
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

{isSuccess ? <div className="alert alert-success text-center">WELCOME BACK</div> : ""}

{errorMessage ? <div className="alert alert-danger text-center">{errorMessage}</div> : ""}

<h2>LOGIN NOW:</h2>

<form onSubmit = { registerFormik.handleSubmit } >

  <label htmlFor="email">Email:</label>
  <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.email} id='email' type="email" className='form-control mb-3' />
  {  registerFormik.errors.email && registerFormik.touched.email ? <div className='alert alert-danger'> {registerFormik.errors.email}</div>:'' }

  <label htmlFor="password">Password:</label>
  <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.password} id='password' type="password" className='form-control mb-3' />
  {  registerFormik.errors.password && registerFormik.touched.password ? <div className='alert alert-danger'> {registerFormik.errors.password}</div>:'' }

  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type='submit' className='btn btn-warning'>

  {isLoading ? <ColorRing
visible={true}
height="30"
width="30"
ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
/>:"LOGIN"}
    </motion.button>
  
</form>
</motion.div>
  </>
}


