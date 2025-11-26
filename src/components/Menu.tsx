import React, { useState } from 'react';
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


const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Best Seller');
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  // Sample menu data with images (you can replace with your actual images)
  const menuData = {
    'Best Seller': [
      { id: 1, name: 'Egg Cep', price: 100, status: 'Available', image: Desert1, },
      { id: 2, name: 'Kue Pelangi', price: 10, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 3, name: 'Strawberry Cake', price: 7, status: 'Not Available', image: '/api/placeholder/200/140' },
      { id: 4, name: 'Molen Cake', price: 15, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 5, name: 'Molen Cake', price: 15, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 6, name: 'Premium Ice Cream', price: 12, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 7, name: 'Kebab Sleman', price: 10, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 8, name: 'Delicious Food', price: 8, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 9, name: 'Meatball Delicious', price: 7, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 10, name: 'Selat Solo Eco', price: 15, status: 'Available', image: '/api/placeholder/200/140' },
    ],
    'Dessert': [
      { id: 11, name: 'Egg Ceplok', price: 100, status: 'Available', image: Desert1 },
      { id: 12, name: 'Kue Pelangi', price: 10, status: 'Available', image: Desert2 },
      { id: 13, name: 'Strawberry Cake', price: 7, status: 'Not Available', image: Desert3 },
      { id: 14, name: 'Molen Cake', price: 15, status: 'Available', image: Desert4 },
      { id: 15, name: 'Chocolate Cake', price: 12, status: 'Available', image: Desert5 },
      { id: 16, name: 'Vanilla Cake', price: 8, status: 'Available', image: Desert3 },
      { id: 17, name: 'Red Velvet Cake', price: 14, status: 'Available', image: Desert4 },
      { id: 18, name: 'Cheesecake', price: 16, status: 'Available', image: Desert2},
    ],
    'Maincourse': [
      { id: 19, name: 'Delicious Food', price: 5, status: 'Available', image: Maincourse1 },
      { id: 20, name: 'Kebab Sleman', price: 10, status: 'Available', image: Maincourse2 },
      { id: 21, name: 'Meatball Delicious', price: 7, status: 'Available', image: Maincourse3 },
      { id: 22, name: 'Selat Solo Eco', price: 15, status: 'Available', image: Maincourse4 },
      { id: 23, name: 'Nasi Gudeg', price: 12, status: 'Available', image: Maincourse5 },
      { id: 24, name: 'Ayam Bakar', price: 18, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 25, name: 'Rendang', price: 20, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 26, name: 'Gado-gado', price: 8, status: 'Available', image: '/api/placeholder/200/140' },
    ],
    'Ice Cream': [
      { id: 27, name: 'Ice Cream Special', price: 8, status: 'Available', image:  Maincourse5  },
      { id: 28, name: 'Premium Ice Cream', price: 12, status: 'Available', image:  Maincourse3 },
      { id: 29, name: 'Chocolate Ice Cream', price: 10, status: 'Available', image:  Desert5 },
      { id: 30, name: 'Vanilla Ice Cream', price: 9, status: 'Available', image:  Desert4 },
      { id: 31, name: 'Strawberry Ice Cream', price: 11, status: 'Available', image:  Desert1 },
      { id: 32, name: 'Mint Ice Cream', price: 10, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 33, name: 'Cookies & Cream', price: 12, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 34, name: 'Pistachio Ice Cream', price: 13, status: 'Available', image: '/api/placeholder/200/140' },
    ],
    'Juice': [
      { id: 35, name: 'Orange Juice', price: 6, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 36, name: 'Apple Juice', price: 6, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 37, name: 'Mango Juice', price: 7, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 38, name: 'Watermelon Juice', price: 5, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 39, name: 'Pineapple Juice', price: 6, status: 'Not Available', image: '/api/placeholder/200/140' },
      { id: 40, name: 'Mixed Fruit Juice', price: 8, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 41, name: 'Carrot Juice', price: 5, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 42, name: 'Beetroot Juice', price: 6, status: 'Available', image: '/api/placeholder/200/140' },
    ],
    'Coffee': [
      { id: 43, name: 'Espresso', price: 4, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 44, name: 'Cappuccino', price: 6, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 45, name: 'Latte', price: 6, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 46, name: 'Americano', price: 5, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 47, name: 'Mocha', price: 7, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 48, name: 'Macchiato', price: 6, status: 'Not Available', image: '/api/placeholder/200/140' },
      { id: 49, name: 'Flat White', price: 6, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 50, name: 'Turkish Coffee', price: 5, status: 'Available', image: '/api/placeholder/200/140' },
    ],
    'Tea': [
      { id: 51, name: 'Green Tea', price: 3, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 52, name: 'Black Tea', price: 3, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 53, name: 'Earl Grey', price: 4, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 54, name: 'Chamomile Tea', price: 4, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 55, name: 'Jasmine Tea', price: 4, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 56, name: 'Oolong Tea', price: 5, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 57, name: 'White Tea', price: 5, status: 'Available', image: '/api/placeholder/200/140' },
      { id: 58, name: 'Herbal Tea', price: 4, status: 'Available', image: '/api/placeholder/200/140' },
    ],
  };

  const categories = ['Best Seller', 'Dessert', 'Maincourse', 'Ice Cream', 'Juice', 'Coffee', 'Tea'];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // Reset expanded sections when switching categories
    setExpandedSections({});
  };

  const toggleSeeAll = (category: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const renderBestSellerSections = () => {
    const sections = [
      { name: 'Desert', items: menuData['Dessert'] },
      { name: 'Maincourse', items: menuData['Maincourse'] },
      { name: 'Ice Cream', items: menuData['Ice Cream'] }
    ];

    return sections.map((section) => {
      const isExpanded = expandedSections[section.name];
      const itemsToShow = isExpanded ? section.items : section.items.slice(0, 5);

      return (
        <div key={section.name} className="section">
          <div className="section-header">
            <h2>{section.name}</h2>
            <span className="badge">Top performer - Monthly</span>
            <button 
              className="see-all"
              onClick={() => toggleSeeAll(section.name)}
            >
              {isExpanded ? 'Show Less' : 'See All'}
            </button>
          </div>
          
          <div className="items-grid">
            {itemsToShow.map((item) => (
              <div key={item.id} className="item-card">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <span className="price">{item.price}$</span>
                </div>
                <span className={`status ${item.status === 'Available' ? 'available' : 'not-available'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  const renderSingleCategorySection = () => {
    const items = menuData[activeCategory as keyof typeof menuData] || [];
    const isExpanded = expandedSections[activeCategory];
    const itemsToShow = isExpanded ? items : items.slice(0, 5);

    return (
      <div className="section">
        <div className="section-header">
          <h2>{activeCategory}</h2>
          <span className="badge">Top performer - Monthly</span>
          <button 
            className="see-all"
            onClick={() => toggleSeeAll(activeCategory)}
          >
            {isExpanded ? 'Show Less' : 'See All'}
          </button>
        </div>
        
        <div className="items-grid">
          {itemsToShow.map((item) => (
            <div key={item.id} className="item-card">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-info">
                <h3>{item.name}</h3>
                <span className="price">{item.price}$</span>
              </div>
              <span className={`status ${item.status === 'Available' ? 'available' : 'not-available'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="menu-container">
      {/* Navigation Tabs */}
      <div className="nav-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`nav-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Content Based on Active Category */}
      <div className="menu-content">
        {activeCategory === 'Best Seller' ? renderBestSellerSections() : renderSingleCategorySection()}
      </div>
    </div>
  );
};

export default MenuPage;