import React from 'react'
import logo from '../image/CommunityHub logo.png'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="/">CommunityHub</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
            </ul>
            <Link className="btn btn-outline-primary mx-2" to="/" role="button">Log in <i className="fa-solid fa-right-to-bracket"></i></Link>
            <Link className="btn btn-primary mx-2" to="/choice" role="button">Sign up <i className="fa-solid fa-user-plus"></i></Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
