import React from "react";
import "./BudgetPopup.css";

const BudgetPopup = () => {
  return (
    <div className="overlay">
      <div className="popup">
        <h3>Edit budget amount</h3>
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
