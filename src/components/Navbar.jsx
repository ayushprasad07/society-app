import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminId');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const isAuthenticated = !!localStorage.getItem('token');

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">CommunityHub</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold ${isActive('/') ? 'text-dark' : 'text-secondary'}`}
                to="/"
              >
                Home
              </Link>
            </li>

            {localStorage.getItem('adminId') && (
              <li className="nav-item">
                <Link
                  className={`nav-link fw-semibold ${isActive('/admin-page') ? 'text-dark' : 'text-secondary'}`}
                  to="/admin-page"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {localStorage.getItem('userId') && (
              <li className="nav-item">
                <Link
                  className={`nav-link fw-semibold ${isActive('/user-page') ? 'text-dark' : 'text-secondary'}`}
                  to="/user-page"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {isAuthenticated ? (
            <>
              {localStorage.getItem('userId') && <Link to='/seller' className='mx-2' style={{textDecoration:"none",color:"black"}}>Sell</Link>}
              {localStorage.getItem('userId') && <Link to='/cart' style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-cart-shopping mx-2 fs-4"></i></Link>}
              <button className="btn btn-primary mx-2" onClick={handleLogout}>
                Logout <i className="fa-solid fa-right-from-bracket mx-2"></i>
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-primary mx-2" to="/login">
                Login <i className="fa-solid fa-right-to-bracket"></i>
              </Link>
              <Link className="btn btn-primary mx-2" to="/choice">
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
