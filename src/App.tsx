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
import Delivery from './components/DeliveryDashboard';
import Report from './components/ReportDashboard';
import ProductCategories from './components/addproduct';
import ReceiptBill from './components/Receipt';
import AddNewProduct from './components/AddNewProduct';
import OrderHistory from './components/OrderHistory';

// ==================== INTERFACES ====================
interface OrderItem 
{
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

interface Category {
  id: number;
  name: string;
  color: string;
  initial: string;
}

interface ProductItem {
  id: string;
  name: string;
  image: string;
  category: string;
  sku: string;
  status: 'active' | 'inactive';
  price: number;
  description?: string;
  costPrice?: number;
  taxPercentage?: number;
  quantity?: number;
  unit?: string;
  minQuantity?: number;
  maxQuantity?: number;
  trackQuantity?: boolean;
  barcode?: string;
  tags?: string;
}

interface ReceiptData {
  orderId: string;
  orderItems: OrderItem[];
  orderType: string;
  phoneNumber: string;
  tableNumber: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  salesTax: number;
  total: number;
  buyerCashAmount: string;
  change: number;
  timestamp: string;
  companyDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    taxId: string;
    salesTaxRate: string;
    receiptFooterMessage: string;
  };
}

function App() {
  // ==================== STATE MANAGEMENT ====================
  const [activeTab, setActiveTab] = useState('menu');
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // 🛒 Order Management State
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  
  // 🎯 Drawer State - Track if drawer is open
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  
  // 📂 Product Categories State
  const [categories, setCategories] = useState<Category[]>([]);
  
  // 🧾 Receipt State
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  
  // 🔍 Search State
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // 📋 Header Ref for controlling drawer
  const headerRef = useRef<HeaderRef>(null);

  // ==================== LOAD SESSION & RESTORE ORDER ====================
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('isAuthenticated');
    const savedTab = sessionStorage.getItem('activeTab');
    const savedOrder = sessionStorage.getItem('currentOrder');

    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (savedTab) {
      setActiveTab(savedTab);
    }

    // Restore order from sessionStorage if exists
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrderItems(parsedOrder);
      } catch (error) {
        console.error('Error parsing saved order:', error);
        sessionStorage.removeItem('currentOrder');
      }
    }

    // Load categories from localStorage (managed by ProductCategories component)
    loadCategories();
  }, []);

  // ==================== LISTEN FOR NAVIGATION EVENTS ====================
  useEffect(() => {
    const handleNavigateToMenu = () => {
      setActiveTab('menu');
    };

    window.addEventListener('navigateToMenu', handleNavigateToMenu);

    return () => {
      window.removeEventListener('navigateToMenu', handleNavigateToMenu);
    };
  }, []);

  // ==================== CHECK FOR PENDING RECEIPT ====================
  useEffect(() => {
    const pendingReceipt = sessionStorage.getItem('pendingReceipt');
    if (pendingReceipt && activeTab === 'receipt') {
      try {
        const parsed = JSON.parse(pendingReceipt);
        setReceiptData(parsed);
      } catch (error) {
        console.error('Error parsing receipt data:', error);
        sessionStorage.removeItem('pendingReceipt');
        setActiveTab('menu');
      }
    }
  }, [activeTab]);

  // ==================== LOAD CATEGORIES ====================
  const loadCategories = () => {
    const savedCategories = localStorage.getItem('productCategories');
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories);
        // Filter out deleted categories
        const activeCategories = parsed.filter((cat: Category & { deleted?: boolean }) => !cat.deleted);
        setCategories(activeCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }
  };

  // ==================== LISTEN FOR CATEGORY UPDATES ====================
  useEffect(() => {
    // Listen for category updates from ProductCategories component
    const handleCategoriesUpdate = (event: CustomEvent) => {
      loadCategories();
    };

    window.addEventListener('categoriesUpdated', handleCategoriesUpdate as EventListener);

    return () => {
      window.removeEventListener('categoriesUpdated', handleCategoriesUpdate as EventListener);
    };
  }, []);

  // ==================== PERSIST AUTHENTICATION STATE ====================
  useEffect(() => {
    if (isAuthenticated !== null) {
      sessionStorage.setItem('isAuthenticated', String(isAuthenticated));
    }
  }, [isAuthenticated]);

  // ==================== PERSIST ACTIVE TAB ====================
  useEffect(() => {
    sessionStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  // ==================== PERSIST ORDER ITEMS ====================
  useEffect(() => {
    if (orderItems.length > 0) {
      sessionStorage.setItem('currentOrder', JSON.stringify(orderItems));
    } else {
      sessionStorage.removeItem('currentOrder');
    }
  }, [orderItems]);

  // ==================== AUTH HANDLERS ====================
  const handleSignInClick = () => setAuthMode('signin');
  const handleSignUpClick = () => setAuthMode('signup');

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setAuthMode(null);
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('menu');
    setOrderItems([]);
    setIsDrawerOpen(false);
    setReceiptData(null);
    setSearchTerm('');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('currentOrder');
    sessionStorage.removeItem('activeTab');
    sessionStorage.removeItem('pendingReceipt');
  };

  // ==================== DRAWER HANDLERS ====================
  const handleOpenDrawer = () => {
    if (headerRef.current) {
      headerRef.current.openDrawer();
    }
  };

  const handleDrawerStateChange = (isOpen: boolean) => {
    setIsDrawerOpen(isOpen);
  };

  // ==================== SEARCH HANDLER ====================
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // ==================== CATEGORY HANDLERS ====================
  const handleCategoriesUpdate = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
  };

  // ==================== NAVIGATION HANDLER ====================
  const handleNavigateToMenu = () => {
    setActiveTab('product');
  };

  // ==================== RECEIPT HANDLERS ====================
  const handleCloseReceipt = () => {
    // Clear receipt data
    setReceiptData(null);
    sessionStorage.removeItem('pendingReceipt');
    
    // Clear order
    setOrderItems([]);
    sessionStorage.removeItem('currentOrder');
    
    // Return to menu
    setActiveTab('menu');
  };

  // ==================== ADD NEW PRODUCT HANDLERS ====================
  const handleProductAdded = (product: ProductItem) => {
    console.log('Product added successfully:', product);
    // Navigate back to product page
    setActiveTab('product');
  };

  const handleCloseAddProduct = () => {
    setActiveTab('product');
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
      case 'order-history':
        return (
          <div className="main-content">
            <OrderHistory />
          </div>
        );
      case 'receipt':
        return receiptData ? (
          <ReceiptBill 
            receiptData={receiptData} 
            onClose={handleCloseReceipt} 
          />
        ) : (
          <div className="main-content">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading receipt...</p>
            </div>
          </div>
        );
      case 'menu':
        return (
          <div className="main-content">
            <MenuPage 
              onAddToOrder={handleAddToOrder}
              onUpdateQuantity={handleUpdateQuantity}
              orderItems={getOrderItemsForMenu()}
              onOpenDrawer={handleOpenDrawer}
              isDrawerOpen={isDrawerOpen}
              searchTerm={searchTerm}
            />
          </div>
        );
      case 'product':
        return (
          <div className="main-content">
            <Product />
          </div>
        );
      case 'add-new-product':
        return (
          <AddNewProduct
            onClose={handleCloseAddProduct}
            onAdd={handleProductAdded}
          />
        );
      case 'product-categories':
        return (
          <div className="main-content">
            <ProductCategories 
              onCategoriesUpdate={handleCategoriesUpdate}
              onNavigateBack={handleNavigateToMenu}
            />
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
            <Delivery />
          </div>
        );
      case 'report':
        return (
          <div className="main-content">
            <Report/>
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
              isDrawerOpen={isDrawerOpen}
              searchTerm={searchTerm}
            />
          </div>
        );
    }
  };

  // ==================== MAIN APP LAYOUT ====================
  return (
    <div className={`app-container ${activeTab === 'receipt' ? 'receipt-view' : ''} ${activeTab === 'add-new-product' ? 'add-product-view' : ''} ${activeTab === 'order-history' ? 'order-history-view' : ''}`}>
      {activeTab !== 'receipt' && activeTab !== 'add-new-product' && activeTab !== 'order-history' && (
        <Header 
          ref={headerRef}
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          orderItems={orderItems}
          onUpdateOrderItems={handleUpdateOrderItems}
          onDrawerStateChange={handleDrawerStateChange}
          onSearch={handleSearch}
        />
      )}
      {renderContent()}
      {activeTab !== 'receipt' && activeTab !== 'add-new-product' && activeTab !== 'order-history' && (
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

export default App;