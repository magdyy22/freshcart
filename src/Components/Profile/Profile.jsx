import React, { useContext } from 'react'
import { authContext } from '../../Context store/AuthContext'

export default function Profile() {

const {userData} = useContext(authContext);

if(!userData){
return <>
<h1>Loading....</h1> 

</>
}

  return <>
 <div className="container">
  <h1> Hello Ya {userData?.name}  </h1>
  
  </div> 
  </>
}

