import React from 'react';
import '../styles/footer.css';

interface NavItem {
  id: string;
  label: string;
}

interface FooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab }) => {
  const navItems: NavItem[] = [
    { id: 'menu', label: 'Menu' },
    { id: 'customer', label: 'Customer' },
    { id: 'product', label: 'Product' },
    { id: 'stock', label: 'Stock' },
    { id: 'deliver', label: 'Deliver' },
    { id: 'report', label: 'Report' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    console.log(`Navigating to ${tabId}`);
  };

  const handleProfileClick = () => {
    console.log('Navigating to Profile');
    setActiveTab('profile');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="profile-section" onClick={handleProfileClick}>
          <div className="profile-image" />
          <div className="profile-text">
            <span className="profile-name">Rose</span>
            <span className="profile-role">Employee</span>
          </div>
        </div>

        <div className="nav-section">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <div
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleTabClick(item.id)}
              >
                <div className={`icon icon-${item.id} ${isActive ? 'active' : ''}`} />
                <span className={`nav-label ${isActive ? 'active' : ''}`}>
                  {item.label}
                </span>
                <div className={`underline ${isActive ? 'active' : ''}`} />
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;