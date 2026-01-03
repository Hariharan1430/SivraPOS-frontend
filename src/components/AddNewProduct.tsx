import React, { useState, useEffect } from 'react';
import '../styles/addNewProduct.css';

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

interface AddNewProductProps {
  onClose: () => void;
  onAdd: (product: ProductItem) => void;
}

const AddNewProduct: React.FC<AddNewProductProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState<ProductItem>({
    id: '',
    name: '',
    image: '',
    category: 'Coffee',
    sku: '',
    status: 'active',
    price: 0,
    description: '',
    costPrice: 0,
    taxPercentage: 0,
    quantity: 0,
    unit: 'Pcs',
    minQuantity: 0,
    maxQuantity: 100,
    trackQuantity: false,
    barcode: '',
    tags: '',
  });

  const [imagePreview, setImagePreview] = useState<string>('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iMTIiIGZpbGw9IiNGNUY1RjUiLz4KPHBhdGggZD0iTTYwIDgwSDY0MEgxNDBWMTIwSDYwVjgwWiIgZmlsbD0iI0NDQyIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjgiIGZpbGw9IiM5OTkiLz4KPC9zdmc+');
  const [categories, setCategories] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadCategories();
    generateId();
    generateSKU();
  }, []);

  const loadCategories = () => {
    const savedCategories = localStorage.getItem('productCategories');
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories);
        const categoryNames = parsed
          .filter((cat: any) => !cat.deleted)
          .map((cat: any) => cat.name);
        setCategories(categoryNames);
      } catch (error) {
        setCategories(['Coffee', 'Dessert', 'Ice Cream', 'Juice', 'Snack']);
      }
    } else {
      setCategories(['Coffee', 'Dessert', 'Ice Cream', 'Juice', 'Snack']);
    }
  };

  const generateId = () => {
    const savedProducts = localStorage.getItem('products');
    let maxId = 0;
    
    if (savedProducts) {
      try {
        const products = JSON.parse(savedProducts);
        products.forEach((product: ProductItem) => {
          const numId = parseInt(product.id);
          if (!isNaN(numId) && numId > maxId) {
            maxId = numId;
          }
        });
      } catch (error) {
        console.error('Error parsing products:', error);
      }
    }
    
    const newId = (maxId + 1).toString();
    setFormData(prev => ({ ...prev, id: newId }));
  };

  const generateSKU = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    const sku = `SKU-${random}${timestamp}`;
    setFormData(prev => ({ ...prev, sku }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }

    if (!formData.costPrice || formData.costPrice <= 0) {
      newErrors.costPrice = 'Cost price must be greater than 0';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.price && formData.costPrice && formData.price < formData.costPrice) {
      newErrors.price = 'Price should be greater than or equal to cost price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iMTIiIGZpbGw9IiNGNUY1RjUiLz4KPHBhdGggZD0iTTYwIDgwSDY0MEgxNDBWMTIwSDYwVjgwWiIgZmlsbD0iI0NDQyIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjgiIGZpbGw9IiM5OTkiLz4KPC9zdmc+';
    setImagePreview(defaultImage);
    setFormData(prev => ({ ...prev, image: defaultImage }));
  };

  const handleAdd = () => {
    if (!validateForm()) {
      alert('Please fill in all required fields correctly');
      return;
    }

    const savedProducts = localStorage.getItem('products');
    let products: ProductItem[] = [];
    
    if (savedProducts) {
      products = JSON.parse(savedProducts);
    }
    
    // Check if SKU already exists
    const skuExists = products.some(p => p.sku === formData.sku);
    if (skuExists) {
      setErrors(prev => ({ ...prev, sku: 'SKU already exists' }));
      alert('SKU already exists. Please use a different SKU.');
      return;
    }

    // Add the new product
    products.push(formData);
    
    localStorage.setItem('products', JSON.stringify(products));
    
    // Notify other components
    window.dispatchEvent(new CustomEvent('productsUpdated', {
      detail: { products }
    }));
    
    onAdd(formData);
    onClose();
  };

  const handleCancel = () => {
    if (formData.name || formData.description || formData.price > 0) {
      if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <div className="addnewproduct_page">
      {/* Header */}
      <div className="addnewproduct_header">
        <button className="addnewproduct_back_button" onClick={handleCancel}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Add New Product</span>
        </button>
      </div>

      {/* Content */}
      <div className="addnewproduct_content">
        {/* Top Row: Basic Info & Product Image */}
        <div className="addnewproduct_row_top">
          {/* Basic Information */}
          <div className="addnewproduct_card">
            <div className="addnewproduct_card_header">
              <div className="addnewproduct_header_icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V15C5 16.1046 5.89543 17 7 17H13C14.1046 17 15 16.1046 15 15V7C15 5.89543 14.1046 5 13 5H11M9 5V3H11V5M9 5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Basic Information</h3>
            </div>
            <div className="addnewproduct_card_body">
              <div className="addnewproduct_input_group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="addnewproduct_error_text">{errors.name}</span>}
              </div>
              <div className="addnewproduct_input_group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={2}
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <span className="addnewproduct_error_text">{errors.description}</span>}
              </div>
              <div className="addnewproduct_input_group">
                <label>SKU (Stock Keeping Unit) *</label>
                <div className="addnewproduct_sku_wrapper">
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="Enter SKU"
                    className={errors.sku ? 'error' : ''}
                  />
                  <button 
                    type="button" 
                    className="addnewproduct_generate_sku_btn"
                    onClick={generateSKU}
                    title="Generate new SKU"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13 3L3 13M3 3L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 1V3M8 13V15M1 8H3M13 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                {errors.sku && <span className="addnewproduct_error_text">{errors.sku}</span>}
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="addnewproduct_card">
            <div className="addnewproduct_card_header">
              <div className="addnewproduct_header_icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Product Image</h3>
            </div>
            <div className="addnewproduct_card_body">
              <label className="addnewproduct_image_label">Product Image</label>
              <div className="addnewproduct_image_container">
                <img src={imagePreview} alt="Product Preview" className="addnewproduct_product_img" />
                {formData.image && (
                  <button className="addnewproduct_remove_img_btn" onClick={handleRemoveImage} type="button">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4L12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
              <div className="addnewproduct_image_actions">
                <label className="addnewproduct_btn_upload">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M9 12V4M9 4L6 7M9 4L12 7M3 14H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Upload Image
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
                <button className="addnewproduct_btn_ai" type="button">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1L11 7L17 9L11 11L9 17L7 11L1 9L7 7L9 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Generate with AI
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: Pricing & Inventory */}
        <div className="addnewproduct_row_middle">
          {/* Pricing & Tax */}
          <div className="addnewproduct_card">
            <div className="addnewproduct_card_header">
              <div className="addnewproduct_header_icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M12 8C12 9.10457 11.1046 10 10 10C8.89543 10 8 9.10457 8 8C8 6.89543 8.89543 6 10 6C11.1046 6 12 6.89543 12 8Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3>Pricing & Tax</h3>
            </div>
            <div className="addnewproduct_card_body">
              <div className="addnewproduct_input_row">
                <div className="addnewproduct_input_group">
                  <label>Cost Price *</label>
                  <input
                    type="number"
                    name="costPrice"
                    value={formData.costPrice || ''}
                    onChange={handleInputChange}
                    step="0.01"
                    placeholder="0.00"
                    className={errors.costPrice ? 'error' : ''}
                  />
                  {errors.costPrice && <span className="addnewproduct_error_text">{errors.costPrice}</span>}
                </div>
                <div className="addnewproduct_input_group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleInputChange}
                    step="0.01"
                    placeholder="0.00"
                    className={errors.price ? 'error' : ''}
                  />
                  {errors.price && <span className="addnewproduct_error_text">{errors.price}</span>}
                </div>
              </div>
              <div className="addnewproduct_input_group">
                <label>Tax Percentage (%)</label>
                <input
                  type="number"
                  name="taxPercentage"
                  value={formData.taxPercentage || ''}
                  onChange={handleInputChange}
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Inventory Management */}
          <div className="addnewproduct_card">
            <div className="addnewproduct_card_header">
              <div className="addnewproduct_header_icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M5 8H15M5 12H15M3 4H17C18.1046 4 19 4.89543 19 6V14C19 15.1046 18.1046 16 17 16H3C1.89543 16 1 15.1046 1 14V6C1 4.89543 1.89543 4 3 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Inventory Management</h3>
            </div>
            <div className="addnewproduct_card_body">
              <div className="addnewproduct_input_row">
                <div className="addnewproduct_input_group">
                  <label>Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity || ''}
                    onChange={handleInputChange}
                    placeholder="0.000"
                    step="0.001"
                  />
                </div>
                <div className="addnewproduct_input_group">
                  <label>Unit *</label>
                  <select name="unit" value={formData.unit} onChange={handleInputChange}>
                    <option value="Pcs">Pcs</option>
                    <option value="Kg">Kg</option>
                    <option value="L">L</option>
                    <option value="Box">Box</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className="addnewproduct_input_row">
                <div className="addnewproduct_input_group">
                  <label>Min Quantity *</label>
                  <input
                    type="number"
                    name="minQuantity"
                    value={formData.minQuantity || ''}
                    onChange={handleInputChange}
                    placeholder="0.000"
                    step="0.001"
                  />
                </div>
                <div className="addnewproduct_input_group">
                  <label>Max Quantity *</label>
                  <input
                    type="number"
                    name="maxQuantity"
                    value={formData.maxQuantity || ''}
                    onChange={handleInputChange}
                    placeholder="100.000"
                    step="0.001"
                  />
                </div>
              </div>
              <div className="addnewproduct_track_toggle">
                <div className="addnewproduct_toggle_text">
                  <span className="addnewproduct_toggle_title">Track Quantity</span>
                  <span className="addnewproduct_toggle_desc">Monitor stock levels automatically</span>
                </div>
                <label className="addnewproduct_switch">
                  <input
                    type="checkbox"
                    name="trackQuantity"
                    checked={formData.trackQuantity}
                    onChange={handleInputChange}
                  />
                  <span className="addnewproduct_slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Product Details */}
        <div className="addnewproduct_row_bottom">
          <div className="addnewproduct_card">
            <div className="addnewproduct_card_header">
              <div className="addnewproduct_header_icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V15C5 16.1046 5.89543 17 7 17H13C14.1046 17 15 16.1046 15 15V7C15 5.89543 14.1046 5 13 5H11M9 5V3H11V5M9 5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Product Details</h3>
            </div>
            <div className="addnewproduct_card_body">
              <div className="addnewproduct_details_grid">
                <div className="addnewproduct_input_group addnewproduct_barcode_full">
                  <label>Barcode</label>
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    placeholder="Enter barcode"
                  />
                </div>
                <div className="addnewproduct_input_group">
                  <label>Category *</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="addnewproduct_input_group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="addnewproduct_input_group addnewproduct_tags_full">
                  <label>Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="comma, separated, tags"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="addnewproduct_actions">
          <button className="addnewproduct_btn_cancel" onClick={handleCancel} type="button">
            Cancel
          </button>
          <button className="addnewproduct_btn_add" onClick={handleAdd} type="button">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;