import React from 'react'
import setimg from '../Assets/Image/studio.jpg'

const Settings = () => {
  return (
    <div className=' container px-3'>
      <div className="breadcrumb-header d-flex my-3 justify-content-between dark-card">
        <div className="my-auto">
          <h4 className='text-white'>Setting</h4>
        </div>
      </div>
      <div className="dark-card text-center ">
          <img src={setimg} alt="img" className='img-fluid' style={{height:"400px"}}/>
      </div>
    </div>
  )
}

export default Settings
