import React, { useState } from "react";
import "./ExpenseForm.css";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";

const ExpenseForm = ({ onClose }) => {
  const [expenseName, setExpenseName] = useState("Light Bulbs");
  const [amount, setAmount] = useState("₹7,800");
  const [category, setCategory] = useState("Electric work");
  const [markAs, setMarkAs] = useState("Labour");
  const [date, setDate] = useState("2024-12-31");
  const [photos, setPhotos] = useState([
    "https://via.placeholder.com/60",
    "https://via.placeholder.com/60",
  ]);

 
  const provider = {
    name: "Mr. John Doe",
    phone: "+91 9876543210",
    location: "Delhi, India",
  };

  const resetForm = () => {
    setExpenseName("");
    setAmount("");
    setCategory("");
    setMarkAs("");
    setDate("2024-12-31");
    setPhotos([]);
  };

  return (
    <div className="expense-form-container">
      <div className="header">
        <span>Expense Details</span>
        <span className="delete-expense" onClick={resetForm}>Delete expense</span>
      </div>

      <div className="form-group">
        <label>Expense name</label>
        <input value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Electric work</option>
          <option>Plumbing</option>
          <option>Carpentry</option>
        </select>
      </div>

      <div className="form-group">
        <label>Mark as</label>
        <div className="button-group">
          {["Material", "Labour", "Other"].map((item) => (
            <button
              key={item}
              className={markAs === item ? "selected" : ""}
              onClick={() => setMarkAs(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Expense date</label>
        <div className="date-picker">
          <CalendarIcon size={16} />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Service Provider Section */}
      <div className="provider-card">
        <h3>Service Provider</h3>
        <p><strong>Name:</strong> {provider.name}</p>
        <p><strong>Phone:</strong> {provider.phone}</p>
        <p><strong>Location:</strong> {provider.location}</p>
      </div>

      <div className="form-group">
        <label>Reference photo</label>
        <div className="photo-gallery">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt="Preview" className="photo" />
          ))}
          <div className="upload-btn">
            <Upload size={20} />
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="cancel" onClick={onClose}>Cancel</button>
        <button className="save">Save</button>
      </div>
    </div>
  );
};

export default ExpenseForm;
