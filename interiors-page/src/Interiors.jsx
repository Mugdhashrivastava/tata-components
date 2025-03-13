import React from "react";
import "./Interiors.css";
import { FaPlus, FaWallet, FaStar } from "react-icons/fa";
import { FaRegLightbulb, FaBed, FaCouch, FaHome } from "react-icons/fa";

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
    { name: "Pravesh", desc: "Doors & windows", icon: "🚪" },
    { name: "Tiscon", desc: "Rebars & suppliers", icon: "🛠️" },
    { name: "Agrico", desc: "Trades hand tools", icon: "🔨" },
    { name: "Wiron", desc: "Fencing wire & mesh", icon: "🧵" },
    { name: "Durashine", desc: "Roofing sheets", icon: "🏠" },
    { name: "Structura", desc: "Frames & tubes", icon: "🖼️" },
  ];

  const serviceProviders = [
    { name: "Dayalu Singh", location: "Yashwant Nagar", rating: "4.8", savedBy: "187" },
    { name: "Gajendra Prasad", location: "Yashwant Nagar", rating: "4.8", savedBy: "187" },
  ];

  return (
    <div className="interiors-container">
    
      {/* Main Content */}
      <div className="main-content">
        {/* Left Section (Total Expenses, Expenses List) */}
        <div className="left-section">
          {/* Total Expenses */}
            {/* Header */}
      <div className="header">
        <h2 className="interiors-title">Interiors</h2>
        <button className="add-expense-btn">
          <FaPlus /> Add expense
        </button>
      </div>

          <div className="total-expenses">
            <div className="total-expenses-info">
            
              <div>
                <p>Total expenses</p>
                <h3>₹20,00,000</h3>
              </div>
              <FaCouch className="total-expenses-icon" />
            </div>
          </div>

          {/* Expenses List */}
          <div className="expenses-list">
            {expenses.map((expense, index) => (
              <div className="expense-card" key={index}>
                <div className="expense-icon">{expense.icon}</div>
                <div className="expense-details">
                  <h3>{expense.name}</h3>
                </div>
                <p className="expense-category">Interiors</p>
                <p className="expense-date">20th Dec 2024</p>
                <p className="expense-amount">{expense.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          {/* Materials Section */}
          <div className="materials-section">
            <h3 className="materials-title">Materials you may need</h3>
            <div className="materials-list">
              {materials.map((material, index) => (
                <div className="material-item" key={index}>
                  <div className="material-icon">{material.icon}</div>
                  <p className="material-name">{material.name}</p>
                  <p className="material-desc">{material.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Service Providers */}
          <div className="service-providers">
            <div className="service-providers-header">
              <h3>Recommended service providers for you</h3>
              <a href="#" className="view-all">View all</a>
            </div>
            {serviceProviders.map((provider, index) => (
              <div className="provider-card" key={index}>
                <div className="provider-image">👷</div>
                <div className="provider-details">
                  <p className="provider-name">{provider.name}</p>
                  <p className="provider-location">🏠 {provider.location}</p>
                  <div className="provider-rating">
                    <FaStar className="star-icon" /> {provider.rating}{" "}
                    <span className="saved-by">Saved by {provider.savedBy}</span>
                  </div>
                  <button className="send-enquiry-btn">Send enquiry</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interiors;