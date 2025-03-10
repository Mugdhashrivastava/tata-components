import React, { useState } from "react";

import "./ExpensePopup.css";

const ExpensePopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen && (
    <div className="overlay">
      <div className="popup">
      <div className="popup-header">
          <h3 className="heading">Reset Expense Diary</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
        </div>

        <p className="text">Are you sure you want to reset your Expense diary? This will delete all logs and data prmanently, and this action cannot be undone </p>
        <span className="small-text">Note: Resetting will erase all your budget settings, expense logs,and saved data.Proceed with caution</span>  
        <div className="buttons">
        <button className="cancel" onClick={() => setIsOpen(false)}>Cancel</button>
          <button className="done">Done</button>
        </div>
      </div>
    </div>
  );
};

export default ExpensePopup;
