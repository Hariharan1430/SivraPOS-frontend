import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MenuPage from './components/Menu';
import Profile from './components/Profile';
import Product from './components/Product';
import Stock from './components/Stock';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Delivery from './components/delivery';
import Report from './components/report';

function App() {
  const [activeTab, setActiveTab] = useState('menu');
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // 👈 null = unknown (loading state)

  // ✅ Load session from localStorage before anything renders
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedTab = localStorage.getItem('activeTab');

    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // ✅ Persist authentication state and tab
  useEffect(() => {
    if (isAuthenticated !== null) {
      localStorage.setItem('isAuthenticated', String(isAuthenticated));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const handleSignInClick = () => setAuthMode('signin');
  const handleSignUpClick = () => setAuthMode('signup');

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setAuthMode(null);
    localStorage.setItem('isAuthenticated', 'true'); // 👈 persist immediately
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('menu');
    localStorage.removeItem('isAuthenticated'); // 👈 remove on logout only
  };

  // ⏳ Show loader until we know if user is logged in
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // 🔐 If not authenticated → show login/signup
  if (!isAuthenticated) {
    if (authMode === 'signin') {
      return <SignIn onSignUpClick={handleSignUpClick} onSignInSuccess={handleAuthSuccess} />;
    }
    if (authMode === 'signup') {
      return <SignUp onSignInClick={handleSignInClick} onSignUpSuccess={handleAuthSuccess} />;
    }
    return <SignIn onSignUpClick={handleSignUpClick} onSignInSuccess={handleAuthSuccess} />;
  }

  // 📄 Render the main app content when logged in
  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return <div className="main-content"><MenuPage /></div>;
      case 'customer':
        return <div className="main-content">Customer Component</div>;
      case 'product':
        return <div className="main-content"><Product /></div>;
      case 'stock':
        return <div className="main-content"><Stock /></div>;
      case 'deliver':
        return <div className="main-content"><Delivery /></div>;
      case 'report':
        return <div className="main-content"><Report /></div>;
      case 'profile':
        return <Profile onLogout={handleLogout} />;
      default:
        return <div className="main-content"><MenuPage /></div>;
    }
  };

  // 🧭 Layout
  return (
    <div className="app-container">
      <Header />
      {renderContent()}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
