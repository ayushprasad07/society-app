import React from 'react'
import noImage from '../image/default.jpg'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const Choose = () => {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center p-5 my-5' style={{minHeight:"100vh"}}>
      <div className="container " >
        <div className="row justify-content-center">
          <div className="card text-center col-md-3 mx-2 my-2 justify-content-center" style={{ width: "18rem" }}>
            <img src={noImage} className="card-img-top rounded-circle" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Admin</h5>
              <Link to="/admin-sign-up" className="btn btn-primary">Sign up</Link>
            </div>
          </div>
          
          <div className="card text-center col-md-3 mx-2 my-2 justify-content-center" style={{ width: "18rem" }}>
            <img src={noImage} className="card-img-top rounded-circle" alt="..." />
            <div className="card-body">
              <h5 className="card-title">User</h5>
              <Link to="/user-sign-up" className="btn btn-primary">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
     </div>
     <Footer/>
    </>

  )
}

export default Choose
