import React from "react";
import "./ExpenseList.css";

const expenses = [
  {
    date: "2nd January",
    year: 2025,
    total: "₹1,17,47,000",
    items: [
      { title: "Lights from Dubai", category: "Interiors", amount: "₹27,800", date: "20th Dec 2024" },
      { title: "Kitchen furnishing...", category: "Interiors", amount: "₹11,17,800", date: "20th Dec 2024" },
      { title: "Bedroom painting...", category: "Interiors", amount: "₹8,17,214", date: "20th Dec 2024" },
      { title: "Structure", category: "Interiors", amount: "₹27,800", date: "20th Dec 2024" },
      { title: "Lights from Dubai", category: "Interiors", amount: "₹27,800", date: "20th Dec 2024" },
    ],
  },
  {
    date: "3rd January",
    year: 2025,
    total: "₹1,17,47,000",
    items: [
      { title: "Lights from Dubai", category: "Interiors", amount: "₹27,800", date: "20th Dec 2024" },
      { title: "Kitchen furnishing...", category: "Interiors", amount: "₹11,17,800", date: "20th Dec 2024" },
    ],
  },
];

const ExpenseList = () => {
  return (
    <div className="expense-list-container">
      {expenses.map((day, index) => (
        <div key={index} className="expense-day">
          <div className="expense-date">{day.year} <span>{day.date}</span></div>
          <div className="expense-total">{day.total}</div>
          {day.items.map((item, idx) => (
            <div key={idx} className="expense-item">
              <div className="expense-item-title">{item.title}</div>
              <div className="expense-item-details">
                <span>{item.category}</span>
                <span>{item.date}</span>
                <span>{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
