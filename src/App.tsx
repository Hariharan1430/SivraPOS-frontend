import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header, { HeaderRef } from './components/Header';
import Footer from './components/Footer';
import MenuPage from './components/Menu';
import Profile from './components/Profile';
import Product from './components/Product';
import Stock from './components/Stock';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Delivery from './components/delivery';
import Report from './components/report';

// ==================== INTERFACES ====================
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  status: string;
  image: string;
}

function App() {
  // ==================== STATE MANAGEMENT ====================
  const [activeTab, setActiveTab] = useState('menu');
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // 🛒 Order Management State
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  
  // 📋 Header Ref for controlling drawer
  const headerRef = useRef<HeaderRef>(null);

  // ==================== LOAD SESSION & RESTORE ORDER ====================
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedTab = localStorage.getItem('activeTab');
    const savedOrder = localStorage.getItem('currentOrder');

    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (savedTab) {
      setActiveTab(savedTab);
    }

    // Restore order from localStorage if exists
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrderItems(parsedOrder);
      } catch (error) {
        console.error('Error parsing saved order:', error);
        localStorage.removeItem('currentOrder');
      }
    }
  }, []);

  // ==================== PERSIST AUTHENTICATION STATE ====================
  useEffect(() => {
    if (isAuthenticated !== null) {
      localStorage.setItem('isAuthenticated', String(isAuthenticated));
    }
  }, [isAuthenticated]);

  // ==================== PERSIST ACTIVE TAB ====================
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  // ==================== PERSIST ORDER ITEMS ====================
  useEffect(() => {
    if (orderItems.length > 0) {
      localStorage.setItem('currentOrder', JSON.stringify(orderItems));
    } else {
      localStorage.removeItem('currentOrder');
    }
  }, [orderItems]);

  // ==================== AUTH HANDLERS ====================
  const handleSignInClick = () => setAuthMode('signin');
  const handleSignUpClick = () => setAuthMode('signup');

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setAuthMode(null);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('menu');
    setOrderItems([]);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentOrder');
    localStorage.removeItem('activeTab');
  };

  // ==================== DRAWER HANDLERS ====================
  const handleOpenDrawer = () => {
    if (headerRef.current) {
      headerRef.current.openDrawer();
    }
  };

  // ==================== ORDER MANAGEMENT HANDLERS ====================
  
  /**
   * Handle adding items to order from menu
   * If item exists, increment quantity; otherwise add new item
   */
  const handleAddToOrder = (menuItem: MenuItem, quantity: number = 1) => {
    setOrderItems(prevItems => {
      // Check if item already exists in order
      const existingItemIndex = prevItems.findIndex(item => item.id === menuItem.id);
      
      if (existingItemIndex !== -1) {
        // Item exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        const newOrderItem: OrderItem = {
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: quantity
        };
        return [...prevItems, newOrderItem];
      }
    });
  };

  /**
   * Handle quantity updates from menu cards (+/- buttons)
   */
  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      // Remove item if quantity is 0
      setOrderItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } else {
      // Update quantity
      setOrderItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  /**
   * Handle updating order items from Header component
   * Used for quantity changes in drawer
   */
  const handleUpdateOrderItems = (updatedItems: OrderItem[]) => {
    setOrderItems(updatedItems);
  };

  /**
   * Get order items formatted for menu component
   */
  const getOrderItemsForMenu = () => {
    return orderItems.map(item => ({
      id: item.id,
      quantity: item.quantity
    }));
  };

  // ==================== LOADING STATE ====================
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // ==================== AUTHENTICATION SCREENS ====================
  if (!isAuthenticated) {
    if (authMode === 'signin') {
      return <SignIn onSignUpClick={handleSignUpClick} onSignInSuccess={handleAuthSuccess} />;
    }
    if (authMode === 'signup') {
      return <SignUp onSignInClick={handleSignInClick} onSignUpSuccess={handleAuthSuccess} />;
    }
    return <SignIn onSignUpClick={handleSignUpClick} onSignInSuccess={handleAuthSuccess} />;
  }

  // ==================== MAIN CONTENT RENDERER ====================
  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return (
          <div className="main-content">
            <MenuPage 
              onAddToOrder={handleAddToOrder}
              onUpdateQuantity={handleUpdateQuantity}
              orderItems={getOrderItemsForMenu()}
              onOpenDrawer={handleOpenDrawer}
            />
          </div>
        );
      case 'product':
        return (
          <div className="main-content">
            <Product />
          </div>
        );
      case 'stock':
        return (
          <div className="main-content">
            <Stock />
          </div>
        );
      case 'deliver':
        return (
          <div className="main-content">
            <Report />
          </div>
        );
      case 'report':
        return (
          <div className="main-content">
            <Delivery />
          </div>
        );
      case 'profile':
        return <Profile onLogout={handleLogout} />;
      default:
        return (
          <div className="main-content">
            <MenuPage 
              onAddToOrder={handleAddToOrder}
              onUpdateQuantity={handleUpdateQuantity}
              orderItems={getOrderItemsForMenu()}
              onOpenDrawer={handleOpenDrawer}
            />
          </div>
        );
    }
  };

  // ==================== MAIN APP LAYOUT ====================
  return (
    <div className="app-container">
      <Header 
        ref={headerRef}
        activeTab={activeTab} 
        orderItems={orderItems}
        onUpdateOrderItems={handleUpdateOrderItems}
      />
      {renderContent()}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;