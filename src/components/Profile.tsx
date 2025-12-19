import React, { useState } from 'react';
import '../styles/profile.css';

interface ProfilePageProps {
  onLogout?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('company');

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const renderCompanyDetails = () => (
    <div className="profile_content">
      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Name</label>
          <input type="text" placeholder="Enter name" className="profile_input" />
        </div>
      </div>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Email</label>
          <input type="email" placeholder="Enter email" className="profile_input" />
        </div>
      </div>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Phone Number</label>
          <input type="text" placeholder="Enter phone number" className="profile_input" />
        </div>
      </div>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Address</label>
          <input type="text" placeholder="Enter address" className="profile_input" />
        </div>
      </div>

      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Tax</label>
          <input type="text" placeholder="Enter tax info" className="profile_input" />
        </div>
      </div>

      <div className="profile_actions">
        <button className="profile_save_btn">Save</button>
        <button className="profile_update_btn">Update</button>
      </div>
    </div>
  );

  return (
    <div className='profile_widthcontainer'>
    <div className="profile_container">
      <div className="profile_sidebar">
        <div className="profile_avatar_section">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
            alt="Profile"
            className="profile_avatar"
          />
          <button className="profile_edit_btn">Edit</button>
        </div>

        <div className="profile_info">
          <div className="profile_info_item">
            <label className="profile_label">Name</label>
            <p className="profile_value">Xoana Herera</p>
          </div>

          <div className="profile_info_item">
            <label className="profile_label">User ID</label>
            <p className="profile_value">1912425024</p>
          </div>

          <div className="profile_info_item">
            <label className="profile_label">Role</label>
            <p className="profile_value">Admin</p>
          </div>

          <div className="profile_info_item">
            <label className="profile_label">Email</label>
            <p className="profile_value">HeyXoana@gmail.com</p>
          </div>

          <div className="profile_info_item">
            <label className="profile_label">Address</label>
            <p className="profile_value">
              2972 Westheimer Rd,<br />Santa ana, Illinois 85486
            </p>
          </div>
        </div>

        <button className="profile_logout_btn" onClick={handleLogout}>
          <span className="profile_logout_icon">↪</span> Log out
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
        </div>

        {renderCompanyDetails()}
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
