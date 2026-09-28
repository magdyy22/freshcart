import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState} from "react"

export const authContext = createContext();


export function AuthContextProvider({children}) {

const [Token, setToken] =  useState(null);
const [userData, setUserData] =  useState(null);

useEffect(function(){
  const val = localStorage.getItem("tkn");
if(val != null ){
  setToken(val);
  getUserData(val);
}
}, []);

function getUserData(token = localStorage.getItem('tkn')){
  if (!token) {
    setUserData(null);
    return;
  }

  try {
    const decodedUser = jwtDecode(token);
    console.log('userdata', decodedUser);
    setUserData(decodedUser);
  } catch (error) {
    console.log('Invalid token', error);
    setUserData(null);
    localStorage.removeItem('tkn');
    localStorage.removeItem('userID');
    setToken(null);
  }
}
  
  return<authContext.Provider value={{ Token , setToken, userData, setUserData, getUserData  }}>

      {children}

  </authContext.Provider>
}