import React, { useState } from 'react';
import '../styles/product.css';
import Stockimage1 from '../assests/Desert1.jpg';
import Stockimage2 from '../assests/Desert2.jpg';
import Stockimage3 from '../assests/Desert3.jpg';
import Stockimage4 from '../assests/Desert4.jpg';
import Stockimage5 from '../assests/Desert5.jpg';
import EditIcon from '../assests/edit-icon.svg'; // Add your edit icon
import DeleteIcon from '../assests/delete-icon.svg'; // Add your delete icon

interface ProductItem {
  id: string;
  name: string;
  image: string;
  category: string;
  sku: string;
  status: 'active' | 'inactive';
  price: number;
}
interface ProductProps {
  onNavigateToAddProduct?: () => void;
}

const Product: React.FC<ProductProps> = ({ onNavigateToAddProduct }) => 
  { 
     const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: '1',
      name: 'Cold Coffe',
      image: Stockimage1,
      category: 'Coffee',
      sku: 'C001',
      status: 'active',
      price: 10.00,
    },
    {
      id: '2',
      name: 'Pineapple Punch',
      image: Stockimage2,
      category: 'Juice',
      sku: 'JUI-003',
      status: 'active',
      price: 125.00,
    },
    {
      id: '3',
      name: 'Mango Delight',
      image: Stockimage3,
      category: 'Juice',
      sku: 'JUI-001',
      status: 'active',
      price: 130.00,
    },
    {
      id: '4',
      name: 'Kebab Sleman',
      image: Stockimage4,
      category: 'Snack',
      sku: 'M002',
      status: 'inactive',
      price: 15.00,
    },
    {
      id: '5',
      name: 'Delicious Food',
      image: Stockimage5,
      category: 'Snack',
      sku: 'M001',
      status: 'active',
      price: 18.00,
    },
    {
      id: '6',
      name: 'Special Dessert',
      image: Stockimage3,
      category: 'Dessert',
      sku: 'D001',
      status: 'active',
      price: 5.00,
    },
    {
      id: '7',
      name: 'Ice Cream Special',
      image: Stockimage5,
      category: 'Ice Cream',
      sku: 'IC001',
      status: 'inactive',
      price: 9.00,
    },
    {
      id: '8',
      name: 'Ginger Tea',
      image: Stockimage5,
      category: 'Ice Cream',
      sku: 'IC001',
      status: 'inactive',
      price: 9.00,
    },
    {
      id: '9',
      name: 'Lime Tea',
      image: Stockimage5,
      category: 'Ice Cream',
      sku: 'IC001',
      status: 'inactive',
      price: 9.00,
    },
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (product: ProductItem) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      ));
      setShowEditModal(false);
      setEditingProduct(null);
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4);
      } else if (currentPage >= totalPages - 2) {
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
      }
    }

    return pages;
  };

  return (
    <div className="product-container">
      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="product-name-cell">
                  <div className="product-info">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="product-image"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cGF0aCBkPSJNMTIgMTZIMjhWMjRIMTJWMTZaIiBmaWxsPSIjQ0NDIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9IiM5OTkiLz4KPC9zdmc+';
                      }}
                    />
                    <span className="product-name">{item.name}</span>
                  </div>
                </td>
                <td className="sku-cell">{item.sku}</td>
                <td className="category-cell">{item.category}</td>
                <td className="status-cell">
                  <span className={`status-badge ${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td className="price-cell">{item.price.toFixed(2)}</td>
                <td className="actions-cell">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(item)}
                    aria-label="Edit product"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M13.5 2.25L15.75 4.5M2.25 15.75H4.5L14.625 5.625L12.375 3.375L2.25 13.5V15.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(item.id)}
                    aria-label="Delete product"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3.75 4.5H14.25M7.5 8.25V12.75M10.5 8.25V12.75M14.25 4.5L13.5 15.75H4.5L3.75 4.5M6.75 4.5V2.25H11.25V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="found-items">Found {products.length} Item</span>
        </div>
        
        <div className="pagination-center">
          <button 
            className="pagination-btn first-last"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          
          {renderPaginationNumbers().map((page) => (
            <button
              key={page}
              className={`pagination-btn pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="pagination-btn first-last"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
        
        <div className="pagination-right">
          <span className="show-items">Show {itemsPerPage} item</span>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingProduct && (
        <div className="edit-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2>Edit Product</h2>
              <button 
                className="close-modal-btn"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>

            <div className="edit-modal-body">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>SKU</label>
                <input
                  type="text"
                  value={editingProduct.sku}
                  onChange={(e) => setEditingProduct({...editingProduct, sku: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  className="form-input"
                >
                  <option value="Coffee">Coffee</option>
                  <option value="Juice">Juice</option>
                  <option value="Snack">Snack</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Ice Cream">Ice Cream</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={editingProduct.status}
                  onChange={(e) => setEditingProduct({...editingProduct, status: e.target.value as 'active' | 'inactive'})}
                  className="form-input"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                  className="form-input"
                />
              </div>
            </div>

            <div className="edit-modal-footer">
              <button 
                className="cancel-edit-btn"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button 
                className="save-edit-btn"
                onClick={handleUpdateProduct}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;