import React from "react";
import "./BudgetPopup.css";

const BudgetPopup = () => {
  return (
    <div className="overlay">
      <div className="popup">

      <div className="popup-header">
      <h3>Edit budget amount</h3>
          <button className="close-btn">✖</button>
        </div>
        
        <input type="text"  />
        <div className="buttons">
          <button className="cancel">Cancel</button>
          <button className="done">Done</button>
        </div>
      </div>
    </div>
  );
};

export default BudgetPopup;
