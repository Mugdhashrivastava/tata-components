import React, { useState } from "react";
import "./ExpenseForm.css";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";

const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    name: "Light Bulbs",
    amount: "₹7,800",
    category: "Electric work",
    markAs: "Labour",
    provider: {
      name: "Naresh Bhai",
      address: "Shops in Location, 414601",
      phone: "9822091859",
    },
    date: new Date("2024-12-31"),
    photos: ["/images/light1.jpg", "/images/light2.jpg"],
  });

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newPhotos = [...expense.photos, URL.createObjectURL(files[0])];
    setExpense({ ...expense, photos: newPhotos });
  };

  return (
    <div className="expense-form-container">
      <h2 className="header">Expense Details</h2>
      <div className="form-group">
        <label>Expense name</label>
        <input type="text" value={expense.name} readOnly />
      </div>
      <div className="form-group">
        <label>Amount</label>
        <input type="text" value={expense.amount} readOnly />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select>
          <option>Electric work</option>
          <option>Plumbing</option>
        </select>
      </div>
      <div className="form-group">
        <label>Mark as</label>
        <div className="button-group">
          {['Material', 'Labour', 'Other'].map((type) => (
            <button
              key={type}
              className={expense.markAs === type ? "selected" : ""}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="provider-card">
        <h4>Service Provider</h4>
        <p>{expense.provider.name}</p>
        <p>{expense.provider.address}</p>
        <p className="phone">{expense.provider.phone}</p>
      </div>
      <div className="form-group">
        <label>Expense Date</label>
        <div className="date-display">
          <CalendarIcon className="icon" />
          <span>{format(expense.date, "dd MMM yyyy")}</span>
        </div>
      </div>
      <div className="form-group">
        <label>Reference Photos</label>
        <div className="photo-gallery">
          {expense.photos.map((photo, index) => (
            <img key={index} src={photo} alt="" className="photo" />
          ))}
          <label className="upload-btn">
            <Upload className="icon" />
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
      </div>
      <div className="action-buttons">
        <button className="cancel">Cancel</button>
        <button className="save">Save</button>
      </div>
    </div>
  );
};

export default ExpenseForm;
