import React, { useState } from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

/**
 * A component for uploading and previewing profile images
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  touched,
  required = false,
}) => {
  // State for tracking drag events
  const [isDragging, setIsDragging] = useState(false);
  
  // Show error only if the field was touched and there is an error
  const showError = touched && error;

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fileInput = document.getElementById(id) as HTMLInputElement;
      
      if (fileInput) {
        // Create a data transfer to programmatically set the file input value
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
        
        // Trigger the change event handler
        const event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="image-upload">
      <label htmlFor={id} className="image-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      
      <div
        className={`upload-area ${isDragging ? 'dragging' : ''} ${showError ? 'upload-error' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="preview-container">
            <img src={value} alt="Profile preview" className="image-preview" />
            <div className="overlay">
              <span>Click or drag to change</span>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Click or drag image here</span>
          </div>
        )}
        
        <input
          id={id}
          name={name}
          type="file"
          onChange={onChange}
          accept="image/*"
          className="file-input"
          required={required}
        />
      </div>
      
      {showError && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ImageUpload;
