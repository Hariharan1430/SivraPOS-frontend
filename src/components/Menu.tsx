import React, { useState, useEffect } from 'react';
import '../styles/menu.css';
import Desert1 from '../assests/Desert1.jpg'
import Desert2 from '../assests/Desert2.jpg'
import Desert3 from '../assests/Desert3.jpg'
import Desert4 from '../assests/Desert4.jpg'
import Desert5 from '../assests/Desert5.jpg'
import Maincourse1 from '../assests/Maincourse1.jpg'
import Maincourse2 from '../assests/Maincourse2.jpg'
import Maincourse3 from '../assests/Maincourse3.jpg'
import Maincourse4 from '../assests/Maincourse4.jpg'
import Maincourse5 from '../assests/Maincourse5.jpg'

interface MenuItem {
  id: number;
  name: string;
  price: number;
  status: string;
  image: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
  color: string;
  initial: string;
  deleted?: boolean;
}

interface MenuPageProps {
  onAddToOrder?: (item: MenuItem, quantity: number) => void;
  onUpdateQuantity?: (itemId: number, quantity: number) => void;
  orderItems?: { id: number; quantity: number }[];
  onOpenDrawer?: () => void;
  isDrawerOpen?: boolean;
}

const MenuPage: React.FC<MenuPageProps> = ({ 
  onAddToOrder, 
  onUpdateQuantity, 
  orderItems = [],
  onOpenDrawer,
  isDrawerOpen = false
}) => {
  const [activeCategory, setActiveCategory] = useState('Best Seller');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState('active');
  const [categories, setCategories] = useState<Category[]>([]);

  // Load categories from localStorage on mount and listen for updates
  useEffect(() => {
    loadCategories();

    // Listen for category updates from ProductCategories component
    const handleCategoriesUpdate = (event: CustomEvent) => {
      console.log('Categories updated:', event.detail);
      loadCategories();
    };

    window.addEventListener('categoriesUpdated', handleCategoriesUpdate as EventListener);

    // Also listen for storage events (when localStorage changes in another tab/window)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'productCategories') {
        loadCategories();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('categoriesUpdated', handleCategoriesUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadCategories = () => {
    const savedCategories = localStorage.getItem('productCategories');
    if (savedCategories) {
      try {
        const parsed: Category[] = JSON.parse(savedCategories);
        // Filter out deleted categories
        const activeCategories = parsed.filter(cat => !cat.deleted);
        setCategories(activeCategories);
        
        // If current active category was deleted, switch to Best Seller
        if (activeCategory !== 'Best Seller' && !activeCategories.some(cat => cat.name === activeCategory)) {
          setActiveCategory('Best Seller');
        }
      } catch (error) {
        console.error('Error loading categories:', error);
        setCategories(getDefaultCategories());
      }
    } else {
      setCategories(getDefaultCategories());
    }
  };

  const getDefaultCategories = (): Category[] => {
    return [
      { id: 1, name: 'Coffee', color: '#4CAF50', initial: 'C', deleted: false },
      { id: 2, name: 'Dessert', color: '#FF6B6B', initial: 'D', deleted: false },
      { id: 3, name: 'Ice Cream', color: '#4ECDC4', initial: 'I', deleted: false },
      { id: 4, name: 'Juice', color: '#FFE66D', initial: 'J', deleted: false },
      { id: 5, name: 'Snack', color: '#A8E6CF', initial: 'S', deleted: false },
    ];
  };

  // Complete menu data
  const menuData: { [key: string]: MenuItem[] } = {
    'Coffee': [
      { id: 43, name: 'Espresso', price: 100, status: 'Available', image: Desert1, category: 'Coffee' },
      { id: 44, name: 'Cappuccino', price: 6, status: 'Available', image: Desert2, category: 'Coffee' },
      { id: 45, name: 'Latte', price: 6, status: 'Available', image: Desert5, category: 'Coffee' },
      { id: 46, name: 'Cold Brew', price: 180, status: 'Available', image: Desert4, category: 'Coffee' },
      { id: 47, name: 'Cold Coffe', price: 10, status: 'Available', image: Desert3, category: 'Coffee' },
      { id: 48, name: 'Americano', price: 5, status: 'Available', image: Maincourse5, category: 'Coffee' },
      { id: 49, name: 'Mocha', price: 7, status: 'Available', image: Maincourse2, category: 'Coffee' },
    ],
    'Dessert': [
      { id: 11, name: 'Egg Ceplok', price: 100, status: 'Available', image: Desert1, category: 'Dessert' },
      { id: 12, name: 'Kue Pelangi', price: 10, status: 'Available', image: Desert2, category: 'Dessert' },
      { id: 13, name: 'Strawberry Cake', price: 7, status: 'Not Available', image: Desert3, category: 'Dessert' },
      { id: 14, name: 'Molen Cake', price: 15, status: 'Available', image: Desert4, category: 'Dessert' },
      { id: 15, name: 'Chocolate Cake', price: 12, status: 'Available', image: Desert5, category: 'Dessert' },
      { id: 16, name: 'Vanilla Cake', price: 8, status: 'Available', image: Desert3, category: 'Dessert' },
      { id: 17, name: 'Red Velvet Cake', price: 14, status: 'Available', image: Desert4, category: 'Dessert' },
      { id: 18, name: 'Cheesecake', price: 16, status: 'Available', image: Desert2, category: 'Dessert' },
    ],
    'Ice Cream': [
      { id: 27, name: 'Ice Cream Special', price: 8, status: 'Available', image: Maincourse5, category: 'Ice Cream' },
      { id: 28, name: 'Premium Ice Cream', price: 12, status: 'Available', image: Maincourse3, category: 'Ice Cream' },
      { id: 29, name: 'Chocolate Ice Cream', price: 10, status: 'Available', image: Desert5, category: 'Ice Cream' },
      { id: 30, name: 'Vanilla Ice Cream', price: 9, status: 'Available', image: Desert4, category: 'Ice Cream' },
      { id: 31, name: 'Strawberry Ice Cream', price: 11, status: 'Available', image: Desert1, category: 'Ice Cream' },
      { id: 32, name: 'Mint Ice Cream', price: 10, status: 'Available', image: Desert2, category: 'Ice Cream' },
      { id: 33, name: 'Cookies & Cream', price: 12, status: 'Available', image: Desert3, category: 'Ice Cream' },
    ],
    'Juice': [
      { id: 35, name: 'Orange Juice', price: 6, status: 'Available', image: Desert1, category: 'Juice' },
      { id: 36, name: 'Apple Juice', price: 6, status: 'Available', image: Desert5, category: 'Juice' },
      { id: 37, name: 'Mango Juice', price: 7, status: 'Available', image: Desert3, category: 'Juice' },
      { id: 38, name: 'Watermelon Juice', price: 5, status: 'Available', image: Desert4, category: 'Juice' },
      { id: 39, name: 'Pineapple Juice', price: 6, status: 'Not Available', image: Desert2, category: 'Juice' },
      { id: 40, name: 'Mixed Fruit Juice', price: 8, status: 'Available', image: Maincourse1, category: 'Juice' },
      { id: 41, name: 'Carrot Juice', price: 5, status: 'Available', image: Maincourse2, category: 'Juice' },
    ],
    'Snack': [
      { id: 19, name: 'Delicious Food', price: 5, status: 'Available', image: Maincourse1, category: 'Snack' },
      { id: 20, name: 'Kebab Sleman', price: 10, status: 'Available', image: Maincourse2, category: 'Snack' },
      { id: 21, name: 'Meatball Delicious', price: 7, status: 'Available', image: Maincourse3, category: 'Snack' },
      { id: 22, name: 'Selat Solo Eco', price: 15, status: 'Available', image: Maincourse4, category: 'Snack' },
      { id: 23, name: 'Nasi Gudeg', price: 12, status: 'Available', image: Maincourse5, category: 'Snack' },
      { id: 24, name: 'Ayam Bakar', price: 18, status: 'Available', image: Maincourse1, category: 'Snack' },
      { id: 25, name: 'Rendang', price: 20, status: 'Available', image: Maincourse2, category: 'Snack' },
    ],
  };

  // Get main categories including Best Seller and dynamic categories
  const mainCategories = ['Best Seller', ...categories.map(cat => cat.name)];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const getItemQuantity = (itemId: number): number => {
    const orderItem = orderItems.find(item => item.id === itemId);
    return orderItem ? orderItem.quantity : 0;
  };

  const handleAddClick = (item: MenuItem) => {
    if (item.status === 'Available' && onAddToOrder) {
      onAddToOrder(item, 1);
      // Open drawer after a short delay to ensure item is added first
      setTimeout(() => {
        if (onOpenDrawer) {
          onOpenDrawer();
        }
      }, 100);
    }
  };

  const handleQuantityChange = (item: MenuItem, change: number) => {
    const currentQty = getItemQuantity(item.id);
    const newQty = currentQty + change;
    
    if (newQty <= 0) {
      if (onUpdateQuantity) {
        onUpdateQuantity(item.id, 0);
      }
    } else {
      if (currentQty === 0 && change > 0) {
        if (onAddToOrder) {
          onAddToOrder(item, 1);
          if (onOpenDrawer) {
            onOpenDrawer();
          }
        }
      } else {
        if (onUpdateQuantity) {
          onUpdateQuantity(item.id, newQty);
        }
      }
    }
  };

  const sortItems = (items: MenuItem[]) => {
    let filteredItems = items;
    
    if (statusFilter === 'active') {
      filteredItems = items.filter(item => item.status === 'Available');
    }

    const sortedItems = [...filteredItems].sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === 'asc' 
          ? a.price - b.price
          : b.price - a.price;
      }
    });

    return sortedItems;
  };

  const getAllBestSellerItems = () => {
    const allItems: MenuItem[] = [];
    // Only include items from categories that exist in our current categories list
    const activeCategoryNames = categories.map(cat => cat.name);
    
    Object.keys(menuData).forEach(category => {
      // Only add items if the category is still active
      if (activeCategoryNames.includes(category)) {
        const categoryItems = menuData[category as keyof typeof menuData] || [];
        allItems.push(...categoryItems);
      }
    });
    return allItems;
  };

  const renderContent = () => {
    let items: MenuItem[] = [];
    
    if (activeCategory === 'Best Seller') {
      items = getAllBestSellerItems();
    } else {
      // Check if the category exists in our active categories
      if (categories.some(cat => cat.name === activeCategory)) {
        items = menuData[activeCategory as keyof typeof menuData] || [];
      } else {
        // Category doesn't exist, show empty
        items = [];
      }
    }

    const sortedItems = sortItems(items);
    const itemCount = sortedItems.length;

    return (
      <div className="section">
        <div className="section-header">
          <div className="section-title-wrapper">
            <h2>{activeCategory} ({itemCount})</h2>
            <span className="badge">Top performer - Monthly</span>
          </div>
        </div>
        
        <div className="items-grid">
          {sortedItems.length === 0 ? (
            <div className="menu-empty-state">
              <p>No items found in this category</p>
            </div>
          ) : (
            sortedItems.map((item) => {
              const quantity = getItemQuantity(item.id);
              const isInOrder = quantity > 0;

              return (
                <div key={item.id} className="item-card">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <span className="price">{item.price.toFixed(2)}</span>
                  </div>
                  <span className={`status ${item.status === 'Available' ? 'available' : 'not-available'}`}>
                    {item.status}
                  </span>
                  
                  {isInOrder ? (
                    <div className="quantity-controls-card">
                      <button 
                        className="qty-card-btn minus"
                        onClick={() => handleQuantityChange(item, -1)}
                      >
                        −
                      </button>
                      <span className="quantity-display">{quantity}</span>
                      <button 
                        className="qty-card-btn plus"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button 
                      className={`add-btn ${item.status !== 'Available' ? 'disabled' : ''}`}
                      onClick={() => handleAddClick(item)}
                      disabled={item.status !== 'Available'}
                    >
                      <span className="add-icon">+</span>
                      Add
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`menu-container ${isDrawerOpen ? 'drawer-open' : ''}`}>
      {/* Main Category Navigation */}
      <div className="main-nav-tabs">
        {mainCategories.map((category) => (
          <button
            key={category}
            className={`main-nav-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter Controls */}
      <div className="filter-controls">
        <div className="filter-group">
          <select 
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>

        <button 
          className="sort-order-btn"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path 
              d={sortOrder === 'asc' ? "M8 3L8 13M8 3L4 7M8 3L12 7" : "M8 13L8 3M8 13L12 9M8 13L4 9"}
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          {sortOrder === 'asc' ? 'Asc' : 'Desc'}
        </button>

        <div className="filter-group">
          <select 
            className="filter-select status-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="menu-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default MenuPage;