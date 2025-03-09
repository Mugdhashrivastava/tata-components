import React, { useState } from "react";
import "./Drawer.css";

const Drawer = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "Ram Kumar",
    mobile: "9806765678",
    shop: "Agashi road",
    location: "Near dak bungalow campus",
    pincode: "400004",
    city: "Mumbai",
  });
  const [selectedType, setSelectedType] = useState("Dealer");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name = "Only alphabets allowed";
    }
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit number";
    }
    if (!/^[A-Za-z0-9 ]+$/.test(formData.shop)) {
      newErrors.shop = "Only alphanumeric characters allowed";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully");
    }
  };

  const handleBack = () => {
    onClose();
  };

  return (
    <div className={`drawer-overlay ${isOpen ? "open" : ""}`}>
      <div className="drawer">
        <div className="drawer-header">
          <h2>Dealer / Service provider</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <label className="top">Select type</label>
        <div className="drawer-body">
          <div className="toggle-buttons">
            <button 
              className={selectedType === "Dealer" ? "active" : ""} 
              onClick={() => setSelectedType("Dealer")}
            >
              Dealer
            </button>
            <button 
              className={selectedType === "Service provider" ? "active" : ""} 
              onClick={() => setSelectedType("Service provider")}
            >
              Service provider
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}

            <label>Mobile number</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
            {errors.mobile && <p className="error">{errors.mobile}</p>}

            <label>Shop, street, area</label>
            <input type="text" name="shop" value={formData.shop} onChange={handleChange} />
            {errors.shop && <p className="error">{errors.shop}</p>}

            <label>Location, sector, landmark</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />

            <label>Pincode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />

            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />

            <div className="drawer-footer">
              <button className="back-btn" type="button" onClick={handleBack}>Back</button>
              <button className="save-btn" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
