import React, { useState } from 'react';
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
  
  // User details state
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: 'Xoana',
    lastName: 'Herera',
    phone: '',
    email: 'HeyXoana@gmail.com',
    role: 'Admin',
    userId: '1912425024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  });

  // Company details state
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: ''
  });

  // Temporary state for user details form
  const [tempUserDetails, setTempUserDetails] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    phone: userDetails.phone,
    email: userDetails.email
  });

  // Handle avatar upload
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
    // Update the main user details with temporary form values
    setUserDetails(prev => ({
      ...prev,
      firstName: tempUserDetails.firstName,
      lastName: tempUserDetails.lastName,
      phone: tempUserDetails.phone,
      email: tempUserDetails.email
    }));
    
    // Show success message or handle save logic
    alert('User details saved successfully!');
  };

  const renderCompanyDetails = () => (
    <div className="profile_content">
      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Name</label>
          <input 
            type="text" 
            placeholder="Enter name" 
            className="profile_input"
            value={companyDetails.name}
            onChange={(e) => handleCompanyDetailsChange('name', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Email</label>
          <input 
            type="email" 
            placeholder="Enter email" 
            className="profile_input"
            value={companyDetails.email}
            onChange={(e) => handleCompanyDetailsChange('email', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Phone Number</label>
          <input 
            type="text" 
            placeholder="Enter phone number" 
            className="profile_input"
            value={companyDetails.phone}
            onChange={(e) => handleCompanyDetailsChange('phone', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Address</label>
          <input 
            type="text" 
            placeholder="Enter address" 
            className="profile_input"
            value={companyDetails.address}
            onChange={(e) => handleCompanyDetailsChange('address', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Description</label>
          <textarea 
            placeholder="Enter description" 
            className="profile_input profile_textarea"
            value={companyDetails.description}
            onChange={(e) => handleCompanyDetailsChange('description', e.target.value)}
            rows={4}
          />
        </div>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            placeholder="Ram" 
            className="profile_input"
            value={tempUserDetails.firstName}
            onChange={(e) => handleUserDetailsChange('firstName', e.target.value)}
          />
        </div>
        <div className="profile_form_group">
          <label className="profile_form_label">Last Name</label>
          <input 
            type="text" 
            placeholder="Pratap" 
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
            placeholder="Enter phone" 
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
            placeholder="ram@gmail.com" 
            className="profile_input"
            value={tempUserDetails.email}
            onChange={(e) => handleUserDetailsChange('email', e.target.value)}
          />
        </div>
      </div>

      <div className="profile_actions">
        <button className="profile_save_btn_blue" onClick={handleUserDetailsSave}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Save
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

            {/* <div className="profile_info_item">
              <label className="profile_label">User ID</label>
              <p className="profile_value">{userDetails.userId}</p>
            </div> */}

            <div className="profile_info_item">
              <label className="profile_label">Role</label>
              <p className="profile_value">{userDetails.role}</p>
            </div>

            <div className="profile_info_item">
              <label className="profile_label">Email</label>
              <p className="profile_value">{userDetails.email}</p>
            </div>

            {/* <div className="profile_info_item">
              <label className="profile_label">Address</label>
              <p className="profile_value">
                2972 Westheimer Rd,<br />Santa ana, Illinois 85486
              </p>
            </div> */}
          </div>

          <button className="profile_logout_btn" onClick={handleLogout}>
            <span className="profile_logout_icon">↪</span> Log Out
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