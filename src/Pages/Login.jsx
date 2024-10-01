import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Replace this URL with your actual API endpoint for login
    const loginUrl = 'https://669b443d276e45187d34fa30.mockapi.io/school/UserRegister';

    try {
      const response = await fetch(loginUrl);
      const data = await response.json();
      
      // Check if user exists with the provided name and password
      const user = data.find((user) => user.Name === name && user.Pssword === password);

      if (!user) {
        toast.error("Invalid name or password!");
        return;
      }
       // Store user details in local storage
       localStorage.setItem('user', JSON.stringify({ name: user.Name, password: user.Pssword }));

      toast.success("Login successful!");
      navigate('/ToDo'); // Redirect to the desired route after successful login
    } catch (error) {
      toast.error("Error during login. Please try again.");
    }
  };

  return (
    <section style={{ backgroundColor: 'skyblue' }} className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your name and password!</p>

                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typeNameX"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label className="form-label">Name</label>
                  </div>

                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                  </div>
       
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleLogin}
                  >
                    Login
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">Don't have an account? 
                    <Link className="nav-link active" aria-current="page" to="/Signup">Signup</Link>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
