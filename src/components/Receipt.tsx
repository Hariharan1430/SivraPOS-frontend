import React, { useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import '../styles/receipt.css';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
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
  cgst: number;
  sgst: number;
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
    gstin: string;
    taxEnabled: string;
    cgstRate: string;
    sgstRate: string;
    receiptFooterMessage: string;
  };
}

interface ReceiptBillProps {
  receiptData: ReceiptData;
  onClose: () => void;
}

const ReceiptBill: React.FC<ReceiptBillProps> = ({ receiptData, onClose }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Automatically trigger print dialog when component mounts
    const timer = setTimeout(() => {
      window.print();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle after print event
  useEffect(() => {
    const handleAfterPrint = () => {
      onClose();
    };

    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [onClose]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Generate QR code data
  const qrCodeData = `Receipt:${receiptData.orderId}|Total:₹${receiptData.total.toFixed(2)}|Date:${receiptData.timestamp}`;

  return (
    <div className="receipt-bill-container">
      <div id="printable-receipt" ref={receiptRef} className="receipt-paper">
        {/* Header */}
        <div className="receipt-header">
          <h1 className="company-name">
            {receiptData.companyDetails.name || 'RESTAURANT NAME'}
          </h1>
          {receiptData.companyDetails.address && (
            <p className="company-info">{receiptData.companyDetails.address}</p>
          )}
          {(receiptData.companyDetails.city || receiptData.companyDetails.state) && (
            <p className="company-info">
              {receiptData.companyDetails.city && receiptData.companyDetails.city}
              {receiptData.companyDetails.city && receiptData.companyDetails.state && ', '}
              {receiptData.companyDetails.state && receiptData.companyDetails.state}
              {receiptData.companyDetails.zipCode && ` - ${receiptData.companyDetails.zipCode}`}
            </p>
          )}
          {receiptData.companyDetails.phone && (
            <p className="company-info">Ph: {receiptData.companyDetails.phone}</p>
          )}
          {receiptData.companyDetails.email && (
            <p className="company-info">{receiptData.companyDetails.email}</p>
          )}
          {receiptData.companyDetails.gstin && (
            <p className="company-info">GSTIN: {receiptData.companyDetails.gstin}</p>
          )}
        </div>

        <div className="receipt-divider"></div>

        {/* Order Info */}
        <div className="receipt-info">
          <div className="info-row">
            <span className="info-label">Date:</span>
            <span className="info-value">{formatDate(receiptData.timestamp)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Time:</span>
            <span className="info-value">{formatTime(receiptData.timestamp)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Bill No:</span>
            <span className="info-value">{receiptData.orderId}</span>
          </div>
          {receiptData.orderType === 'dine-in' && receiptData.tableNumber && (
            <div className="info-row">
              <span className="info-label">Table No:</span>
              <span className="info-value">{receiptData.tableNumber}</span>
            </div>
          )}
          {receiptData.orderType === 'take-away' && receiptData.phoneNumber && (
            <div className="info-row">
              <span className="info-label">Phone:</span>
              <span className="info-value">{receiptData.phoneNumber}</span>
            </div>
          )}
          <div className="info-row">
            <span className="info-label">Type:</span>
            <span className="info-value">{receiptData.orderType === 'dine-in' ? 'DINE IN' : 'TAKE AWAY'}</span>
          </div>
        </div>

        <div className="receipt-divider"></div>

        {/* Items Table Header */}
        <div className="items-header">
          <span className="item-header-qty">QTY</span>
          <span className="item-header-name">ITEM</span>
          <span className="item-header-rate">RATE</span>
          <span className="item-header-amount">AMOUNT</span>
        </div>

        <div className="receipt-divider"></div>

        {/* Items */}
        <div className="receipt-items">
          {receiptData.orderItems.map((item, index) => (
            <div key={item.id} className="item-row">
              <div className="item-line">
                <span className="item-qty">{item.quantity}</span>
                <span className="item-name">{item.name}</span>
                <span className="item-rate">₹{item.price.toFixed(2)}</span>
                <span className="item-amount">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="receipt-divider"></div>

        {/* Totals */}
        <div className="receipt-totals">
          <div className="total-row">
            <span className="total-label">Sub Total:</span>
            <span className="total-value">₹{receiptData.subtotal.toFixed(2)}</span>
          </div>
          
          {receiptData.discount > 0 && (
            <div className="total-row">
              <span className="total-label">Discount:</span>
              <span className="total-value">-₹{receiptData.discount.toFixed(2)}</span>
            </div>
          )}
          
          {receiptData.companyDetails.taxEnabled === 'enabled' && (
            <>
              <div className="total-row">
                <span className="total-label">CGST ({receiptData.companyDetails.cgstRate || '3'}%):</span>
                <span className="total-value">₹{receiptData.cgst.toFixed(2)}</span>
              </div>
              
              <div className="total-row">
                <span className="total-label">SGST ({receiptData.companyDetails.sgstRate || '3'}%):</span>
                <span className="total-value">₹{receiptData.sgst.toFixed(2)}</span>
              </div>
            </>
          )}
          
          <div className="receipt-divider-thick"></div>
          
          <div className="total-row total-final">
            <span className="total-label-final">GRAND TOTAL:</span>
            <span className="total-value-final">₹{receiptData.total.toFixed(2)}</span>
          </div>

          <div className="receipt-divider"></div>

          <div className="payment-info">
            <div className="payment-row">
              <span className="payment-label">Payment Mode:</span>
              <span className="payment-value">{receiptData.paymentMethod.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="receipt-divider"></div>

        {/* QR Code */}
        <div className="receipt-qr">
          <QRCodeSVG 
            value={qrCodeData}
            size={100}
            level="M"
            includeMargin={false}
          />
        </div>

        {/* Footer */}
        <div className="receipt-footer">
          <p className="footer-text">
            {receiptData.companyDetails.receiptFooterMessage || 'Thank You, Please Visit Again!'}
          </p>
          <p className="footer-subtext">Have a Great Day!</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptBill;