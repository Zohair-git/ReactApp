import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Email validation: check if email contains @
    if (!email.includes('@')) {
      toast.error("Please enter a valid email with '@'!");
      return;
    }

    // Password validation: check if password is at least 8 characters long
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    // Confirm password validation: check if both passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    try {
      const response = await fetch('https://669b443d276e45187d34fa30.mockapi.io/school/UserRegister');
      const data = await response.json();
      
      // Check for existing email and name
      const emailExists = data.some((user) => user.Email === email);
      const nameExists = data.some((user) => user.Name === name);
      
      if (emailExists) {
        toast.error("Email already exists!");
        return;
      }

      if (nameExists) {
        toast.error("Name already exists!");
        return;
      }

      // Create new user
      const newUser = {
        Name: name,
        Email: email,
        Pssword: password,
        Confirmpass: confirmPassword,
        Gender: gender
      };

      await fetch('https://669b443d276e45187d34fa30.mockapi.io/school/UserRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      toast.success('Signup successful!');
      navigate('/login');
    } catch (error) {
      toast.error("Error during signup. Please try again.");
    }
  };

  return (
    <section style={{ backgroundColor: 'skyblue' }}  className="vh-100 gradient-custom d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-6">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-4 text-center">
                <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                <form onSubmit={handleSignup}>
                  <div className="form-outline form-white mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label className="form-label">Name</label>
                  </div>

                  <div className="form-outline form-white mb-3">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label className="form-label">Email</label>
                  </div>

                  <div className="form-outline form-white mb-3">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label className="form-label">Password</label>
                  </div>

                  <div className="form-outline form-white mb-3">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <label className="form-label">Confirm Password</label>
                  </div>

                  <div className="form-outline form-white mb-3">
                    <select
                      className="form-control form-control-lg"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <label className="form-label">Gender</label>
                  </div>

                  <button className="btn btn-outline-light btn-lg px-5" type="submit">
                    Sign Up
                  </button>
                </form>

                <p className="mt-3">Already have an account? 
                  <Link className="text-white-50 fw-bold" to="/login"> Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};
export default Signup