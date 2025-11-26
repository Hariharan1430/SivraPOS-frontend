import React, { useState } from 'react';
import '../styles/signup.css';
import Logoimage from '../assests/Sivrapos.png'
import Fbicon from '../assests/facebook 1.svg'
import Googleicon from '../assests/devicon_google.svg'
import Xicon from '../assests/Twitter X.svg'



interface SignUpProps {
  onSignInClick: () => void;
  onSignUpSuccess: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignInClick, onSignUpSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Simulate successful signup
    console.log('Sign up successful:', { name, email, password });
    onSignUpSuccess();
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="signup-container">
      <div className="signup-left-panel">
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

      <div className="signup-right-panel">
        <div className="signup-form-container">
          <div className="brand-header">
            <img src={Logoimage} alt="sivrapos" className="brand-icon" />
          </div>

          <div className="header-with-social">
            <h1>Create Account</h1>
            <div className="social-buttons">
              <button
                onClick={() => handleSocialLogin('facebook')}
                className="social-btn facebook"
                aria-label="Sign up with Facebook"
              >
                <img src={Fbicon} alt="Facebook" />
              </button>
              <button
                onClick={() => handleSocialLogin('google')}
                className="social-btn google"
                aria-label="Sign up with Google"
              >
                <img src={Googleicon} alt="Google" />
              </button>
              <button
                onClick={() => handleSocialLogin('twitter')}
                className="social-btn twitter"
                aria-label="Sign up with Twitter"
              >
                <img src={Xicon} alt="Twitter" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your.name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Create Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="terms-text">
              <span>By clicking Sign Up, you agree to our </span>
              <a href="#terms">Terms</a>
              <span>, </span>
              <a href="#data-policy">Data Policy</a>
              <span> and </span>
              <a href="#cookie-policy">Cookie Policy</a>
              <span>. You may receive email notifications from us and can opt out at any time.</span>
            </div>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          <div className="signin-link">
            <span>Already have an account? </span>
            <button onClick={onSignInClick} className="link-btn">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
