import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminId');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">CommunityHub</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            {/* {localStorage.getItem('userId') && (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Announcement</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/profile">Events</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/profile">Marketplace</a>
                </li>

              </>
            )} */}
          </ul>
          
          {isAuthenticated ? (
            <button className="btn btn-primary mx-2" onClick={handleLogout}>
              Logout <i className="fa-solid fa-right-from-bracket mx-2"></i>
            </button>
          ) : (
            <>
              <Link className="btn btn-outline-primary mx-2" to="/login" role="button">
                Login <i className="fa-solid fa-right-to-bracket"></i>
              </Link>
              <Link className="btn btn-primary mx-2" to="/choice" role="button">
                Sign up <i className="fa-solid fa-user-plus"></i>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
