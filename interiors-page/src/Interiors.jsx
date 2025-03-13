import React from "react";
import "./Interiors.css";
import { FaPlus } from "react-icons/fa"; // For the add expense button
import { FaRegLightbulb, FaBed, FaCouch, FaHome } from "react-icons/fa"; // Icons for categories

const Interiors = () => {
  const expenses = [
    { icon: <FaRegLightbulb />, name: "Lights from Dubai", amount: "₹27,800" },
    { icon: <FaCouch />, name: "Kitchen furnishing", amount: "₹11,17,800" },
    { icon: <FaBed />, name: "Bedroom painting", amount: "₹8,17,214" },
    { icon: <FaHome />, name: "Structure", amount: "₹27,800" },
    { icon: <FaRegLightbulb />, name: "Lights from Dubai", amount: "₹27,800" },
    { icon: <FaCouch />, name: "Kitchen furnishing", amount: "₹11,17,800" },
    { icon: <FaBed />, name: "Bedroom painting", amount: "₹8,17,214" },
    { icon: <FaHome />, name: "Structure", amount: "₹27,800" },
  ];

  const materials = [
    { name: "Pravesh", desc: "Doors & windows" },
    { name: "Tiscon", desc: "Rebars & suppliers" },
    { name: "Agrico", desc: "Trades hand tools" },
    { name: "Wiron", desc: "Fencing wire & mesh" },
    { name: "Durashine", desc: "Roofing sheets" },
    { name: "Structura", desc: "Frames & tubes" },
  ];

  const serviceProviders = [
    { name: "Dayalu Singh", location: "Yashwant Nagar", rating: "4.8" },
    { name: "Gajendra Prasad", location: "Yashwant Nagar", rating: "4.8" },
  ];

  return (
    <div className="interiors-container">
      {/* Header */}
      <h2 className="interiors-title">Interiors</h2>

      {/* Total Expenses */}
      <div className="total-expenses">
        <div>
          <p>Total expenses</p>
          <h3>₹20,00,000</h3>
        </div>
        <button className="add-expense-btn">
          <FaPlus /> Add expense
        </button>
      </div>

      {/* Expenses List */}
      <div className="expenses-list">
        {expenses.map((expense, index) => (
          <div className="expense-item" key={index}>
            <div className="expense-info">
              <span className="expense-icon">{expense.icon}</span>
              <div>
                <p className="expense-name">{expense.name}</p>
                <p className="expense-category">Interiors</p>
              </div>
            </div>
            <p className="expense-date">20th Dec 2024</p>
            <p className="expense-amount">{expense.amount}</p>
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        {/* Materials Section */}
        <div className="materials-section">
          <h3>Materials you may need</h3>
          <div className="materials-list">
            {materials.map((material, index) => (
              <div className="material-item" key={index}>
                <div className="material-image">📦</div>
                <p className="material-name">{material.name}</p>
                <p className="material-desc">{material.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Service Providers */}
        <div className="service-providers">
          <h3>Recommended service providers for you</h3>
          <a href="#" className="view-all">View all</a>
          {serviceProviders.map((provider, index) => (
            <div className="provider-card" key={index}>
              <div className="provider-image">👷</div>
              <div className="provider-details">
                <p className="provider-name">{provider.name}</p>
                <p className="provider-location">🏠 {provider.location}</p>
                <div className="provider-rating">⭐ {provider.rating}</div>
                <button className="send-enquiry-btn">Send enquiry</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interiors;
