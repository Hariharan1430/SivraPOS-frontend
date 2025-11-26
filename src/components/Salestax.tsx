import React, { useState } from 'react';
import '../styles/salestax.css';
import Image1 from '../assests/Desert1.jpg'

interface SalesData {
  id: string;
  productName: string;
  productId: string;
  date: string;
  time: string;
  amount: number;
  income: number;
  icon: string;
}

const SalesTax: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('2020-06-21');
  const [endDate, setEndDate] = useState('2020-07-21');
  const itemsPerPage = 15;

  // Sample data matching your image
  const salesData: SalesData[] = [
    { id: '1', productName: 'Delicious Food', productId: 'M001', date: 'Jun 21, 2020', time: '10:00', amount: 12, income: 105, icon: Image1 },
    { id: '2', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 17, 2020', time: '08:21', amount: 24, income: 247, icon: '🥙' },
    { id: '3', productName: 'Delicious Food', productId: 'M001', date: 'Jun 17, 2020', time: '08:30', amount: 32, income: 211, icon: '🍕' },
    { id: '4', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '5', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '6', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '7', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '8', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '9', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '10', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '11', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '12', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '13', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '14', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '15', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 16, 2020', time: '08:30', amount: 10, income: 121, icon: '🥙' },
    { id: '16', productName: 'Delicious Food', productId: 'M001', date: 'Jun 15, 2020', time: '09:15', amount: 15, income: 130, icon: '🍕' },
    { id: '17', productName: 'Kebab Siemen', productId: 'M002', date: 'Jun 15, 2020', time: '10:45', amount: 20, income: 180, icon: '🥙' },
    { id: '18', productName: 'Delicious Food', productId: 'M001', date: 'Jun 14, 2020', time: '11:20', amount: 18, income: 145, icon: '🍕' },
  ];

  const totalPages = Math.ceil(salesData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = salesData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDateDisplay = (start: string, end: string) => {
    const startD = new Date(start);
    const endD = new Date(end);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${startD.toLocaleDateString('en-US', options)} - ${endD.toLocaleDateString('en-US', options)}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="sales-container">
      <div className="sales-header">
        <h2 className="sales-title">Sales Productwise Summary</h2>
        <button className="export-btn">
          <span className="export-icon">📤</span>
          Export Excel
        </button>
      </div>

      <div className="summary-header-section">
        <div className="summary-stats">
          <div className="stat-item">
            <div className="stat-value green">1.230s</div>
            <div className="stat-label">Total Income</div>
          </div>
          <div className="stat-item">
            <div className="stat-value orange">42</div>
            <div className="stat-label">Direct Sales</div>
          </div>
          <div className="stat-item">
            <div className="stat-value blue">63</div>
            <div className="stat-label">Delivery</div>
          </div>
        </div>

        <div className="date-search-container">
          <div className="date-picker-wrapper">
            <label className="date-label">Select Date</label>
            <div className="date-picker-box">
              <span className="calendar-icon">📅</span>
              <input
                type="date"
                className="date-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="date-input date-input-end"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <div className="date-display">{formatDateDisplay(startDate, endDate)}</div>
            </div>
          </div>
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="table-container">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Income</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="product-cell">
                   <img src={item.icon} alt={item.productName} className="product-icon" />

                    <span className="product-name">{item.productName}</span>
                  </div>
                </td>
                <td className="id-cell">{item.productId}</td>
                <td className="date-cell">{item.date}</td>
                <td className="time-cell">{item.time}</td>
                <td className="amount-cell">{item.amount}</td>
                <td className="income-cell">{item.income}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="items-info">
          Found {salesData.length} Item
        </div>
        <div className="pagination">
          <span className="page-label">Page</span>
          {renderPageNumbers()}
          <button 
            className="nav-button"
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
          <select 
            className="items-per-page"
            value={itemsPerPage}
            onChange={() => {}}
          >
            <option value={15}>Show 15 item</option>
            <option value={25}>Show 25 item</option>
            <option value={50}>Show 50 item</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SalesTax;