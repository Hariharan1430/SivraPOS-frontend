import React from 'react';
import '../styles/report.css';
import image1 from '../assests/Desert1.jpg';
import image2 from '../assests/Desert3.jpg';
import image3 from '../assests/Desert5.jpg';

const Report: React.FC = () => {
  const orderItems = [
    {
      id: 'M001',
      name: 'Delicious Food',
      qty: 2,
      category: 'Main Course',
      serving: 'Fast Selling',
      price: '15$',
      image: image1
    },
    {
      id: 'M002',
      name: 'Kebab Sleman',
      qty: 1,
      category: 'Main Course',
      serving: 'Fast Selling',
      price: '7$',
      image: image2
    },
    {
      id: 'M001',
      name: 'Delicious Food',
      qty: 3,
      category: 'Main Course',
      serving: 'Non Fast Selling',
      price: '15$',
      image: image3
    }
  ];

  return (
    <div className='report-main'>
    <div className="report-container">
      <div className="report-header">
        <div className="report-id">
          <span className="report-id-badge">ID</span>
          <span className="report-id-number">#2021</span>
        </div>

        <div className="report-table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>ID</th>
                <th>Qty</th>
                <th>Category</th>
                <th>Serving</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="report-product-cell">
                      <div className="report-product-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.id}</td>
                  <td>{item.qty}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className={`report-badge ${item.serving === 'Fast Selling' ? 'report-badge-green' : 'report-badge-orange'}`}>
                      {item.serving}
                    </span>
                  </td>
                  <td className="report-price-cell">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="report-details-grid">
        <div className="report-detail-card report-customer-card">
          <h3>Customer Details</h3>
          <div className="report-detail-row">
            <div className="report-detail-label">Name</div>
            <input 
              type="text" 
              className="report-detail-input" 
              defaultValue="Albert Dombledore"
            />
          </div>
          <div className="report-detail-row">
            <div className="report-detail-label">Mobile No</div>
            <input 
              type="text" 
              className="report-detail-input" 
              defaultValue="890292123434"
            />
          </div>
          <div className="report-detail-row">
            <div className="report-detail-label">Email</div>
            <input 
              type="email" 
              className="report-detail-input" 
              defaultValue="helloAlbert@gmail.com"
            />
          </div>
        </div>

        <div className="report-detail-card report-delivery-card">
          <h3>Delivery Details</h3>
          <div className="report-detail-row">
            <div className="report-detail-label">Delivery Date</div>
            <select className="report-detail-select">
              <option>24 July 2020</option>
              <option>25 July 2020</option>
              <option>26 July 2020</option>
            </select>
          </div>
          <div className="report-detail-row">
            <div className="report-detail-label">Delivery Time</div>
            <select className="report-detail-select">
              <option>08.30</option>
              <option>09.00</option>
              <option>09.30</option>
            </select>
          </div>
          <div className="report-detail-row">
            <div className="report-detail-label">Note</div>
            <textarea 
              className="report-detail-textarea" 
              rows={3}
              defaultValue="Bring this package to Mr. Snape Lorem Ipsum dolor sit amet"
            />
          </div>
        </div>

        <div className="report-detail-card report-amount-card">
          <h3>Amount Details</h3>
          <div className='amount-color'>
          <div className="report-amount-row">
            <span className="report-amount-label">Subtotal</span>
            <span className="report-amount-value">67$</span>
          </div>
          <div className="report-amount-row">
            <span className="report-amount-label">Discount (20%)</span>
            <span className="report-amount-value">13,4$</span>
          </div>
          <div className="report-amount-row">
            <span className="report-amount-label">10% tax</span>
            <span className="report-amount-value">6,1$</span>
          </div>
          <div className="report-amount-row report-amount-total">
            <span className="report-amount-label">Total</span>
            <span className="report-amount-value">50$</span>
          </div>
          <div className="report-button-group">
            <button className="report-btn report-btn-secondary">Save</button>
            <button className="report-btn report-btn-primary">Balance Close</button>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Report;