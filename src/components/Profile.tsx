import React, { useState, useEffect } from 'react';
import '../styles/profile.css';

interface ProfilePageProps {
  onLogout?: () => void;
}

interface UserDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  userId: string;
  avatar: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('company');
  
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: 'Xoana',
    lastName: 'Herera',
    phone: '',
    email: 'HeyXoana@gmail.com',
    role: 'Admin',
    userId: '1912425024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  });

  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    taxId: '',
    salesTaxRate: '0',
    receiptFooterMessage: ''
  });

  const [tempUserDetails, setTempUserDetails] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    phone: userDetails.phone,
    email: userDetails.email
  });

  useEffect(() => {
    const savedCompanyName = localStorage.getItem('companyName') || '';
    const savedCompanyEmail = localStorage.getItem('companyEmail') || '';
    const savedCompanyPhone = localStorage.getItem('companyPhone') || '';
    const savedCompanyAddress = localStorage.getItem('companyAddress') || '';
    const savedCompanyCity = localStorage.getItem('companyCity') || '';
    const savedCompanyState = localStorage.getItem('companyState') || '';
    const savedCompanyZipCode = localStorage.getItem('companyZipCode') || '';
    const savedCompanyTaxId = localStorage.getItem('companyTaxId') || '';
    const savedSalesTaxRate = localStorage.getItem('companySalesTaxRate') || '0';
    const savedReceiptFooterMessage = localStorage.getItem('companyReceiptFooterMessage') || '';

    setCompanyDetails({
      name: savedCompanyName,
      email: savedCompanyEmail,
      phone: savedCompanyPhone,
      address: savedCompanyAddress,
      city: savedCompanyCity,
      state: savedCompanyState,
      zipCode: savedCompanyZipCode,
      taxId: savedCompanyTaxId,
      salesTaxRate: savedSalesTaxRate,
      receiptFooterMessage: savedReceiptFooterMessage
    });
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleUserDetailsChange = (field: string, value: string) => {
    setTempUserDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCompanyDetailsChange = (field: string, value: string) => {
    setCompanyDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUserDetailsSave = () => {
    setUserDetails(prev => ({
      ...prev,
      firstName: tempUserDetails.firstName,
      lastName: tempUserDetails.lastName,
      phone: tempUserDetails.phone,
      email: tempUserDetails.email
    }));
    
    alert('User details saved successfully!');
  };

  const handleCompanyDetailsSave = () => {
    // Validate sales tax rate
    const taxRate = parseFloat(companyDetails.salesTaxRate);
    if (isNaN(taxRate) || taxRate < 0 || taxRate > 100) {
      alert('Please enter a valid sales tax rate between 0 and 100');
      return;
    }

    localStorage.setItem('companyName', companyDetails.name);
    localStorage.setItem('companyEmail', companyDetails.email);
    localStorage.setItem('companyPhone', companyDetails.phone);
    localStorage.setItem('companyAddress', companyDetails.address);
    localStorage.setItem('companyCity', companyDetails.city);
    localStorage.setItem('companyState', companyDetails.state);
    localStorage.setItem('companyZipCode', companyDetails.zipCode);
    localStorage.setItem('companyTaxId', companyDetails.taxId);
    localStorage.setItem('companySalesTaxRate', companyDetails.salesTaxRate);
    localStorage.setItem('companyReceiptFooterMessage', companyDetails.receiptFooterMessage);
    
    alert('Company details saved successfully!');
  };

  // US States list for dropdown
  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
    'Wisconsin', 'Wyoming'
  ];

  const renderCompanyDetails = () => (
    <div className="profile_content">
      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Company Name *</label>
          <input 
            type="text" 
            placeholder="Enter company name" 
            className="profile_input"
            value={companyDetails.name}
            onChange={(e) => handleCompanyDetailsChange('name', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_form_row profile_form_row_split">
        <div className="profile_form_group">
          <label className="profile_form_label">Email *</label>
          <input 
            type="email" 
            placeholder="Enter company email" 
            className="profile_input"
            value={companyDetails.email}
            onChange={(e) => handleCompanyDetailsChange('email', e.target.value)}
          />
        </div>
        <div className="profile_form_group">
          <label className="profile_form_label">Phone Number *</label>
          <input 
            type="text" 
            placeholder="(555) 123-4567" 
            className="profile_input"
            value={companyDetails.phone}
            onChange={(e) => handleCompanyDetailsChange('phone', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Street Address *</label>
          <input 
            type="text" 
            placeholder="Enter street address" 
            className="profile_input"
            value={companyDetails.address}
            onChange={(e) => handleCompanyDetailsChange('address', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_form_row profile_form_row_split">
        <div className="profile_form_group">
          <label className="profile_form_label">City *</label>
          <input 
            type="text" 
            placeholder="Enter city" 
            className="profile_input"
            value={companyDetails.city}
            onChange={(e) => handleCompanyDetailsChange('city', e.target.value)}
          />
        </div>
        <div className="profile_form_group">
          <label className="profile_form_label">State *</label>
          <select
            className="profile_input profile_select"
            value={companyDetails.state}
            onChange={(e) => handleCompanyDetailsChange('state', e.target.value)}
          >
            <option value="">Select State</option>
            {usStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="profile_form_row profile_form_row_split">
        <div className="profile_form_group">
          <label className="profile_form_label">ZIP Code *</label>
          <input 
            type="text" 
            placeholder="12345" 
            className="profile_input"
            value={companyDetails.zipCode}
            onChange={(e) => handleCompanyDetailsChange('zipCode', e.target.value)}
            maxLength={10}
          />
        </div>
        <div className="profile_form_group">
          <label className="profile_form_label">Federal Tax ID (EIN)</label>
          <input 
            type="text" 
            placeholder="12-3456789" 
            className="profile_input"
            value={companyDetails.taxId}
            onChange={(e) => handleCompanyDetailsChange('taxId', e.target.value)}
            maxLength={10}
          />
          <small style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', display: 'block' }}>
            Format: XX-XXXXXXX (9 digits)
          </small>
        </div>
      </div>

      <div className="profile_section_divider"></div>
      <h3 className="profile_section_title">Sales Tax Configuration</h3>
      
      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Sales Tax Rate (%) *</label>
          <input 
            type="number" 
            placeholder="Enter sales tax rate (e.g., 7.5)" 
            min="0"
            max="100"
            step="0.01"
            className="profile_input"
            value={companyDetails.salesTaxRate}
            onChange={(e) => handleCompanyDetailsChange('salesTaxRate', e.target.value)}
          />
          <small style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', display: 'block' }}>
            Enter the combined state + local sales tax rate for your location
          </small>
        </div>
      </div>

      <div className="profile_form_row" style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
            <circle cx="10" cy="10" r="9" stroke="#3b82f6" strokeWidth="1.5"/>
            <path d="M10 6v4M10 14h.01" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <div>
            <p style={{ fontSize: '13px', color: '#374151', fontWeight: '500', marginBottom: '6px' }}>
              About Sales Tax in the USA
            </p>
            <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5' }}>
              Sales tax rates vary by state and locality. Make sure to enter the correct combined rate for your business location. 
              Some states have no sales tax (e.g., Oregon, Delaware), while others range from 2.9% to 11.5% when including local taxes.
            </p>
          </div>
        </div>
      </div>

      <div className="profile_section_divider"></div>
      <h3 className="profile_section_title">Receipt Settings</h3>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Receipt Footer Message</label>
          <input 
            type="text" 
            placeholder="Thank You For Your Business!" 
            className="profile_input"
            value={companyDetails.receiptFooterMessage}
            onChange={(e) => handleCompanyDetailsChange('receiptFooterMessage', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_actions">
        <button className="profile_save_btn_blue" onClick={handleCompanyDetailsSave}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Save Company Details
        </button>
      </div>
    </div>
  );

  const renderUserDetails = () => (
    <div className="profile_content">
      <div className="profile_user_avatar_section">
        <div className="profile_user_avatar_wrapper">
          <img
            src={userDetails.avatar}
            alt="User Profile"
            className="profile_user_avatar"
          />
          <label htmlFor="avatar-upload" className="profile_camera_icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="profile_form_row profile_form_row_split">
        <div className="profile_form_group">
          <label className="profile_form_label">First Name</label>
          <input 
            type="text" 
            placeholder="John" 
            className="profile_input"
            value={tempUserDetails.firstName}
            onChange={(e) => handleUserDetailsChange('firstName', e.target.value)}
          />
        </div>
        <div className="profile_form_group">
          <label className="profile_form_label">Last Name</label>
          <input 
            type="text" 
            placeholder="Doe" 
            className="profile_input"
            value={tempUserDetails.lastName}
            onChange={(e) => handleUserDetailsChange('lastName', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Phone</label>
          <input 
            type="text" 
            placeholder="(555) 123-4567" 
            className="profile_input"
            value={tempUserDetails.phone}
            onChange={(e) => handleUserDetailsChange('phone', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Email</label>
          <input 
            type="email" 
            placeholder="john@example.com" 
            className="profile_input"
            value={tempUserDetails.email}
            onChange={(e) => handleUserDetailsChange('email', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_actions">
        <button className="profile_save_btn_blue" onClick={handleUserDetailsSave}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Save User Details
        </button>
      </div>
    </div>
  );

  return (
    <div className='profile_widthcontainer'>
      <div className="profile_container">
        <div className="profile_sidebar">
          <div className="profile_avatar_section">
            <img
              src={userDetails.avatar}
              alt="Profile"
              className="profile_avatar"
            />
          </div>

          <div className="profile_info">
            <div className="profile_info_item">
              <label className="profile_label">Name</label>
              <p className="profile_value">{userDetails.firstName} {userDetails.lastName}</p>
            </div>

            <div className="profile_info_item">
              <label className="profile_label">Role</label>
              <p className="profile_value">{userDetails.role}</p>
            </div>

            <div className="profile_info_item">
              <label className="profile_label">Email</label>
              <p className="profile_value">{userDetails.email}</p>
            </div>
          </div>

          <button className="profile_logout_btn" onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log Out
          </button>
        </div>

        <div className="profile_main">
          <div className="profile_tabs">
            <button
              className={`profile_tab ${activeTab === 'company' ? 'profile_tab_active' : ''}`}
              onClick={() => setActiveTab('company')}
            >
              Company Details
            </button>
            <button
              className={`profile_tab ${activeTab === 'user' ? 'profile_tab_active' : ''}`}
              onClick={() => setActiveTab('user')}
            >
              User Details
            </button>
          </div>

          {activeTab === 'company' ? renderCompanyDetails() : renderUserDetails()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;