import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null && localStorage.getItem('user') !== '');

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem('user') !== null && localStorage.getItem('user') !== '');
    };

    // Listen for storage changes (to handle logout in other tabs)
    window.addEventListener('storage', checkLoginStatus);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('user'); // Remove the user key from local storage
    setIsLoggedIn(false); // Update local state to reflect logout
    window.location.href = '/Login'; // Redirect to the login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">To Do</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/todo">To Do</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/generic">Generic</Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link active" 
                    onClick={handleLogout} 
                    style={{ border: 'none', background: 'none', color: 'white', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/Login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/Signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
