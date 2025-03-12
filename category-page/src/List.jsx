import React from "react";
import "./List.css";

const transactions = [
  { category: "Interiors", transactions: "08 transactions", percentage: "32%", amount: "₹27,800", icon: "🛋️" },
  { category: "Foundation", transactions: "02 transactions", percentage: "12%", amount: "₹11,17,800", icon: "🏗️" },
  { category: "Flooring", transactions: "02 transactions", percentage: "20%", amount: "₹8,17,214", icon: "🧱" },
  { category: "Structure", transactions: "08 transactions", percentage: "32%", amount: "₹27,800", icon: "🏠" },
  { category: "Brick work", transactions: "02 transactions", percentage: "20%", amount: "₹8,17,214", icon: "🚧" },
  { category: "Labour", transactions: "02 transactions", percentage: "12%", amount: "₹17,800", icon: "👷" },
  { category: "Others", transactions: "02 transactions", percentage: "12%", amount: "₹7,230", icon: "🔧" },
  { category: "Interiors", transactions: "08 transactions", percentage: "32%", amount: "₹27,800", icon: "🛋️" },
  { category: "Foundation", transactions: "02 transactions", percentage: "12%", amount: "₹11,17,800", icon: "🏗️" },
  { category: "Flooring", transactions: "02 transactions", percentage: "20%", amount: "₹8,17,214", icon: "🧱" },
  { category: "Foundation", transactions: "02 transactions", percentage: "12%", amount: "₹11,17,800", icon: "🏗️" },
  { category: "Structure", transactions: "08 transactions", percentage: "32%", amount: "₹27,800", icon: "🏠" },
];

const List = () => {
  return (
    <div className="transaction-list">
      {transactions.map((item, index) => (
        <div className="transaction-card" key={index}>
          <div className="icon">{item.icon}</div>
          <div className="details">
            <h3>{item.category}</h3>
          </div>
          <p className="transactions">{item.transactions}</p>
          <p className="percentage">{item.percentage}</p>
          <p className="amount">{item.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
