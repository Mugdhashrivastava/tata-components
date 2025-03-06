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

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`drawer-overlay ${isOpen ? "open" : ""}`}>
      <div className="drawer">
        <div className="drawer-header">
          <h2>Dealer / Service provider</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

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

          <form>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            <label>Mobile number</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />

            <label>Shop, street, area</label>
            <input type="text" name="shop" value={formData.shop} onChange={handleChange} />

            <label>Location, sector, landmark</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />

            <label>Pincode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />

            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
          </form>
        </div>

        <div className="drawer-footer">
          <button className="back-btn">Back</button>
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
