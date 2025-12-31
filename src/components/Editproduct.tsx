import React, { useState, useEffect } from 'react';
import '../styles/editproduct.css';

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

interface EditProductProps {
  product: ProductItem;
  onClose: () => void;
  onUpdate: (product: ProductItem) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<ProductItem>({
    ...product,
    description: product.description || '',
    costPrice: product.costPrice || 0,
    taxPercentage: product.taxPercentage || 0,
    quantity: product.quantity || 0,
    unit: product.unit || 'No',
    minQuantity: product.minQuantity || 0,
    maxQuantity: product.maxQuantity || 100,
    trackQuantity: product.trackQuantity || false,
    barcode: product.barcode || '',
    tags: product.tags || '',
  });

  const [imagePreview, setImagePreview] = useState<string>(product.image);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadCategories();
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
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

  const handleUpdate = () => {
    const savedProducts = localStorage.getItem('products');
    let products: ProductItem[] = [];
    
    if (savedProducts) {
      products = JSON.parse(savedProducts);
    }
    
    const updatedProducts = products.map(p => 
      p.id === formData.id ? formData : p
    );
    
    if (!products.find(p => p.id === formData.id)) {
      updatedProducts.push(formData);
    }
    
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    window.dispatchEvent(new CustomEvent('productsUpdated', {
      detail: { products: updatedProducts }
    }));
    
    onUpdate(formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="editproduct_page">
      {/* Header */}
      <div className="editproduct_header">
        <button className="editproduct_back_button" onClick={handleCancel}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Edit Product</span>
        </button>
      </div>

      {/* Content */}
      <div className="editproduct_content">
        {/* Top Row: Basic Info & Product Image */}
        <div className="editproduct_row_top">
          {/* Basic Information */}
          <div className="editproduct_card">
            <div className="editproduct_card_header">
              <div className="editproduct_header_icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V15C5 16.1046 5.89543 17 7 17H13C14.1046 17 15 16.1046 15 15V7C15 5.89543 14.1046 5 13 5H11M9 5V3H11V5M9 5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Basic Information</h3>
            </div>
            <div className="editproduct_card_body">
              <div className="editproduct_input_group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </div>
              <div className="editproduct_input_group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={2}
                />
              </div>
              <div className="editproduct_input_group">
                <label>SKU (Stock Keeping Unit) *</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="Enter SKU"
                />
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="editproduct_card">
            <div className="editproduct_card_header">
              <div className="editproduct_header_icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Product Image</h3>
            </div>
            <div className="editproduct_card_body">
              <label className="editproduct_image_label">Product Image</label>
              <div className="editproduct_image_container">
                <img src={imagePreview} alt="Product" className="editproduct_product_img" />
                <button className="editproduct_remove_img_btn" onClick={handleRemoveImage} type="button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="editproduct_image_actions">
                <label className="editproduct_btn_upload">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M9 12V4M9 4L6 7M9 4L12 7M3 14H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Upload Image
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
                <button className="editproduct_btn_ai" type="button">
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
        <div className="editproduct_row_middle">
          {/* Pricing & Tax */}
          <div className="editproduct_card">
            <div className="editproduct_card_header">
              <div className="editproduct_header_icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M12 8C12 9.10457 11.1046 10 10 10C8.89543 10 8 9.10457 8 8C8 6.89543 8.89543 6 10 6C11.1046 6 12 6.89543 12 8Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3>Pricing & Tax</h3>
            </div>
            <div className="editproduct_card_body">
              <div className="editproduct_input_row">
                <div className="editproduct_input_group">
                  <label>Cost Price *</label>
                  <input
                    type="number"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="editproduct_input_group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="editproduct_input_group">
                <label>Tax Percentage (%)</label>
                <input
                  type="number"
                  name="taxPercentage"
                  value={formData.taxPercentage}
                  onChange={handleInputChange}
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Inventory Management */}
          <div className="editproduct_card">
            <div className="editproduct_card_header">
              <div className="editproduct_header_icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M5 8H15M5 12H15M3 4H17C18.1046 4 19 4.89543 19 6V14C19 15.1046 18.1046 16 17 16H3C1.89543 16 1 15.1046 1 14V6C1 4.89543 1.89543 4 3 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Inventory Management</h3>
            </div>
            <div className="editproduct_card_body">
              <div className="editproduct_input_row">
                <div className="editproduct_input_group">
                  <label>Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="0.000"
                    step="0.001"
                  />
                </div>
                <div className="editproduct_input_group">
                  <label>Unit *</label>
                  <select name="unit" value={formData.unit} onChange={handleInputChange}>
                    <option value="No">No</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Kg">Kg</option>
                    <option value="L">L</option>
                    <option value="Box">Box</option>
                  </select>
                </div>
              </div>
              <div className="editproduct_input_row">
                <div className="editproduct_input_group">
                  <label>Min Quantity *</label>
                  <input
                    type="number"
                    name="minQuantity"
                    value={formData.minQuantity}
                    onChange={handleInputChange}
                    placeholder="0.000"
                    step="0.001"
                  />
                </div>
                <div className="editproduct_input_group">
                  <label>Max Quantity *</label>
                  <input
                    type="number"
                    name="maxQuantity"
                    value={formData.maxQuantity}
                    onChange={handleInputChange}
                    placeholder="100.000"
                    step="0.001"
                  />
                </div>
              </div>
              <div className="editproduct_track_toggle">
                <div className="editproduct_toggle_text">
                  <span className="editproduct_toggle_title">Track Quantity</span>
                  <span className="editproduct_toggle_desc">Monitor stock levels automatically</span>
                </div>
                <label className="editproduct_switch">
                  <input
                    type="checkbox"
                    name="trackQuantity"
                    checked={formData.trackQuantity}
                    onChange={handleInputChange}
                  />
                  <span className="editproduct_slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Product Details */}
        <div className="editproduct_row_bottom">
          <div className="editproduct_card">
            <div className="editproduct_card_header">
              <div className="editproduct_header_icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V15C5 16.1046 5.89543 17 7 17H13C14.1046 17 15 16.1046 15 15V7C15 5.89543 14.1046 5 13 5H11M9 5V3H11V5M9 5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Product Details</h3>
            </div>
            <div className="editproduct_card_body">
              <div className="editproduct_details_grid">
                <div className="editproduct_input_group editproduct_barcode_full">
                  <label>Barcode</label>
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    placeholder="Enter barcode"
                  />
                </div>
                <div className="editproduct_input_group">
                  <label>Category *</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="editproduct_input_group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="editproduct_input_group editproduct_tags_full">
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
        <div className="editproduct_actions">
          <button className="editproduct_btn_cancel" onClick={handleCancel} type="button">
            Cancel
          </button>
          <button className="editproduct_btn_update" onClick={handleUpdate} type="button">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;