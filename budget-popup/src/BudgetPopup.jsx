import React from "react";
import "./BudgetPopup.css";
import { useState } from "react";


const BudgetPopup = () => {
  const [inputValue, setInputValue] = useState("₹ 40,00,000");
  return (
    
    <div className="overlay">
      <div className="popup">

      <div className="popup-header">
      <h3 className="heading">Edit budget amount</h3>
          <button className="close-btn">✖</button>
        </div>
        
        <input type="text"  value={inputValue}
      onChange={(e) => setInputValue(e.target.value)} />
        <div className="buttons">
          <button className="cancel">Cancel</button>
          <button className="done">Done</button>
        </div>
      </div>
    </div>
  );
};

export default BudgetPopup;
