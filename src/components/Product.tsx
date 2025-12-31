import React, { useState, useEffect } from 'react';
import '../styles/product.css';
import EditProduct from './Editproduct';
import Stockimage1 from '../assests/Desert1.jpg';
import Stockimage2 from '../assests/Desert2.jpg';
import Stockimage3 from '../assests/Desert3.jpg';
import Stockimage4 from '../assests/Desert4.jpg';
import Stockimage5 from '../assests/Desert5.jpg';
import Maincourse1 from '../assests/Maincourse1.jpg';
import Maincourse2 from '../assests/Maincourse2.jpg';
import Maincourse3 from '../assests/Maincourse3.jpg';
import Maincourse4 from '../assests/Maincourse4.jpg';
import Maincourse5 from '../assests/Maincourse5.jpg';

interface ProductItem {
  id: string;
  name: string;
  image: string;
  category: string;
  sku: string;
  status: 'active' | 'inactive';
  price: number;
  description?: string;
  costPrice?: number;
  taxPercentage?: number;
  quantity?: number;
  unit?: string;
  minQuantity?: number;
  maxQuantity?: number;
  trackQuantity?: boolean;
  barcode?: string;
  tags?: string;
}

interface ProductProps {
  onNavigateToAddProduct?: () => void;
}

const Product: React.FC<ProductProps> = ({ onNavigateToAddProduct }) => { 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showEditPage, setShowEditPage] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);

  // Load products from localStorage on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('products');
    
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        setProducts(parsed);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts(getDefaultProducts());
      }
    } else {
      const defaultProducts = getDefaultProducts();
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  };

  const getDefaultProducts = (): ProductItem[] => {
    return [
      // Coffee Products
      {
        id: '1',
        name: 'Cold Coffe',
        image: Stockimage1,
        category: 'Coffee',
        sku: 'C001',
        status: 'active',
        price: 10.00,
        description: 'Refreshing cold coffee',
        costPrice: 8.00,
        taxPercentage: 0,
        quantity: 50,
        unit: 'Pcs',
        minQuantity: 10,
        maxQuantity: 100,
        trackQuantity: true,
        barcode: '',
        tags: 'coffee, cold',
      },
      {
        id: '2',
        name: 'Espresso',
        image: Stockimage2,
        category: 'Coffee',
        sku: 'C002',
        status: 'active',
        price: 5.00,
        description: 'Strong espresso shot',
        costPrice: 3.00,
        taxPercentage: 0,
        quantity: 100,
        unit: 'Pcs',
        minQuantity: 20,
        maxQuantity: 200,
        trackQuantity: true,
        barcode: '',
        tags: 'coffee, espresso',
      },
      {
        id: '3',
        name: 'Cappuccino',
        image: Stockimage3,
        category: 'Coffee',
        sku: 'C003',
        status: 'active',
        price: 6.00,
        description: 'Classic cappuccino',
        costPrice: 4.00,
        taxPercentage: 0,
        quantity: 80,
        unit: 'Pcs',
        minQuantity: 15,
        maxQuantity: 150,
        trackQuantity: true,
        barcode: '',
        tags: 'coffee, cappuccino',
      },
      {
        id: '4',
        name: 'Latte',
        image: Stockimage4,
        category: 'Coffee',
        sku: 'C004',
        status: 'active',
        price: 6.00,
        description: 'Smooth cafe latte',
        costPrice: 4.00,
        taxPercentage: 0,
        quantity: 75,
        unit: 'Pcs',
        minQuantity: 15,
        maxQuantity: 150,
        trackQuantity: true,
        barcode: '',
        tags: 'coffee, latte',
      },
      {
        id: '5',
        name: 'Americano',
        image: Maincourse5,
        category: 'Coffee',
        sku: 'C005',
        status: 'active',
        price: 5.00,
        description: 'Classic americano',
        costPrice: 3.00,
        taxPercentage: 0,
        quantity: 90,
        unit: 'Pcs',
        minQuantity: 20,
        maxQuantity: 180,
        trackQuantity: true,
        barcode: '',
        tags: 'coffee, americano',
      },
      {
        id: '6',
        name: 'Mocha',
        image: Maincourse2,
        category: 'Coffee',
        sku: 'C006',
        status: 'active',
        price: 7.00,
        description: 'Chocolate mocha',
        costPrice: 5.00,
        taxPercentage: 0,
        quantity: 60,
        unit: 'Pcs',
        minQuantity: 10,
        maxQuantity: 120,
        trackQuantity: true,
        barcode: '',
        tags: 'coffee, mocha, chocolate',
      },
      // Dessert Products
      {
        id: '7',
        name: 'Chocolate Cake',
        image: Stockimage5,
        category: 'Dessert',
        sku: 'D001',
        status: 'active',
        price: 12.00,
        description: 'Rich chocolate cake',
        costPrice: 8.00,
        taxPercentage: 5,
        quantity: 30,
        unit: 'Pcs',
        minQuantity: 5,
        maxQuantity: 50,
        trackQuantity: true,
        barcode: '',
        tags: 'dessert, cake, chocolate',
      },
      {
        id: '8',
        name: 'Vanilla Cake',
        image: Stockimage3,
        category: 'Dessert',
        sku: 'D002',
        status: 'active',
        price: 8.00,
        description: 'Classic vanilla cake',
        costPrice: 5.00,
        taxPercentage: 5,
        quantity: 25,
        unit: 'Pcs',
        minQuantity: 5,
        maxQuantity: 50,
        trackQuantity: true,
        barcode: '',
        tags: 'dessert, cake, vanilla',
      },
      {
        id: '9',
        name: 'Strawberry Cake',
        image: Stockimage2,
        category: 'Dessert',
        sku: 'D003',
        status: 'active',
        price: 10.00,
        description: 'Fresh strawberry cake',
        costPrice: 7.00,
        taxPercentage: 5,
        quantity: 20,
        unit: 'Pcs',
        minQuantity: 5,
        maxQuantity: 40,
        trackQuantity: true,
        barcode: '',
        tags: 'dessert, cake, strawberry',
      },
      {
        id: '10',
        name: 'Cheesecake',
        image: Stockimage4,
        category: 'Dessert',
        sku: 'D004',
        status: 'active',
        price: 16.00,
        description: 'Creamy cheesecake',
        costPrice: 12.00,
        taxPercentage: 5,
        quantity: 15,
        unit: 'Pcs',
        minQuantity: 3,
        maxQuantity: 30,
        trackQuantity: true,
        barcode: '',
        tags: 'dessert, cheesecake',
      },
      // Ice Cream Products
      {
        id: '11',
        name: 'Ice Cream Special',
        image: Maincourse5,
        category: 'Ice Cream',
        sku: 'IC001',
        status: 'active',
        price: 9.00,
        description: 'Special ice cream',
        costPrice: 6.00,
        taxPercentage: 5,
        quantity: 40,
        unit: 'Pcs',
        minQuantity: 10,
        maxQuantity: 80,
        trackQuantity: true,
        barcode: '',
        tags: 'ice cream, dessert',
      },
      {
        id: '12',
        name: 'Chocolate Ice Cream',
        image: Stockimage5,
        category: 'Ice Cream',
        sku: 'IC002',
        status: 'active',
        price: 10.00,
        description: 'Rich chocolate ice cream',
        costPrice: 7.00,
        taxPercentage: 5,
        quantity: 35,
        unit: 'Pcs',
        minQuantity: 10,
        maxQuantity: 70,
        trackQuantity: true,
        barcode: '',
        tags: 'ice cream, chocolate',
      },
      {
        id: '13',
        name: 'Vanilla Ice Cream',
        image: Stockimage4,
        category: 'Ice Cream',
        sku: 'IC003',
        status: 'active',
        price: 9.00,
        description: 'Classic vanilla ice cream',
        costPrice: 6.00,
        taxPercentage: 5,
        quantity: 45,
        unit: 'Pcs',
        minQuantity: 10,
        maxQuantity: 90,
        trackQuantity: true,
        barcode: '',
        tags: 'ice cream, vanilla',
      },
      {
        id: '14',
        name: 'Strawberry Ice Cream',
        image: Stockimage1,
        category: 'Ice Cream',
        sku: 'IC004',
        status: 'active',
        price: 11.00,
        description: 'Fresh strawberry ice cream',
        costPrice: 8.00,
        taxPercentage: 5,
        quantity: 30,
        unit: 'Pcs',
        minQuantity: 8,
        maxQuantity: 60,
        trackQuantity: true,
        barcode: '',
        tags: 'ice cream, strawberry',
      },
      // Juice Products
      {
        id: '15',
        name: 'Pineapple Punch',
        image: Stockimage2,
        category: 'Juice',
        sku: 'JUI-003',
        status: 'active',
        price: 6.00,
        description: 'Fresh pineapple juice',
        costPrice: 4.00,
        taxPercentage: 5,
        quantity: 50,
        unit: 'Pcs',
        minQuantity: 10,
        maxQuantity: 100,
        trackQuantity: true,
        barcode: '',
        tags: 'juice, pineapple',
      },
      {
        id: '16',
        name: 'Mango Delight',
        image: Stockimage3,
        category: 'Juice',
        sku: 'JUI-001',
        status: 'active',
        price: 7.00,
        description: 'Sweet mango juice',
        costPrice: 5.00,
        taxPercentage: 5,
        quantity: 45,
        unit: 'Pcs',
        minQuantity: 10,
        maxQuantity: 90,
        trackQuantity: true,
        barcode: '',
        tags: 'juice, mango',
      },
      {
        id: '17',
        name: 'Orange Juice',
        image: Stockimage1,
        category: 'Juice',
        sku: 'JUI-004',
        status: 'active',
        price: 6.00,
        description: 'Fresh orange juice',
        costPrice: 4.00,
        taxPercentage: 5,
        quantity: 55,
        unit: 'Pcs',
        minQuantity: 15,
        maxQuantity: 110,
        trackQuantity: true,
        barcode: '',
        tags: 'juice, orange',
      },
      {
        id: '18',
        name: 'Watermelon Juice',
        image: Stockimage4,
        category: 'Juice',
        sku: 'JUI-005',
        status: 'active',
        price: 5.00,
        description: 'Refreshing watermelon juice',
        costPrice: 3.00,
        taxPercentage: 5,
        quantity: 40,
        unit: 'Pcs',
        minQuantity: 10,
        maxQuantity: 80,
        trackQuantity: true,
        barcode: '',
        tags: 'juice, watermelon',
      },
      // Snack Products
      {
        id: '19',
        name: 'Kebab Sleman',
        image: Maincourse2,
        category: 'Snack',
        sku: 'M002',
        status: 'active',
        price: 15.00,
        description: 'Delicious kebab',
        costPrice: 12.00,
        taxPercentage: 8,
        quantity: 30,
        unit: 'Pcs',
        minQuantity: 5,
        maxQuantity: 60,
        trackQuantity: true,
        barcode: '',
        tags: 'snack, kebab',
      },
      {
        id: '20',
        name: 'Delicious Food',
        image: Maincourse1,
        category: 'Snack',
        sku: 'M001',
        status: 'active',
        price: 18.00,
        description: 'Special delicious food',
        costPrice: 15.00,
        taxPercentage: 8,
        quantity: 25,
        unit: 'Pcs',
        minQuantity: 5,
        maxQuantity: 50,
        trackQuantity: true,
        barcode: '',
        tags: 'snack, food',
      },
      {
        id: '21',
        name: 'Meatball Delicious',
        image: Maincourse3,
        category: 'Snack',
        sku: 'M003',
        status: 'active',
        price: 7.00,
        description: 'Tasty meatballs',
        costPrice: 5.00,
        taxPercentage: 8,
        quantity: 40,
        unit: 'Pcs',
        minQuantity: 10,
        maxQuantity: 80,
        trackQuantity: true,
        barcode: '',
        tags: 'snack, meatball',
      },
      {
        id: '22',
        name: 'Nasi Gudeg',
        image: Maincourse5,
        category: 'Snack',
        sku: 'M004',
        status: 'active',
        price: 12.00,
        description: 'Traditional nasi gudeg',
        costPrice: 9.00,
        taxPercentage: 8,
        quantity: 35,
        unit: 'Pcs',
        minQuantity: 8,
        maxQuantity: 70,
        trackQuantity: true,
        barcode: '',
        tags: 'snack, nasi, gudeg',
      },
      {
        id: '23',
        name: 'Ayam Bakar',
        image: Maincourse1,
        category: 'Snack',
        sku: 'M005',
        status: 'active',
        price: 18.00,
        description: 'Grilled chicken',
        costPrice: 14.00,
        taxPercentage: 8,
        quantity: 20,
        unit: 'Pcs',
        minQuantity: 5,
        maxQuantity: 40,
        trackQuantity: true,
        barcode: '',
        tags: 'snack, chicken, grilled',
      },
      {
        id: '24',
        name: 'Rendang',
        image: Maincourse2,
        category: 'Snack',
        sku: 'M006',
        status: 'active',
        price: 20.00,
        description: 'Spicy beef rendang',
        costPrice: 16.00,
        taxPercentage: 8,
        quantity: 15,
        unit: 'Pcs',
        minQuantity: 3,
        maxQuantity: 30,
        trackQuantity: true,
        barcode: '',
        tags: 'snack, rendang, beef',
      },
    ];
  };

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (product: ProductItem) => {
    setEditingProduct(product);
    setShowEditPage(true);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      // Notify menu page
      window.dispatchEvent(new CustomEvent('productsUpdated', {
        detail: { products: updatedProducts }
      }));
    }
  };

  const handleUpdateProduct = (updatedProduct: ProductItem) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    setShowEditPage(false);
    setEditingProduct(null);
    
    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    // Notify menu page
    window.dispatchEvent(new CustomEvent('productsUpdated', {
      detail: { products: updatedProducts }
    }));
  };

  const handleCloseEdit = () => {
    setShowEditPage(false);
    setEditingProduct(null);
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

  // Show edit page if editing
  if (showEditPage && editingProduct) {
    return (
      <EditProduct
        product={editingProduct}
        onClose={handleCloseEdit}
        onUpdate={handleUpdateProduct}
      />
    );
  }

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
                <td className="price-cell">${item.price.toFixed(2)}</td>
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
          <span className="found-items">Found {products.length} Items</span>
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
          <span className="show-items">Show {itemsPerPage} items</span>
        </div>
      </div>
    </div>
  );
};

export default Product;