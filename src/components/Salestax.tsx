// SalesTax.tsx
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import '../styles/salestax.css';

interface SalesData {
  id: string;
  productName: string;
  productId: string;
  date: string;
  time: string;
  amount: number;
  income: number;
  image: string;
}

const SalesTax: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState('2020-06-21');
  const [filteredData, setFilteredData] = useState<SalesData[]>([]);
  const itemsPerPage = 15;

  const allSalesData: SalesData[] = [
    { id: '1', productName: 'Delicious Food', productId: 'M001', date: '2020-06-21', time: '10:00', amount: 12, income: 105, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&h=80&fit=crop' },
    { id: '2', productName: 'Kebab Siemen', productId: 'M002', date: '2020-06-17', time: '08:21', amount: 24, income: 247, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=80&h=80&fit=crop' },
    { id: '3', productName: 'Delicious Food', productId: 'M001', date: '2020-06-17', time: '08:30', amount: 32, income: 211, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&h=80&fit=crop' },
    { id: '4', productName: 'Kebab Siemen', productId: 'M002', date: '2020-06-16', time: '08:30', amount: 10, income: 121, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=80&h=80&fit=crop' },
    { id: '5', productName: 'Meatball Special', productId: 'M003', date: '2020-06-16', time: '09:15', amount: 15, income: 180, image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=80&h=80&fit=crop' },
    { id: '6', productName: 'Egg Caplok', productId: 'M004', date: '2020-06-15', time: '10:45', amount: 20, income: 195, image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=80&h=80&fit=crop' },
    { id: '7', productName: 'Kue Pelangi', productId: 'M005', date: '2020-06-15', time: '11:20', amount: 8, income: 98, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=80&h=80&fit=crop' },
    { id: '8', productName: 'Delicious Food', productId: 'M001', date: '2020-06-14', time: '08:00', amount: 18, income: 156, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&h=80&fit=crop' },
    { id: '9', productName: 'Kebab Siemen', productId: 'M002', date: '2020-06-14', time: '09:30', amount: 22, income: 234, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=80&h=80&fit=crop' },
    { id: '10', productName: 'Selat Solo', productId: 'M006', date: '2020-06-13', time: '10:15', amount: 14, income: 142, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop' },
    { id: '11', productName: 'Meatball Special', productId: 'M003', date: '2020-06-13', time: '11:45', amount: 16, income: 188, image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=80&h=80&fit=crop' },
    { id: '12', productName: 'Egg Caplok', productId: 'M004', date: '2020-06-12', time: '08:20', amount: 19, income: 203, image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=80&h=80&fit=crop' },
    { id: '13', productName: 'Kue Pelangi', productId: 'M005', date: '2020-06-12', time: '09:50', amount: 11, income: 124, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=80&h=80&fit=crop' },
    { id: '14', productName: 'Delicious Food', productId: 'M001', date: '2020-06-11', time: '10:30', amount: 25, income: 267, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&h=80&fit=crop' },
    { id: '15', productName: 'Kebab Siemen', productId: 'M002', date: '2020-06-11', time: '11:00', amount: 21, income: 223, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=80&h=80&fit=crop' },
    { id: '16', productName: 'Selat Solo', productId: 'M006', date: '2020-06-10', time: '08:45', amount: 13, income: 135, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop' },
    { id: '17', productName: 'Meatball Special', productId: 'M003', date: '2020-06-10', time: '09:15', amount: 17, income: 192, image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=80&h=80&fit=crop' },
    { id: '18', productName: 'Egg Caplok', productId: 'M004', date: '2020-06-09', time: '10:20', amount: 23, income: 245, image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=80&h=80&fit=crop' }
  ];

  useEffect(() => {
    filterData();
  }, []);

  const filterData = () => {
    const filtered = allSalesData.filter(item => item.date === selectedDate);
    setFilteredData(filtered.length > 0 ? filtered : allSalesData);
    setCurrentPage(1);
  };

  const exportToPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Sales Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1f2937; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
            th { background-color: #f9fafb; font-weight: 600; }
            .stats { display: flex; gap: 40px; margin: 20px 0; }
            .stat { font-size: 18px; }
          </style>
        </head>
        <body>
          <h1>Sales Productwise Summary</h1>
          <div class="stats">
            <div class="stat"><strong>Total Income:</strong> 1,230$</div>
            <div class="stat"><strong>Direct Sales:</strong> 42</div>
            <div class="stat"><strong>Delivery:</strong> 63</div>
          </div>
          <p><strong>Selected Date:</strong> ${selectedDate}</p>
          <table>
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
              ${filteredData.map(item => `
                <tr>
                  <td>${item.productName}</td>
                  <td>${item.productId}</td>
                  <td>${new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>${item.time}</td>
                  <td>${item.amount}</td>
                  <td>${item.income}$</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="salestax-container">
      {/* Header */}
      <div className="salestax-header">
        <h2 className="salestax-title">Sales Productwise Summary</h2>
        <button onClick={exportToPDF} className="export-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          Export PDF
        </button>
      </div>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="stats-group">
          <div className="stat-box">
            <div className="stat-value green">1.230$</div>
            <div className="stat-label">Total Income</div>
          </div>
          <div className="stat-box">
            <div className="stat-value orange">42</div>
            <div className="stat-label">Direct Sales</div>
          </div>
          <div className="stat-box">
            <div className="stat-value blue">63</div>
            <div className="stat-label">Delivery</div>
          </div>
        </div>

        {/* Single Date Picker */}
        <div className="date-picker-section">
          <div className="date-picker-wrapper">
            <label className="date-label">Select Date</label>
            <div className="date-input-container">
              <Calendar size={18} color="#6b7280" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
            </div>
          </div>
          <button onClick={filterData} className="search-button_salestax">
            Search
          </button>
        </div>
      </div>

      {/* Table */}
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
                    <div className="product-icon">
                      <img src={item.image} alt={item.productName} />
                    </div>
                    <span className="product-text">{item.productName}</span>
                  </div>
                </td>
                <td className="id-cell">{item.productId}</td>
                <td className="date-cell">{formatDate(item.date)}</td>
                <td className="time-cell">{item.time}</td>
                <td className="amount-cell">{item.amount}</td>
                <td className="income-cell">{item.income}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="table-footer">
        <div className="items-found">Found {filteredData.length} Items</div>
        <div className="pagination">
          <span className="page-label">Page</span>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`page-button ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="last-button"
          >
            Last
          </button>
          <select className="items-select">
            <option value={15}>Show 15 items</option>
            <option value={25}>Show 25 items</option>
            <option value={50}>Show 50 items</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SalesTax;