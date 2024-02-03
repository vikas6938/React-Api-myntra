import React from 'react'
import Card1 from '../Assets/Image/card-1.webp'
import Card2 from '../Assets/Image/card-2.webp'
import Card3 from '../Assets/Image/card-3.webp'
import Card4 from '../Assets/Image/card-4.webp'
import Card5 from '../Assets/Image/card-5.webp'
import Card6 from '../Assets/Image/card-6.webp'
import Card7 from '../Assets/Image/card-7.webp'
import Card8 from '../Assets/Image/card-8.webp'
import Card9 from '../Assets/Image/card-9.webp'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className=' container'>
      <div className="breadcrumb-header row  my-3 ">

        <div className=" text-center col-4 mb-4">
          <img src={Card1} alt="img" className='img-fluid' />
        </div>
        <div className=" text-center col-4 mb-4">
          <img src={Card2} alt="img" className='img-fluid' />
        </div>
        <div className=" text-center col-4 mb-4">
          <img src={Card3} alt="img" className='img-fluid' />
        </div>
        <div className=" text-center col-4 mb-4">
          <img src={Card4} alt="img" className='img-fluid' />
        </div>
        <div className=" text-center col-4 mb-4">
          <img src={Card5} alt="img" className='img-fluid' />
        </div>
        <div className=" text-center col-4 mb-4">
          <img src={Card6} alt="img" className='img-fluid' />
        </div>
        <div className=" text-center col-4 mb-4">
          <img src={Card7} alt="img" className='img-fluid' />
        </div>
        <div className=" text-center col-4 mb-4">
          <img src={Card8} alt="img" className='img-fluid' />
        </div>
        <div className=" text-center col-4 mb-4">
          <img src={Card9} alt="img" className='img-fluid' />
        </div>
      </div>

    </div>





  )
}

export default Home
