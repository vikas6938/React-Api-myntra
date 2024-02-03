import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../Assets/Image/User-Avatar-PNG-Transparent-Image.png'

const Layout = ({loggedInuser}) => {
  return (
   
    <h5 className=' fw-bold text-white'>{loggedInuser.name}</h5>
  )
}

export default Layout
