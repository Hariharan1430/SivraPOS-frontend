import React from 'react';
import '../styles/delivery.css';
import image1 from '../assests/Desert1.jpg';
import image2 from '../assests/Desert3.jpg';
import image3 from '../assests/Desert5.jpg';

const Delivery: React.FC = () => {
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
    <div className='deliverdashboard-main'>
    <div className="deliverdashboard-container">
      <div className="deliverdashboard-header">
        <div className="deliverdashboard-id">
          <span className="deliverdashboard-id-badge">ID</span>
          <span className="deliverdashboard-id-number">#2021</span>
        </div>

        <div className="deliverdashboard-table-container">
          <table className="deliverdashboard-table">
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
                    <div className="deliverdashboard-product-cell">
                      <div className="deliverdashboard-product-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.id}</td>
                  <td>{item.qty}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className={`deliverdashboard-badge ${item.serving === 'Fast Selling' ? 'deliverdashboard-badge-green' : 'deliverdashboard-badge-orange'}`}>
                      {item.serving}
                    </span>
                  </td>
                  <td className="deliverdashboard-price-cell">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="deliverdashboard-details-grid">
        <div className="deliverdashboard-detail-card deliverdashboard-customer-card">
          <h3>Customer Details</h3>
          <div className="deliverdashboard-detail-row">
            <div className="deliverdashboard-detail-label">Name</div>
            <input 
              type="text" 
              className="deliverdashboard-detail-input" 
              defaultValue="Albert Dombledore"
            />
          </div>
          <div className="deliverdashboard-detail-row">
            <div className="deliverdashboard-detail-label">Mobile No</div>
            <input 
              type="text" 
              className="deliverdashboard-detail-input" 
              defaultValue="890292123434"
            />
          </div>
          <div className="deliverdashboard-detail-row">
            <div className="deliverdashboard-detail-label">Email</div>
            <input 
              type="email" 
              className="deliverdashboard-detail-input" 
              defaultValue="helloAlbert@gmail.com"
            />
          </div>
        </div>

        <div className="deliverdashboard-detail-card deliverdashboard-delivery-card">
          <h3>Delivery Details</h3>
          <div className="deliverdashboard-detail-row">
            <div className="deliverdashboard-detail-label">Delivery Date</div>
            <select className="deliverdashboard-detail-select">
              <option>24 July 2020</option>
              <option>25 July 2020</option>
              <option>26 July 2020</option>
            </select>
          </div>
          <div className="deliverdashboard-detail-row">
            <div className="deliverdashboard-detail-label">Delivery Time</div>
            <select className="deliverdashboard-detail-select">
              <option>08.30</option>
              <option>09.00</option>
              <option>09.30</option>
            </select>
          </div>
          <div className="deliverdashboard-detail-row">
            <div className="deliverdashboard-detail-label">Note</div>
            <textarea 
              className="deliverdashboard-detail-textarea" 
              rows={3}
              defaultValue="Bring this package to Mr. Snape Lorem Ipsum dolor sit amet"
            />
          </div>
        </div>

        <div className="deliverdashboard-detail-card deliverdashboard-amount-card">
          <h3>Amount Details</h3>
          <div className='deliverdashboard-amount-color'>
          <div className="deliverdashboard-amount-row">
            <span className="deliverdashboard-amount-label">Subtotal</span>
            <span className="deliverdashboard-amount-value">67$</span>
          </div>
          <div className="deliverdashboard-amount-row">
            <span className="deliverdashboard-amount-label">Discount (20%)</span>
            <span className="deliverdashboard-amount-value">13,4$</span>
          </div>
          <div className="deliverdashboard-amount-row">
            <span className="deliverdashboard-amount-label">10% tax</span>
            <span className="deliverdashboard-amount-value">6,1$</span>
          </div>
          <div className="deliverdashboard-amount-row deliverdashboard-amount-total">
            <span className="deliverdashboard-amount-label">Total</span>
            <span className="deliverdashboard-amount-value">50$</span>
          </div>
          <div className="deliverdashboard-button-group">
            <button className="deliverdashboard-btn deliverdashboard-btn-secondary">Save</button>
            <button className="deliverdashboard-btn deliverdashboard-btn-primary">Balance Close</button>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Delivery;