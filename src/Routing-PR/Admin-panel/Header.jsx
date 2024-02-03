import React from 'react'
import logo from '../Assets/Image/logo.png'
import css from '../Assets/css/main.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Header = ({ setIsLoggedIn, loggedInuser }) => {

  const nevigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(true)
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('storedUserLoggedIn');
    window.location.reload()
    window.location.replace('/')
    nevigate('/')
  }

  return (
      <div className="container">
      <div className='d-flex justify-content-between align-items-center header position-sticky top-0  end-0' style={{ zIndex: '1' }}>
        <div className="logo">
          <img src={logo} />
        </div>
        <nav className=''>
          <ul className='d-flex  justify-content-between align-items-center mb-0 '>
            <li>
              <Link to="/"><span className=' ms-5 active'>HOME</span></Link>
            </li>
            <li>
              <Link to="/product"><span className='text-theme ms-5'>PRODUCT</span></Link>
            </li>
            <li>
              <Link to="/settings"><span className='text-theme ms-5'>STUDIO</span></Link>
            </li>
            <li>
              <Link to="/cart"><span className='text-theme ms-5'>CART</span></Link>
            </li>
          </ul>
        </nav>
          <div className='d-flex align-items-center '>
            <span className='btn btn-customer fw-bold text-white'>{loggedInuser.name}</span>
            <li className=' ms-3 '><a className='text-white btn btn-logout  ' onClick={handleLogout} >LogOut</a></li>
          </div>
          </div>
      </div>

    

  )
}

export default Header
