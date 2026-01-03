import React, { useState, useEffect } from 'react';
import '../styles/orderhistory.css';
import Refreshicon from '../assests/refresh.png'

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  items: OrderItem[];
  paymentMethod: string;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  customer?: string;
  reference?: string;
  notes?: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const ordersPerPage = 10;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setIsLoading(true);
    setTimeout(() => {
      const dummyOrders = generateDummyOrders();
      setOrders(dummyOrders);
      setIsLoading(false);
    }, 500);
  };

  const generateDummyOrders = (): Order[] => {
    const dummyOrders: Order[] = [];
    const items = [
      { name: 'Espresso', price: 100.00 },
      { name: 'Cappuccino', price: 6.00 },
      { name: 'Latte', price: 6.00 },
      { name: 'Cold Brew', price: 180.00 },
      { name: 'Americano', price: 5.00 },
      { name: 'Mocha', price: 7.00 },
      { name: 'Egg Ceplok', price: 100.00 },
      { name: 'Kue Pelangi', price: 10.00 },
      { name: 'Strawberry Cake', price: 7.00 },
      { name: 'Chocolate Cake', price: 12.00 },
      { name: 'Garlic Bread', price: 120.00 },
      { name: 'Premium Ice Cream', price: 12.00 },
    ];

    const orderTypes = ['Dine In', 'Take Away'];
    const paymentMethods = ['cash', 'card'];

    for (let i = 1; i <= 18; i++) {
      const numItems = Math.floor(Math.random() * 4) + 1;
      const orderItems: OrderItem[] = [];
      let total = 0;

      for (let j = 0; j < numItems; j++) {
        const item = items[Math.floor(Math.random() * items.length)];
        const quantity = Math.floor(Math.random() * 3) + 1;
        orderItems.push({
          name: item.name,
          price: item.price,
          quantity: quantity,
        });
        total += item.price * quantity;
      }

      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 10));
      date.setHours(Math.floor(Math.random() * 12) + 8);
      date.setMinutes(Math.floor(Math.random() * 60));

      dummyOrders.push({
        id: `order-${i}`,
        orderNumber: `#${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        date: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        items: orderItems,
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        total: total,
        status: 'completed',
        customer: Math.random() > 0.5 ? `${Math.floor(Math.random() * 9000000000) + 1000000000}` : undefined,
        reference: `PAY-ORD-${Date.now() - Math.floor(Math.random() * 1000000)}`,
        notes: orderTypes[Math.floor(Math.random() * orderTypes.length)],
      });
    }

    return dummyOrders.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setExpandedOrderId(null);
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const generateQRCode = (data: string): string => {
    // Simple QR code generation using a reliable CDN service
    const encodedData = encodeURIComponent(data);
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedData}`;
  };

  const handlePrintOrder = (order: Order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Generate QR code data
    const qrData = `Order: ${order.orderNumber}\nDate: ${order.date} ${order.time}\nTotal: ${order.total.toFixed(2)}\nRef: ${order.reference || 'N/A'}`;
    const qrCodeUrl = generateQRCode(qrData);

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order ${order.orderNumber}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Courier New', 'Courier', monospace;
            background: white;
            margin: 0;
            padding: 0;
          }

          @media print {
            body * {
              visibility: visible;
            }
            
            #printable-receipt {
              position: fixed;
              left: 50%;
              top: 0;
              transform: translateX(-50%);
              width: 80mm;
              margin: 0;
              padding: 0;
            }
            
            @page {
              size: 80mm auto;
              margin: 0;
            }
          }

          .receipt-paper {
            width: 80mm;
            background: white;
            padding: 8mm;
            font-size: 11px;
            line-height: 1.3;
            color: #000;
            margin: 0 auto;
          }

          .receipt-header {
            text-align: center;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px dashed #000;
          }

          .company-name {
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 4px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .company-info {
            font-size: 10px;
            margin: 2px 0;
            line-height: 1.4;
          }

          .receipt-divider {
            border-top: 1px dashed #000;
            margin: 8px 0;
          }

          .receipt-info {
            margin: 8px 0;
          }

          .info-row {
            display: flex;
            justify-content: space-between;
            margin: 3px 0;
            font-size: 10px;
          }

          .info-label {
            font-weight: bold;
            text-transform: uppercase;
          }

          .info-value {
            text-align: right;
          }

          .items-header {
            display: grid;
            grid-template-columns: 15% 40% 20% 25%;
            gap: 2px;
            font-weight: bold;
            font-size: 10px;
            margin: 8px 0 4px 0;
            text-transform: uppercase;
          }

          .item-header-qty { text-align: left; }
          .item-header-name { text-align: left; }
          .item-header-rate { text-align: right; }
          .item-header-amount { text-align: right; }

          .receipt-items {
            margin: 8px 0;
          }

          .item-row {
            margin: 4px 0;
          }

          .item-line {
            display: grid;
            grid-template-columns: 15% 40% 20% 25%;
            gap: 2px;
            font-size: 10px;
          }

          .item-qty {
            text-align: left;
            font-weight: bold;
          }

          .item-name {
            text-align: left;
            word-wrap: break-word;
          }

          .item-rate {
            text-align: right;
          }

          .item-amount {
            text-align: right;
            font-weight: bold;
          }

          .receipt-divider-thick {
            border-top: 2px solid #000;
            margin: 8px 0;
          }

          .receipt-totals {
            margin: 8px 0;
          }

          .total-row {
            display: flex;
            justify-content: space-between;
            margin: 4px 0;
            font-size: 10px;
          }

          .total-label {
            text-transform: uppercase;
          }

          .total-value {
            text-align: right;
            font-weight: bold;
          }

          .total-final {
            margin: 6px 0;
            padding: 4px 0;
            font-size: 12px;
            font-weight: bold;
          }

          .total-label-final {
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 0.5px;
          }

          .total-value-final {
            font-weight: bold;
            font-size: 13px;
          }

          .receipt-qr {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 12px 0;
            padding: 8px 0;
          }

          .receipt-qr img {
            border: 2px solid #000;
            padding: 4px;
            background: white;
            width: 100px;
            height: 100px;
          }

          .receipt-footer {
            text-align: center;
            margin-top: 10px;
            padding-top: 8px;
            border-top: 1px dashed #000;
          }

          .footer-text {
            font-weight: bold;
            margin: 4px 0;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .footer-subtext {
            margin: 4px 0;
            color: #333;
            font-size: 10px;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div id="printable-receipt" class="receipt-paper">
          <div class="receipt-header">
            <div class="company-name">SivraPos</div>
            <div class="company-info">Your Cafe Address</div>
            <div class="company-info">Phone: +1234567890</div>
          </div>
          
          <div class="receipt-info">
            <div class="info-row">
              <span class="info-label">Order:</span>
              <span class="info-value">${order.orderNumber}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Date:</span>
              <span class="info-value">${order.date}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Time:</span>
              <span class="info-value">${order.time}</span>
            </div>
            ${order.customer ? `
            <div class="info-row">
              <span class="info-label">Customer:</span>
              <span class="info-value">${order.customer}</span>
            </div>` : ''}
            ${order.reference ? `
            <div class="info-row">
              <span class="info-label">Reference:</span>
              <span class="info-value">${order.reference}</span>
            </div>` : ''}
            ${order.notes ? `
            <div class="info-row">
              <span class="info-label">Type:</span>
              <span class="info-value">${order.notes}</span>
            </div>` : ''}
          </div>

          <div class="receipt-divider"></div>

          <div class="items-header">
            <div class="item-header-qty">QTY</div>
            <div class="item-header-name">ITEM</div>
            <div class="item-header-rate">RATE</div>
            <div class="item-header-amount">AMOUNT</div>
          </div>

          <div class="receipt-items">
            ${order.items.map(item => `
              <div class="item-row">
                <div class="item-line">
                  <div class="item-qty">${item.quantity}</div>
                  <div class="item-name">${item.name}</div>
                  <div class="item-rate">${item.price.toFixed(2)}</div>
                  <div class="item-amount">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="receipt-divider-thick"></div>

          <div class="receipt-totals">
            <div class="total-row total-final">
              <span class="total-label-final">Total:</span>
              <span class="total-value-final">${order.total.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span class="total-label">Payment:</span>
              <span class="total-value">${order.paymentMethod.toUpperCase()}</span>
            </div>
          </div>

          <div class="receipt-qr">
            <img src="${qrCodeUrl}" alt="QR Code" />
          </div>

          <div class="receipt-footer">
            <div class="footer-text">Thank You!</div>
            <div class="footer-subtext">Please visit again</div>
            <div class="footer-subtext">Printed: ${new Date().toLocaleString()}</div>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for QR code image to load before printing
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        
        // Close window after print dialog is dismissed
        printWindow.onafterprint = () => {
          printWindow.close();
        };
        
        // Fallback: close if user cancels (after a delay)
        setTimeout(() => {
          if (!printWindow.closed) {
            printWindow.close();
          }
        }, 1000);
      }, 500);
    };
  };

  const handleRefresh = () => {
    loadOrders();
    setCurrentPage(1);
    setExpandedOrderId(null);
  };

  const handleBackClick = () => {
    window.dispatchEvent(new CustomEvent('navigateToMenu'));
  };

  if (isLoading) {
    return (
      <div className="order-history-loading">
        <div className="order-history-loading__spinner">
          <div className="order-history-loading__spinner-icon"></div>
          <p className="order-history-loading__text">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history">
      <div className="order-history__header">
        <button className="order-history__back-btn" onClick={handleBackClick}>
          <svg className="order-history__back-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Orders
        </button>
        <button className="order-history__refresh-btn" onClick={handleRefresh}>
            <img src={Refreshicon} alt="Edit" className="order-history__back-btn_refresh" /> 
        </button>
      </div>

      <div className="order-history__stats">
        <div className="order-history__stat-item">
          <div className="order-history__stat-number">{orders.length}</div>
          <div className="order-history__stat-label">Total Orders</div>
        </div>
        <div className="order-history__stat-divider"></div>
        <div className="order-history__stat-item">
          <div className="order-history__stat-number">{currentPage}</div>
          <div className="order-history__stat-label">Current Page</div>
        </div>
      </div>

      <div className="order-history__list">
        {currentOrders.map((order) => (
          <div 
            key={order.id} 
            className={`order-card ${expandedOrderId === order.id ? 'order-card--expanded' : ''}`}
          >
            <div className="order-card__header" onClick={() => toggleOrderExpansion(order.id)}>
              <div className="order-card__header-left">
                <div className="order-card__order-number">
                  <svg className="order-card__order-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="3" width="14" height="14" rx="2" stroke="#6B9FE8" strokeWidth="1.5"/>
                    <path d="M7 7h6M7 10h6M7 13h4" stroke="#6B9FE8" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Order {order.orderNumber}
                </div>
                <div className="order-card__datetime">{order.date}, {order.time}</div>
              </div>
              <div className="order-card__header-right">
                <span className={`order-card__status order-card__status--${order.status}`}>
                  {order.status}
                </span>
                <button className="order-card__expand-btn">
                  <svg 
                    className="order-card__expand-icon"
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="order-card__summary">
              <div className="order-card__summary-item">
                <svg className="order-card__summary-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 6h12M3 9h12M3 12h12" stroke="#4F567B" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="order-card__summary-text">{order.items.length} items</span>
              </div>
              <div className="order-card__summary-item">
                <svg className="order-card__summary-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="6" stroke="#4F567B" strokeWidth="1.5"/>
                  <path d="M9 6v3l2 1" stroke="#4F567B" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="order-card__summary-text">{order.paymentMethod}</span>
              </div>
              <div className="order-card__total">${order.total.toFixed(2)}</div>
            </div>

            {expandedOrderId === order.id && (
              <div className="order-card__details">
                {(order.customer || order.reference || order.notes) && (
                  <div className="order-details">
                    {order.customer && (
                      <div className="order-details__row">
                        <svg className="order-details__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="5" r="2.5" stroke="#4F567B" strokeWidth="1.2"/>
                          <path d="M3 13c0-2.5 2-4 5-4s5 1.5 5 4" stroke="#4F567B" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        <span className="order-details__label">Customer:</span>
                        <span className="order-details__value">{order.customer}</span>
                      </div>
                    )}
                    {order.reference && (
                      <div className="order-details__row">
                        <svg className="order-details__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <rect x="2" y="2" width="12" height="12" rx="2" stroke="#4F567B" strokeWidth="1.2"/>
                          <path d="M5 5h6M5 8h6M5 11h3" stroke="#4F567B" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        <span className="order-details__label">Reference:</span>
                        <span className="order-details__value">{order.reference}</span>
                      </div>
                    )}
                    {order.notes && (
                      <div className="order-details__row">
                        <svg className="order-details__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="#4F567B" strokeWidth="1.2"/>
                          <path d="M8 5v3M8 11h.01" stroke="#4F567B" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        <span className="order-details__label">Notes:</span>
                        <span className="order-details__value">{order.notes}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="order-items">
                  <h4 className="order-items__title">Order Items:</h4>
                  <div className="order-items__list">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-items__item">
                        <div className="order-items__item-info">
                          <div className="order-items__item-name">{item.name}</div>
                          <div className="order-items__item-calc">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </div>
                        </div>
                        <div className="order-items__item-total">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-total">
                  <span className="order-total__label">Total:</span>
                  <span className="order-total__amount">${order.total.toFixed(2)}</span>
                </div>

                <button 
                  className="order-card__print-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrintOrder(order);
                  }}
                >
                  <svg className="order-card__print-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M5 7V3h8v4M5 13H3V9h12v4h-2M5 11h8v5H5v-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Print Receipt
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="order-history__empty">
          <svg className="order-history__empty-icon" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="#E5E7EB" strokeWidth="2"/>
            <path d="M20 32h24M32 20v24" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p className="order-history__empty-text">No orders found</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="order-history__pagination">
          <div className="order-history__pagination-info">
            Found {orders.length} Items
          </div>
          <div className="order-history__pagination-controls">
            <button
              className="order-history__pagination-btn"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              className="order-history__pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`order-history__pagination-number ${currentPage === pageNum ? 'order-history__pagination-number--active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="order-history__pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="order-history__pagination-btn"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;