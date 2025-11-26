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
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Attempting login with:', { email, password: '***' });

    try {
      // FIXED: Updated URL to match backend API prefix
      const response = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Get response text first to debug
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errData = JSON.parse(responseText);
          errorMessage = errData.message || errData.error || errorMessage;
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          errorMessage = `Server error (${response.status}): ${responseText}`;
        }
        
        throw new Error(errorMessage);
      }

      // Parse successful response
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse success response:', parseError);
        throw new Error('Invalid response format from server');
      }

      console.log('Login successful:', data);

      // Save token based on the actual response structure from your backend
      if (data.access_token || data.token) {
        const token = data.access_token || data.token;
        if (keepLoggedIn) {
          localStorage.setItem('authToken', token);
        } else {
          sessionStorage.setItem('authToken', token);
        }
      }

      // Save user data if provided
      if (data.user) {
        const storage = keepLoggedIn ? localStorage : sessionStorage;
        storage.setItem('userData', JSON.stringify(data.user));
      }

      onSignInSuccess();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
            {error && (
              <div className="error-message">
                {error}
                {error.includes('500') && (
                  <div style={{ fontSize: '12px', marginTop: '5px', color: '#666' }}>
                    This looks like a database setup issue. Please run the seed command.
                  </div>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
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
                required
                disabled={loading}
              />
              <div className="forgot-password">
                <a href="#forgot">Forgot password?</a>
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="keepLoggedIn">Keep me logged in</label>
            </div>

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="signup-link">
            <span>Don't have an account? </span>
            <button onClick={onSignUpClick} className="link-btn" disabled={loading}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;