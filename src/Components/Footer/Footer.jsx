import React from 'react'
import { motion } from 'framer-motion'

function Footer() {
  return <>
  <motion.footer initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className='p-5 mt-3' style={{backgroundColor:"#F8F9FA"}}>
  <div className='container'>
    <h5 style={{fontWeight:"bold",fontSize:"30px"}}>Get The FreshCart App</h5>
    <p>We Well Send You a Link</p>
    <div className='d-flex align-items-center'>
      <input type="email" placeholder='Email...' style={{width:"80%", marginRight:"20px", padding:"5px", fontWeight:"bold", borderRadius:"5px"}} />
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='btn btn-outline-success'>Share App Link</motion.button>
    </div>
    <div style={{borderBottom:"1px solid black"}}>
    <ul className='list-unstyled d-flex justify-content-center m-3 '>
            {[
              { color: '#1877f2', icon: 'fa-facebook' },
              { color: '#e1306c', icon: 'fa-instagram' },
              { color: '#0a66c2', icon: 'fa-linkedin-in' },
              { color: '#1da1f2', icon: 'fa-twitter' }
            ].map((item, index) => (
              <motion.li key={item.icon} whileHover={{ y: -4, scale: 1.08 }} style={{marginRight:index < 3 ? '10px' : '0', fontSize:'30px', color:item.color}}>
                <i className={`me-2 fa-brands ${item.icon}`}></i>
              </motion.li>
            ))}
          </ul>
    </div>
    <div className="text-center m-3" style={{fontWeight:"bold"}}>
      &copy; 2024 All Rights Reserved
    </div>
    </div>
    </motion.footer>
  </>
}

export default Footer
