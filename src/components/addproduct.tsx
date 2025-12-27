import React, { useState, useEffect } from 'react';
import '../styles/addproduct.css';

// Import your local icon images here
 import BackIcon from '../assests/left-arrow.png';
import EditIcon from '../assests/editing.png';
import DeleteIcon from '../assests/delete.png';
// import SearchIcon from '../assests/search-icon.png';
// import AddIcon from '../assests/add-icon.png';

interface Category {
  id: number;
  name: string;
  color: string;
  initial: string;
  deleted?: boolean;
}

interface ProductCategoriesProps {
  onCategoriesUpdate?: (categories: Category[]) => void;
  onNavigateBack?: () => void;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({ onCategoriesUpdate, onNavigateBack }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Color palette for category avatars
  const colors = ['#4CAF50', '#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94'];

  // Load categories from localStorage on mount
  useEffect(() => {
    const savedCategories = localStorage.getItem('productCategories');
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories);
        setCategories(parsed);
      } catch (error) {
        console.error('Error loading categories:', error);
        initializeDefaultCategories();
      }
    } else {
      initializeDefaultCategories();
    }
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('productCategories', JSON.stringify(categories));
      
      // Notify parent component with only active (non-deleted) categories
      if (onCategoriesUpdate) {
        const activeCategories = categories.filter(cat => !cat.deleted);
        onCategoriesUpdate(activeCategories);
      }
      
      // Dispatch custom event for menu to listen to
      window.dispatchEvent(new CustomEvent('categoriesUpdated', { 
        detail: categories.filter(cat => !cat.deleted)
      }));
    }
  }, [categories, onCategoriesUpdate]);

  const initializeDefaultCategories = () => {
    const defaultCategories: Category[] = [
      { id: 1, name: 'Coffee', color: '#4CAF50', initial: 'C', deleted: false },
      { id: 2, name: 'Dessert', color: '#FF6B6B', initial: 'D', deleted: false },
      { id: 3, name: 'Ice Cream', color: '#4ECDC4', initial: 'I', deleted: false },
      { id: 4, name: 'Juice', color: '#FFE66D', initial: 'J', deleted: false },
      { id: 5, name: 'Snack', color: '#A8E6CF', initial: 'S', deleted: false },
    ];
    setCategories(defaultCategories);
    localStorage.setItem('productCategories', JSON.stringify(defaultCategories));
  };

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const showSuccessPopup = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessPopupOpen(true);
    setTimeout(() => {
      setIsSuccessPopupOpen(false);
    }, 2000);
  };

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      setErrorMessage('Please enter a category name');
      return;
    }

    // Check for duplicate names (excluding deleted categories)
    const activeCategories = categories.filter(cat => !cat.deleted);
    if (activeCategories.some(cat => cat.name.toLowerCase() === categoryName.trim().toLowerCase())) {
      setErrorMessage('A category with this name already exists');
      return;
    }

    const newCategory: Category = {
      id: Date.now(),
      name: categoryName.trim(),
      color: getRandomColor(),
      initial: categoryName.trim().charAt(0).toUpperCase(),
      deleted: false,
    };

    setCategories([...categories, newCategory]);
    setCategoryName('');
    setErrorMessage('');
    setIsAddModalOpen(false);
    showSuccessPopup(`Category "${newCategory.name}" added successfully!`);
  };

  const handleEditCategory = () => {
    if (!categoryName.trim() || !editingCategory) {
      setErrorMessage('Please enter a category name');
      return;
    }

    // Check for duplicate names (excluding current category and deleted categories)
    const activeCategories = categories.filter(cat => !cat.deleted);
    if (activeCategories.some(cat => 
      cat.id !== editingCategory.id && 
      cat.name.toLowerCase() === categoryName.trim().toLowerCase()
    )) {
      setErrorMessage('A category with this name already exists');
      return;
    }

    const updatedCategories = categories.map(cat =>
      cat.id === editingCategory.id
        ? { ...cat, name: categoryName.trim(), initial: categoryName.trim().charAt(0).toUpperCase() }
        : cat
    );

    setCategories(updatedCategories);
    setCategoryName('');
    setErrorMessage('');
    setEditingCategory(null);
    setIsEditModalOpen(false);
    showSuccessPopup(`Category updated successfully!`);
  };

  const openDeleteConfirm = (category: Category) => {
    setDeletingCategory(category);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deletingCategory) return;

    // Soft delete - just mark as deleted
    const updatedCategories = categories.map(cat =>
      cat.id === deletingCategory.id ? { ...cat, deleted: true } : cat
    );
    setCategories(updatedCategories);
    
    const categoryName = deletingCategory.name;
    setIsDeleteConfirmOpen(false);
    setDeletingCategory(null);
    showSuccessPopup(`Category "${categoryName}" deleted successfully!`);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setDeletingCategory(null);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setErrorMessage('');
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCategoryName('');
    setEditingCategory(null);
    setErrorMessage('');
  };

  const handleBackClick = () => {
    // If parent provides navigation handler, use it
    if (onNavigateBack) {
      onNavigateBack();
    } else {
      // Otherwise try to go back in history
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/menu';
      }
    }
  };

  // Filter out deleted categories and apply search
  const filteredCategories = categories
    .filter(cat => !cat.deleted)
    .filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="addproduct-container">
      {/* Header */}
      <div className="addproduct-header">
        <button className="addproduct-back-btn" onClick={handleBackClick}>
          <img src={BackIcon} alt="Edit" className="addproduct-icon-small" /> 
        </button>
        <h1 className="addproduct-title">Product Categories</h1>
      </div>

      {/* Search and Add Section */}
      <div className="addproduct-controls">
        <div className="addproduct-search-wrapper">
          <input
            type="text"
            className="addproduct-search-input"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="addproduct-search-icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#4F567B" strokeWidth="1.4"/>
              <path d="M17.5 17.5L13.875 13.875" stroke="#4F567B" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <button className="addproduct-add-btn" onClick={() => setIsAddModalOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add
        </button>
      </div>

      {/* Categories List */}
      <div className="addproduct-list">
        {filteredCategories.length === 0 ? (
          <div className="addproduct-empty-state">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#E5E7EB" strokeWidth="2"/>
              <path d="M32 20V44M20 32H44" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="addproduct-empty-title">No categories found</p>
            <span className="addproduct-empty-subtitle">Add your first category to get started</span>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} className="addproduct-item">
              <div className="addproduct-item-info">
                <div className="addproduct-avatar" style={{ backgroundColor: category.color }}>
                  {category.initial}
                </div>
                <span className="addproduct-item-name">{category.name}</span>
              </div>
              <div className="addproduct-actions">
                <button
                  className="addproduct-edit-btn"
                  onClick={() => openEditModal(category)}
                  aria-label="Edit category"
                >
                  <img src={EditIcon} alt="Edit" className="addproduct-icon-small" /> 
                </button>
                <button
                  className="addproduct-delete-btn"
                  onClick={() => openDeleteConfirm(category)}
                  aria-label="Delete category"
                >
                 <img src={DeleteIcon} alt="Edit" className="addproduct-icon-small" /> 
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="addproduct-modal-overlay" onClick={closeModals}>
          <div className="addproduct-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="addproduct-modal-header">
              <h2 className="addproduct-modal-title">Add Category</h2>
              <button className="addproduct-modal-close-btn" onClick={closeModals}>
                ✕
              </button>
            </div>
            <div className="addproduct-modal-body">
              <label className="addproduct-modal-label">Category Name</label>
              <input
                type="text"
                className="addproduct-modal-input"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                autoFocus
              />
              {errorMessage && <p className="addproduct-error-message">{errorMessage}</p>}
            </div>
            <button className="addproduct-modal-submit-btn" onClick={handleAddCategory}>
              Add Category
            </button>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div className="addproduct-modal-overlay" onClick={closeModals}>
          <div className="addproduct-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="addproduct-modal-header">
              <h2 className="addproduct-modal-title">Edit Category</h2>
              <button className="addproduct-modal-close-btn" onClick={closeModals}>
                ✕
              </button>
            </div>
            <div className="addproduct-modal-body">
              <label className="addproduct-modal-label">Category Name</label>
              <input
                type="text"
                className="addproduct-modal-input"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEditCategory()}
                autoFocus
              />
              {errorMessage && <p className="addproduct-error-message">{errorMessage}</p>}
            </div>
            <button className="addproduct-modal-submit-btn" onClick={handleEditCategory}>
              Update
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteConfirmOpen && deletingCategory && (
        <div className="addproduct-confirm-overlay">
          <div className="addproduct-confirm-dialog">
            <h2 className="addproduct-confirm-title">Sivra POS</h2>
            <p className="addproduct-confirm-message">
              Are you sure you want to delete "{deletingCategory.name}"?
            </p>
            <div className="addproduct-confirm-actions">
              <button 
                className="addproduct-confirm-btn addproduct-confirm-cancel"
                onClick={handleCancelDelete}
              >
                CANCEL
              </button>
              <button 
                className="addproduct-confirm-btn addproduct-confirm-ok"
                onClick={handleConfirmDelete}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {isSuccessPopupOpen && (
        <div className="addproduct-success-popup">
          <div className="addproduct-success-content">
            <svg className="addproduct-success-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="addproduct-success-message">{successMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategories;