import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">CommunityHub</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
            </ul>
            <a className="btn btn-outline-primary mx-2" href="/" role="button">Log in <i className="fa-solid fa-right-to-bracket"></i></a>
            <a className="btn btn-primary mx-2" href="/" role="button">Sign up <i className="fa-solid fa-user-plus"></i></a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
