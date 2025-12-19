import React, { useState } from 'react';
import '../styles/signin.css';
import Logoimage from '../assests/Sivrapos.png';

interface SignInProps {
  onSignUpClick: () => void;
  onSignInSuccess: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignUpClick, onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Simple function — no validation, no API call
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignInSuccess(); // Directly log in the user
  };

  return (
    <div className="signin-container">
      <div className="signin-left-panel">
        <div className="brand-logo">
          <img src={Logoimage} alt="sivrapos" />
        </div>
        <div className="pagination-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      <div className="signin-right-panel">
        <div className="signin-form-container">
          <div className="brand-header">
            <img src={Logoimage} alt="sivrapos" className="brand-icon" />
          </div>

          <h1>Welcome Back!</h1>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="forgot-password">
                <a href="#forgot">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="signin-btn">
              Sign in
            </button>
          </form>

          <div className="signup-link">
            <span>Don't have an account? </span>
            <button onClick={onSignUpClick} className="link-btn">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
