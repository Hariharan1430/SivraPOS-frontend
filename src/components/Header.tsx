import React, { useState } from 'react';
import '../styles/header.css';
import logoimage from "../assests/Sivrapos.png"

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: 1, name: 'Kebab Sisman', price: 20, quantity: 2 },
    { id: 2, name: 'Selat Solo Eco', price: 15, quantity: 1 },
    { id: 3, name: 'Molen Cake', price: 16, quantity: 3 },
    { id: 4, name: 'Kue Pelangi', price: 10, quantity: 2 },
    { id: 5, name: 'Meatball Delicious', price: 7, quantity: 1 },
  ]);
  const [selectedOrderType, setSelectedOrderType] = useState<string>('dine-in');
  const [phoneNumber, setPhoneNumber] = useState<string>('+919963174055');
  const [tableNumber, setTableNumber] = useState<string>('21');
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [buyerCashAmount, setBuyerCashAmount] = useState<string>('100');
  const [discount, setDiscount] = useState<string>('20');

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) return;
    setOrderItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * parseFloat(discount)) / 100;
  const taxAmount = (subtotal * 10) / 100; // 10% tax
  const total = subtotal - discountAmount + taxAmount;
  const change = parseFloat(buyerCashAmount) - total;

  const removeItem = (id: number) => {
    setOrderItems(items => items.filter(item => item.id !== id));
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Left Side - Logo and Text */}
          <div className="header-left">
            <div className="logo-container">
              <img 
                src={logoimage}
                alt="SivraPos Logo" 
                className="logo"
              />
            </div>
          </div>

          {/* Right Side - Search and Button */}
          <div className="header-right">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Searching for a item..."
                className="search-input"
              />
              <button className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#4F567B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 17.5L13.875 13.875" stroke="#4F567B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <button className="new-order-button" onClick={toggleDrawer}>
              <span className="plus-icon">+</span>
              <span className="button-text">New Order</span>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={closeDrawer}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="drawer-header">
              <h2>Review Order</h2>
              <span className="order-id">ID #2021</span>
            </div>

            {/* Order Type */}
            <div className="order-type">
              <div className="order-type-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="orderType"
                    value="dine-in"
                    checked={selectedOrderType === 'dine-in'}
                    onChange={(e) => setSelectedOrderType(e.target.value)}
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
                    onChange={(e) => setSelectedOrderType(e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">Take Away</span>
                </label>
              </div>
              <div className="order-info">
                <div className="info-section">
                  <span className="info-label">No Telp</span>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="info-input"
                  />
                </div>
                <div className="info-section">
                  <span className="info-label">Table</span>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="info-input table-input"
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="order-items">
              {orderItems.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <span className="item-price">{item.price}$</span>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn minus-btn"
                      onClick={() => {
                        if (item.quantity === 1) {
                          removeItem(item.id);
                        } else {
                          updateQuantity(item.id, item.quantity - 1);
                        }
                      }}
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="qty-btn plus-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="drawer-footer">
              <div className="action-buttons">
                <button className="save-btn">Save</button>
                <button className="payment-btn" onClick={openPaymentModal}>Payment</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="payment-modal-overlay" onClick={closePaymentModal}>
          <div className="payment-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="payment-modal-header">
              <h2>Payment Review</h2>
              <button className="cancel-btn" onClick={closePaymentModal}>Cancel</button>
            </div>

            {/* Payment Summary */}
            <div className="payment-summary">
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">{subtotal}$</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Discount ({discount}%)</span>
                <span className="summary-value">{discountAmount.toFixed(1)}$</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">10% tax</span>
                <span className="summary-value">{taxAmount.toFixed(1)}$</span>
              </div>
              <div className="summary-row total-row">
                <span className="summary-label">Total</span>
                <span className="summary-value total-value">{total.toFixed(0)}$</span>
              </div>
            </div>

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
                    onChange={(e) => setPaymentMethod(e.target.value)}
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
                    onChange={(e) => setPaymentMethod(e.target.value)}
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
                    onChange={(e) => setPaymentMethod(e.target.value)}
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
                    type="text"
                    value={buyerCashAmount}
                    onChange={(e) => setBuyerCashAmount(e.target.value)}
                    className="payment-input"
                  />
                </div>
                <div className="payment-input-group">
                  <label className="payment-input-label">Change</label>
                  <input
                    type="text"
                    value={change.toFixed(0)}
                    readOnly
                    className="payment-input change-input"
                  />
                </div>
              </div>
              <div className="discount-section">
                <label className="payment-input-label">Discount</label>
                <input
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="payment-input discount-input"
                />
              </div>
            </div>

            {/* Complete Button */}
            <div className="payment-modal-footer">
              <button className="complete-btn">Complete & Print</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;