import React from 'react'
import noImage from '../image/default.jpg'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const Choose = () => {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center p-5 my-5' style={{minHeight:"100vh"}}>
      <div className="container text-center" >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Choose Your Role
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Select your account type to get started with our platform
        </p>
        <div className="row justify-content-center">
          <div className=' col-md-4 mx-2 my-2'>
            <div className="card text-center p-2 border-0 shadow-lg" style={{cursor:"pointer", borderRadius: '20px'}}>
              <div className="d-flex justify-content-center mb-3">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle text-white my-2"
                  style={{
                    width: "96px",
                    height: "96px",
                    background: "linear-gradient(to right, #7209b7, #f72585)"
                  }}
                >
                  <svg
                    className="bi"
                    width="48"
                    height="48"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
                  </svg>
                </div>
              </div>

              <div className="card-body">
                <div className="d-flex flex-column gap-3 text-center">
                  <h3 className="h4 fw-bold text-dark">Administrator</h3>
                  <p className="text-muted lh-lg">
                    Manage users, oversee operations, and control system settings with full administrative privileges.
                  </p>
                  <div className="d-flex flex-column gap-2 small text-secondary">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <div className="rounded-circle bg-primary" style={{ width: '6px', height: '6px' }}></div>
                      <span>Full system access</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <div className="rounded-circle bg-primary" style={{ width: '6px', height: '6px' }}></div>
                      <span>User management</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <div className="rounded-circle bg-primary" style={{ width: '6px', height: '6px' }}></div>
                      <span>Analytics & reports</span>
                    </div>
                  </div>
                </div>
                <Link to="/admin-sign-up" className="btn  my-3 text-white" style={{background: "linear-gradient(to right, #7209b7, #f72585)",width:"100%"}}>Get Started as Admin</Link>
              </div>
            </div>
          </div>

          <div className='col-md-4 mx-2 my-2'>
            <div className="card text-center p-2 border-0 shadow-lg" style={{cursor:"pointer", borderRadius: '20px'}}>
              <div className="d-flex justify-content-center mb-3">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle text-white my-2"
                  style={{
                    width: "96px",
                    height: "96px",
                    background: "linear-gradient(to right, #03045e, #0096c7)"
                  }}
                >
                  <svg
                    className="bi"
                    width="48"
                    height="48"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>

              <div className="card-body">
                <div className="d-flex flex-column gap-3 text-center">
                  <h3 className="h4 fw-bold text-dark">Standard User</h3>
                  <p className="text-muted lh-lg">
                    Access personalized features, manage your profile, and enjoy a tailored user experience.
                  </p>
                  <div className="d-flex flex-column gap-2 small text-secondary">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <div className="rounded-circle bg-primary" style={{ width: '6px', height: '6px' }}></div>
                      <span>Personal dashboard</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <div className="rounded-circle bg-primary" style={{ width: '6px', height: '6px' }}></div>
                      <span>Profile management</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <div className="rounded-circle bg-primary" style={{ width: '6px', height: '6px' }}></div>
                      <span>Community features</span>
                    </div>
                  </div>
                </div>
                <Link to="/user-sign-up" className="btn  my-3 text-white" style={{background: "linear-gradient(to right, #03045e, #0096c7)",width:"100%"}}>Get started as User</Link>
              </div>
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
