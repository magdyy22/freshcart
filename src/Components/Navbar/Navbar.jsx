import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import logo from '../../images/freshcart-logo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context store/AuthContext'
import { CartContext } from '../../Context store/CartContext';



export default function Navbar() {

const {Token, setToken, setUserData} = useContext(authContext);
const {numOfCartItems}= useContext(CartContext);
const navigate = useNavigate();
const location = useLocation();

function logout (){

  setToken(null);
  setUserData(null);
  localStorage.removeItem("tkn");
  localStorage.removeItem("userID");
  navigate("/Login")
}

  return <>
  <motion.nav
    className="navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top"
    initial={{ y: -16, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
  <div className="container-fluid">
    <Link className="navbar-brand" to="/Home">
      <motion.img src={logo} alt="fresh cart" whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 280, damping: 18 }} />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      
      {Token ? <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        {[
          { to: '/Home', label: 'Home' },
          { to: '/Categories', label: 'categories' },
          { to: '/Brand', label: 'brands' },
          { to: '/Cart', label: 'cart' },
          { to: '/AllOrders', label: 'All Orders' }
        ].map((item) => (
          <motion.li key={item.to} className="nav-item" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 320, damping: 18 }}>
            <Link
              className={`${item.to === '/Cart' ? 'nav-link position-relative' : 'nav-link'} main-nav-link ${location.pathname === item.to ? 'active' : ''}`}
              to={item.to}
              aria-current={location.pathname === item.to ? 'page' : undefined}
            >
              {item.label}
              {item.to === '/Cart' && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {numOfCartItems ? numOfCartItems : ''}
                </span>
              )}
            </Link>
          </motion.li>
        ))}
      </ul>:""}
      
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        {Token ?<li className="nav-item dropdown">
          <motion.button
            className="nav-link dropdown-toggle border-0 bg-transparent"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label="Account menu"
            title="Account menu"
            whileHover={{ y: -2 }}
          >
            <i className="fa-solid fa-user" aria-hidden="true"></i>
          </motion.button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><Link className="dropdown-item" to="/Profile">Profile</Link></li>
            <li><button className="dropdown-item" type="button" onClick={logout}>Logout</button></li>
          </ul>
        </li> 
        :<li className="nav-item dropdown">
          <motion.button
            className="nav-link dropdown-toggle border-0 bg-transparent"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label="Account menu"
            title="Account menu"
            whileHover={{ y: -2 }}
          >
            <i className="fa-solid fa-user" aria-hidden="true"></i>
          </motion.button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><Link className="dropdown-item" to="/Login">Login</Link></li>
            <li><Link className="dropdown-item" to="/Register">Register</Link></li>
          </ul>
        </li>}
      </ul>
    </div>
  </div>
</motion.nav>
  </>
}

  
