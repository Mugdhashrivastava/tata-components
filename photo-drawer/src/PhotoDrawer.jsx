import React, { useState } from "react";
import "./PhotoDrawer.css";

const PhotoDrawer = ({ isOpen, onClose }) => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handleImageDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className={`drawer-overlay ${isOpen ? "open" : ""}`}>
      <div className="drawer">
        <div className="drawer-header">
          <span>Upload a photo</span>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <p className="drawer-subtext">
          Attach a reference photo, bill, invoice, or receipt.
        </p>
        <div className="uploaded-images">
          {images.map((image, index) => (
            <div key={index} className="image-preview">
              <img src={image} alt="Uploaded" />
              <button className="delete-btn" onClick={() => handleImageDelete(index)}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <label className="upload-box">
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} hidden />
          <div className="upload-content">
            <span className="upload-icon">📷</span>
            Upload photo
            <p>PNG, JPEG, PDF, or PPT. Max size: 5MB, up to 5 photos.</p>
          </div>
        </label>
        <div className="drawer-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default PhotoDrawer;
