import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return <>
  
<Navbar/>

<motion.main
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -18 }}
  transition={{ duration: 0.35, ease: 'easeOut' }}
>
  <Outlet/>
</motion.main>

<Footer/>

  </>
}

export default Layout
