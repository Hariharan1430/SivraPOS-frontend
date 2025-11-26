import React, { useState } from 'react';
import '../styles/product.css';
import Stockimage1 from '../assests/Desert1.jpg'
import Stockimage2 from '../assests/Desert2.jpg'
import Stockimage3 from '../assests/Desert3.jpg'
import Stockimage4 from '../assests/Desert4.jpg'
import Stockimage5 from '../assests/Desert5.jpg'
import Editimage from '../assests/Threedot-image.svg'



interface StockItem {
  id: string;
  name: string;
  image: string;
  category: string;
  serving: 'Fast Selling' | 'Non Fast Selling';
  Pricing: number;
  Edit:string;
}

const Stock: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  
  const stockData: StockItem[] = [
    {
      id: 'M001',
      name: 'Delicious Food',
      image: Stockimage1, 
      category: 'Main Course',
      serving: 'Fast Selling',
      Pricing: 10,
      Edit: Editimage,

    },
    {
      id: 'M002',
      name: 'Kebab Sleman',
      image: Stockimage2, 
      category: 'Main Course',
      serving: 'Fast Selling',
      Pricing: 5,
      Edit:Editimage,
    },
    {
      id: 'M001',
      name: 'Delicious Food',
      image:  Stockimage3,
      category: 'Main Course',
      serving: 'Non Fast Selling',
      Pricing: 7,
      Edit: Editimage
    },
    {
      id: 'M002',
      name: 'Kebab Sleman',
      image: Stockimage4, 
      category: 'Main Course',
      serving: 'Fast Selling',
      Pricing: 15,
      Edit: Editimage
    },
    {
      id: 'M001',
      name: 'Delicious Food',
      image: Stockimage5, 
      category: 'Main Course',
      serving: 'Non Fast Selling',
      Pricing: 18,
      Edit: Editimage
    },
    {
      id: 'M002',
      name: 'Kebab Sleman',
      image: Stockimage3,
      category: 'Main Course',
      serving: 'Fast Selling',
      Pricing: 5,
      Edit: Editimage
    },
    {
      id: 'M001',
      name: 'Delicious Food',
      image: Stockimage5, 
      category: 'Main Course',
      serving: 'Non Fast Selling',
      Pricing: 9,
      Edit: Editimage
    },
    
    {
      id: 'M003',
      name: 'Spicy Chicken',
      image: '/images/food3.jpg',
      category: 'Main Course',
      serving: 'Fast Selling',
      Pricing: 10,
      Edit: Editimage
    },
    {
      id: 'M004',
      name: 'Beef Steak',
      image: '/images/food4.jpg',
      category: 'Main Course',
      serving: 'Non Fast Selling',
      Pricing: 15,
      Edit: Editimage
    },
    {
      id: 'M005',
      name: 'Fish Curry',
      image: '/images/food5.jpg',
      category: 'Main Course',
      serving: 'Fast Selling',
      Pricing: 25,
      Edit: Editimage
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(stockData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = stockData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
    <div className="stock-container">
      <div className="stock-table-wrapper">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>ID</th>
              <th>Category</th>
              <th>Serving</th>
              <th>Pricing</th>
              <th>Edit</th>

            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={`${item.id}-${index}`}>
                <td className="product-name-cell">
                  <div className="product-info">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="product-image"
                      onError={(e) => {
                        // Fallback for missing images
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0Y1RjVGNSIvPgo8cGF0aCBkPSJNMTIgMTZIMjhWMjRIMTJWMTZaIiBmaWxsPSIjQ0NDIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9IiM5OTkiLz4KPC9zdmc+';
                      }}
                    />
                    <span className="product-name">{item.name}</span>
                  </div>
                </td>
                <td className="id-cell">{item.id}</td>
                <td className="category-cell">{item.category}</td>
                <td className="serving-cell">
                  <span className={`serving-badge ${item.serving === 'Fast Selling' ? 'fast-selling' : 'non-fast-selling'}`}>
                    {item.serving}
                  </span>
                </td>
                <td className="stock-cell">{`${item.Pricing}$`}</td>       

                   <td> <img 
                     src={item.Edit} 
                    /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="found-items">Found {stockData.length} Item</span>
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
    </div>
  );
};

export default Stock;