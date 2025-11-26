import React, { useState } from 'react';
import '../styles/profile.css';

interface ProfilePageProps {
  onLogout?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('database');
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const renderDatabaseSettings = () => (
    <div className="profile_content">
      <div className="profile_split_layout">
        <div className="profile_left_section">
          <div className="profile_form_row">
            <div className="profile_form_group">
              <label className="profile_form_label">Server</label>
              <div className="profile_radio_group">
                <label className="profile_radio_label">
                  <input type="radio" name="server" className="profile_radio_input" />
                  <span>Local</span>
                </label>
                <label className="profile_radio_label">
                  <input type="radio" name="server" defaultChecked className="profile_radio_input" />
                  <span>Remote</span>
                </label>
                <label className="profile_radio_label">
                  <input type="radio" name="server" className="profile_radio_input" />
                  <span>Local host</span>
                </label>
              </div>
            </div>
          </div>

          <div className="profile_form_row">
            <div className="profile_form_group">
              <label className="profile_form_label">User</label>
              <input type="text" defaultValue="Root" className="profile_input" />
            </div>
          </div>

          <div className="profile_form_row">
            <div className="profile_form_group">
              <label className="profile_form_label">Password</label>
              <input type="password" defaultValue="password123" className="profile_input" />
            </div>
          </div>

          <div className="profile_form_row">
            <div className="profile_form_group">
              <label className="profile_form_label">Database</label>
              <input type="text" defaultValue="Muarif Rahman" className="profile_input" />
            </div>
          </div>

          <div className="profile_form_row">
            <div className="profile_form_group">
              <label className="profile_form_label">Port No</label>
              <input type="text" defaultValue="Required" className="profile_input" />
            </div>
          </div>

          <div className="profile_form_row">
            <div className="profile_form_group">
              <label className="profile_form_label">Port No</label>
              <input type="text" defaultValue="Microsoft XPS Documents Writer" className="profile_input" />
            </div>
          </div>
        </div>

        <div className="profile_right_section">
          <div className="profile_table_section">
            <table className="profile_table">
              <tbody>
                <tr className="profile_table_row">
                  <td className="profile_table_cell">Bill copies</td>
                  <td className="profile_table_cell">1</td>
                  <td className="profile_table_cell">Breast Fast</td>
                  <td className="profile_table_cell">11:50:00</td>
                  <td className="profile_table_cell">
                    <button className="profile_sort_btn">⇅</button>
                  </td>
                </tr>
                <tr className="profile_table_row">
                  <td className="profile_table_cell">Kot copies</td>
                  <td className="profile_table_cell">1</td>
                  <td className="profile_table_cell">Lunch</td>
                  <td className="profile_table_cell">11:50:00</td>
                  <td className="profile_table_cell">
                    <button className="profile_sort_btn">⇅</button>
                  </td>
                </tr>
                <tr className="profile_table_row">
                  <td className="profile_table_cell">Kot copies</td>
                  <td className="profile_table_cell">1</td>
                  <td className="profile_table_cell">Breast Fast</td>
                  <td className="profile_table_cell">11:50:00</td>
                  <td className="profile_table_cell">
                    <button className="profile_sort_btn">⇅</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="profile_actions">
        <button className="profile_save_btn">Save</button>
        <button className="profile_update_btn">Update</button>
      </div>
    </div>
  );

  const renderLayoutConfiguration = () => (
    <div className="profile_content">
      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Layout Type</label>
          <input type="text" placeholder="Enter layout type" className="profile_input" />
        </div>
      </div>
      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Theme</label>
          <input type="text" placeholder="Select theme" className="profile_input" />
        </div>
      </div>
      <div className="profile_actions">
        <button className="profile_save_btn">Save</button>
        <button className="profile_update_btn">Update</button>
      </div>
    </div>
  );

  const renderUserMaster = () => (
    <div className="profile_content">
      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Username</label>
          <input type="text" placeholder="Enter username" className="profile_input" />
        </div>
      </div>
      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">User Role</label>
          <input type="text" placeholder="Enter user role" className="profile_input" />
        </div>
      </div>
      <div className="profile_actions">
        <button className="profile_save_btn">Save</button>
        <button className="profile_update_btn">Update</button>
      </div>
    </div>
  );

  const renderCompanyDetails = () => (
    <div className="profile_content">
      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Company Name</label>
          <input type="text" placeholder="Enter company name" className="profile_input" />
        </div>
      </div>
      <div className="profile_form_row">
        <div className="profile_form_group">
          <label className="profile_form_label">Company Address</label>
          <input type="text" placeholder="Enter company address" className="profile_input" />
        </div>
      </div>
      <div className="profile_actions">
        <button className="profile_save_btn">Save</button>
        <button className="profile_update_btn">Update</button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'database':
        return renderDatabaseSettings();
      case 'layout':
        return renderLayoutConfiguration();
      case 'user':
        return renderUserMaster();
      case 'company':
        return renderCompanyDetails();
      default:
        return renderDatabaseSettings();
    }
  };

  return (
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
            <p className="profile_value">2972 Westheimer Rd,<br />Santa ana, Illinois 85486</p>
          </div>
        </div>

        <button className="profile_logout_btn" onClick={handleLogout}>
          <span className="profile_logout_icon">↪</span> Log out
        </button>
      </div>

      <div className="profile_main">
        <div className="profile_tabs">
          <button 
            className={`profile_tab ${activeTab === 'database' ? 'profile_tab_active' : ''}`}
            onClick={() => setActiveTab('database')}
          >
            Database Settings
          </button>
          <button 
            className={`profile_tab ${activeTab === 'layout' ? 'profile_tab_active' : ''}`}
            onClick={() => setActiveTab('layout')}
          >
            Layout Configuration
          </button>
          <button 
            className={`profile_tab ${activeTab === 'user' ? 'profile_tab_active' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            User Master
          </button>
          <button 
            className={`profile_tab ${activeTab === 'company' ? 'profile_tab_active' : ''}`}
            onClick={() => setActiveTab('company')}
          >
            Company Details
          </button>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfilePage;