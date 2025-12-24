import React, { useState, useImperativeHandle, forwardRef } from 'react';
import '../styles/header.css';
import logoimage from "../assests/Sivrapos.png";
import orderIcon from "../assests/Icon_1.svg";

// ==================== INTERFACES ====================
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface HeaderProps {
  activeTab: string;
  orderItems: OrderItem[];
  onUpdateOrderItems: (items: OrderItem[]) => void;
}

export interface HeaderRef {
  openDrawer: () => void;
}

// ==================== CONSTANTS ====================
const TAX_RATE = 0.1; // 10% tax

// ==================== COMPONENT ====================
const Header = forwardRef<HeaderRef, HeaderProps>(({ activeTab, orderItems, onUpdateOrderItems }, ref) => {
  // State Management
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [selectedOrderType, setSelectedOrderType] = useState<string>('dine-in');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [buyerCashAmount, setBuyerCashAmount] = useState<string>('');
  const [discount, setDiscount] = useState<string>('0');

  // Generate Order ID
  const generateOrderId = () => {
    return `ORD-${Date.now()}`;
  };

  const [orderId, setOrderId] = useState(generateOrderId());

  // Expose openDrawer method to parent component
  useImperativeHandle(ref, () => ({
    openDrawer: () => {
      setIsDrawerOpen(true);
    }
  }));

  // ==================== VISIBILITY RULES ====================
  const showSearch = ['menu', 'product', 'stock', 'deliver'].includes(activeTab);
  const showOrderBtn = activeTab === 'menu';
  const showNewOrderBtn = ['menu', 'stock'].includes(activeTab);
  const showProductCategoryBtn = activeTab === 'product';
  const showAddProductBtn = activeTab === 'product';
  const showManageStockBtn = activeTab === 'stock';
  const showLogoOnly = ['profile', 'report'].includes(activeTab);

  // ==================== HANDLERS ====================
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  
  const closeDrawer = () => setIsDrawerOpen(false);
  
  const openPaymentModal = () => {
    // Validate required fields before opening payment
    if (selectedOrderType === 'dine-in' && !tableNumber.trim()) {
      alert('Please enter table number for dine-in orders');
      return;
    }
    if (selectedOrderType === 'take-away' && !phoneNumber.trim()) {
      alert('Please enter customer phone number for take-away orders');
      return;
    }
    setIsPaymentModalOpen(true);
    closeDrawer();
  };
  
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    const updatedItems = orderItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    onUpdateOrderItems(updatedItems);
  };

  const removeItem = (id: number) => {
    const updatedItems = orderItems.filter(item => item.id !== id);
    onUpdateOrderItems(updatedItems);
  };

  const handleQuantityDecrease = (item: OrderItem) => {
    if (item.quantity === 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleNewOrder = () => {
    // Clear current order and reset form
    onUpdateOrderItems([]);
    setPhoneNumber('');
    setTableNumber('');
    setSelectedOrderType('dine-in');
    setDiscount('0');
    setBuyerCashAmount('');
    setOrderId(generateOrderId());
  };

  const handleHoldOrder = () => {
    // Validate required fields before holding
    if (orderItems.length === 0) {
      alert('Cannot hold an empty order');
      return;
    }
    
    if (selectedOrderType === 'dine-in' && !tableNumber.trim()) {
      alert('Please enter table number before holding order');
      return;
    }
    
    if (selectedOrderType === 'take-away' && !phoneNumber.trim()) {
      alert('Please enter customer phone number before holding order');
      return;
    }

    // Save to held orders (implement with your backend/state management)
    const heldOrder = {
      orderId,
      orderItems,
      orderType: selectedOrderType,
      phoneNumber,
      tableNumber,
      timestamp: new Date().toISOString()
    };
    
    console.log('Order held:', heldOrder);
    
    // Save to localStorage as backup
    const heldOrders = JSON.parse(localStorage.getItem('heldOrders') || '[]');
    heldOrders.push(heldOrder);
    localStorage.setItem('heldOrders', JSON.stringify(heldOrders));
    
    alert(`Order ${orderId} has been held successfully`);
    
    // Clear current order
    handleNewOrder();
    closeDrawer();
  };

  const handleCompleteOrder = () => {
    // Validate payment
    if (paymentMethod === 'cash') {
      const cashAmount = parseFloat(buyerCashAmount || '0');
      if (cashAmount < total) {
        alert('Insufficient cash amount');
        return;
      }
    }

    const completedOrder = {
      orderId,
      orderItems,
      orderType: selectedOrderType,
      phoneNumber: selectedOrderType === 'take-away' ? phoneNumber : '',
      tableNumber: selectedOrderType === 'dine-in' ? tableNumber : '',
      paymentMethod,
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total,
      buyerCashAmount: paymentMethod === 'cash' ? buyerCashAmount : '0',
      change: paymentMethod === 'cash' ? change : 0,
      timestamp: new Date().toISOString()
    };
    
    console.log('Order completed:', completedOrder);
    
    // Save to completed orders (implement with your backend)
    const completedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
    completedOrders.push(completedOrder);
    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
    
    // Clear the order and close modals
    handleNewOrder();
    closePaymentModal();
    closeDrawer();
    
    alert(`Order ${orderId} completed successfully!`);
  };

  // ==================== CALCULATIONS ====================
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * parseFloat(discount || '0')) / 100;
  const taxAmount = subtotal * TAX_RATE;
  const total = subtotal - discountAmount + taxAmount;
  const change = parseFloat(buyerCashAmount || '0') - total;

  // ==================== RENDER ====================
  return (
    <>
      {/* ==================== HEADER ==================== */}
      <header className="header">
        <div className="header-container">
          {/* Logo Section */}
          <div className="header-left">
            <img src={logoimage} alt="SivraPos Logo" className="logo" />
          </div>

          {/* Action Buttons Section */}
          {!showLogoOnly && (
            <div className="header-right">
              {/* Search Bar */}
              {showSearch && (
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Searching for a item..."
                    className="search-input"
                  />
                  <button className="search-button" aria-label="Search">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                        stroke="#4F567B"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.5 17.5L13.875 13.875"
                        stroke="#4F567B"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* Order Button */}
              {showOrderBtn && (
                <button
                  className="order-icon-button"
                  onClick={() => (window.location.href = '/order')}
                >
                  <img src={orderIcon} alt="Orders" className="order-icon" />
                  Orders
                </button>
              )}

              {/* Product Category Button */}
              {showProductCategoryBtn && (
                <button className="category-btn">Product Category</button>
              )}

              {/* Add Product Button */}
              {showAddProductBtn && (
                <button className="add-product-btn">+ Add Product</button>
              )}

              {/* Manage Stock Button */}
              {showManageStockBtn && (
                <button className="manage-stock-btn">Manage Stock</button>
              )}

              {/* New Order Button */}
              {showNewOrderBtn && (
                <button className="new-order-button" onClick={toggleDrawer}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="button-text">New Order</span>
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ==================== ORDER DRAWER ==================== */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={closeDrawer}>
          <div className="drawer-content" onClick={e => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="drawer-header">
              <div className="drawer-title-section">
                <h2>Review Order</h2>
                <button className="close-drawer-btn" onClick={closeDrawer}>
                  ✕
                </button>
              </div>
              <div className="order-id-section">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="3" width="14" height="14" rx="2" stroke="#6B9FE8" strokeWidth="1.5"/>
                  <path d="M7 3V5M13 3V5M3 8H17" stroke="#6B9FE8" strokeWidth="1.5"/>
                </svg>
                <span className="order-id">{orderId}</span>
              </div>
            </div>

            {/* New Order Button in Drawer */}
            <button className="new-order-btn-drawer" onClick={handleNewOrder}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              New Order
            </button>

            {/* Order Type Selection */}
            <div className="order-type-section">
              <div className="order-type-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="orderType"
                    value="dine-in"
                    checked={selectedOrderType === 'dine-in'}
                    onChange={e => setSelectedOrderType(e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">Dine In</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="orderType"
                    value="take-away"
                    checked={selectedOrderType === 'take-away'}
                    onChange={e => setSelectedOrderType(e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">Take Away</span>
                </label>
              </div>
            </div>

            {/* Order Information */}
            <div className="order-info">
              <div className="info-field">
                <label className="info-label">Customer Phone No.</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="info-input"
                  placeholder="Enter phone number"
                  required={selectedOrderType === 'take-away'}
                />
              </div>
              <div className="info-field">
                <label className="info-label">Table</label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={e => setTableNumber(e.target.value)}
                  className="info-input table-input"
                  placeholder="Table number"
                  required={selectedOrderType === 'dine-in'}
                />
              </div>
            </div>

            {/* Order Items List */}
            <div className="order-items-section">
              <div className="order-items-header">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 6h14M3 10h14M3 14h14" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Order Items ({orderItems.length})</span>
              </div>

              <div className="order-items">
                {orderItems.length === 0 ? (
                  <div className="empty-order">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="empty-icon">
                      <circle cx="32" cy="32" r="30" stroke="#E5E7EB" strokeWidth="2"/>
                      <path d="M20 32h24M32 20v24" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <p>No items added yet</p>
                    <span className="empty-subtitle">Add items from menu to start order</span>
                  </div>
                ) : (
                  <>
                    {orderItems.map(item => (
                      <div key={item.id} className="order-item">
                        <div className="item-details">
                          <h4 className="item-name">{item.name}</h4>
                          <div className="item-price-calc">
                            <span className="item-unit-price">{item.price.toFixed(2)}</span>
                            <span className="multiply">×</span>
                            <span className="item-total-price">{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="quantity-controls">
                          <button
                            className="qty-btn minus-btn"
                            onClick={() => handleQuantityDecrease(item)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            className="qty-btn plus-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="drawer-footer">
              <button 
                className="hold-order-btn" 
                onClick={handleHoldOrder}
                disabled={orderItems.length === 0}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Hold Order
              </button>
              <button 
                className="payment-btn" 
                onClick={openPaymentModal}
                disabled={orderItems.length === 0}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 7h14" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PAYMENT MODAL ==================== */}
      {isPaymentModalOpen && (
  <div className="payment-modal-overlay" onClick={closePaymentModal}>
    <div className="payment-modal-content" onClick={e => e.stopPropagation()}>
      {/* Box 1 - Modal Header */}
      <div className="payment-modal-header">
        <h2>Payment Review</h2>
        <button className="cancel-btn" onClick={closePaymentModal}>
          Cancel
        </button>
      </div>

      {/* Box 3 - Payment Summary (Overlay Box) */}
      <div className="payment-summary">
        <div className="summary-row">
          <span className="summary-label">Subtotal</span>
          <span className="summary-value">{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Discount ({discount}%)</span>
          <span className="summary-value">-{discountAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">10% tax</span>
          <span className="summary-value">{taxAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row total-row">
          <span className="summary-label">Total</span>
          <span className="summary-value total-value">{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Box 2 - Main Content Area */}
      {/* Payment Method */}
      <div className="payment-method-section">
        <h3>Payment Method</h3>
        <div className="payment-method-options">
          <label className="payment-radio-option">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={e => setPaymentMethod(e.target.value)}
            />
            <span className="payment-radio-custom"></span>
            <span className="payment-radio-label">Cash</span>
          </label>
          <label className="payment-radio-option">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={e => setPaymentMethod(e.target.value)}
            />
            <span className="payment-radio-custom"></span>
            <span className="payment-radio-label">Card</span>
          </label>
          <label className="payment-radio-option">
            <input
              type="radio"
              name="paymentMethod"
              value="split"
              checked={paymentMethod === 'split'}
              onChange={e => setPaymentMethod(e.target.value)}
            />
            <span className="payment-radio-custom"></span>
            <span className="payment-radio-label">Split Bill / Join</span>
          </label>
        </div>
      </div>

      {/* Payment Details */}
      <div className="payment-details">
        <div className="payment-input-row">
          <div className="payment-input-group">
            <label className="payment-input-label">Buyer cash amount</label>
            <input
              type="number"
              value={buyerCashAmount}
              onChange={e => setBuyerCashAmount(e.target.value)}
              className="payment-input"
              placeholder="0.00"
              disabled={paymentMethod !== 'cash'}
            />
          </div>
          <div className="payment-input-group">
            <label className="payment-input-label">Change</label>
            <input
              type="text"
              value={change >= 0 ? change.toFixed(2) : '0.00'}
              readOnly
              className="payment-input change-input"
            />
          </div>
        </div>
        <div className="discount-section">
          <label className="payment-input-label">Discount (%)</label>
          <input
            type="number"
            value={discount}
            onChange={e => setDiscount(e.target.value)}
            className="payment-input discount-input"
            placeholder="0"
            min="0"
            max="100"
          />
        </div>
      </div>

      {/* Complete Button */}
      <div className="payment-modal-footer">
        <button className="complete-btn" onClick={handleCompleteOrder}>
          Complete & Print
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
});

Header.displayName = 'Header';

export default Header;