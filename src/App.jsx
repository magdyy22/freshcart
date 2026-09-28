import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import NotFound from './Components/NotFound/NotFound'
import { AuthContextProvider} from './Context store/AuthContext'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import ProtectedRoute from './Components/Gaurd/Guard'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context store/CartContext'
import { Toaster } from 'react-hot-toast'
import Payment from './Payment/Payment'
import AllOrders from './Components/AllOrders/AllOrders'
import Profile from './Components/Profile/Profile'
import { Offline } from 'react-detect-offline'
import Brand from './Components/Brand/Brand'
import ThankYou from './Components/ThankYou/ThankYou'


const myrouter = createHashRouter([
  { path: '/', element: <Layout/>, children: [

    {index: true, element: <Register/> },
    {path: 'Register' , element: <Register/> },
    {path:'Login', element: <Login/>},
    {path: 'Home' , element: <Home/> },
    {path: 'ThankYou' , element:
    <ProtectedRoute>
      <ThankYou/>
    </ProtectedRoute>
      },
    {path: 'Categories' , element: <Categories/> },
    {path: 'Brand' , element: <Brand></Brand> },
    {path: 'Cart' , element: 
    <ProtectedRoute>
      <Cart/>
    </ProtectedRoute>
      },
    {path: 'ProductDetails/:id' , element: 
    <ProtectedRoute>
      <ProductDetails/>
    </ProtectedRoute>
      },
    {path: 'Payment' , element: 
    <ProtectedRoute>
      <Payment/>
    </ProtectedRoute>
      },
    {path: 'AllOrders' , element: 
    <ProtectedRoute>
      <AllOrders/>
    </ProtectedRoute>
      },
    {path: 'Profile' , element: 
    <ProtectedRoute>
      <Profile/>
    </ProtectedRoute>
      },

    {path: '*' , element: <NotFound/> },
  ] },
  
]);




function App() {

  const myClient = new QueryClient();


  return <>


  <QueryClientProvider client={ myClient }>

<AuthContextProvider>
    <CartContextProvider>

    <RouterProvider router={myrouter}/>

    </CartContextProvider>
</AuthContextProvider>

  </QueryClientProvider>
  
  <Toaster></Toaster>


  <Offline>
    <div className="bg-danger text-center fixed-bottom text-white">
YOU ARE CURRENTLLY OFFLINE
    </div>
  </Offline>




  </>
}

export default App
