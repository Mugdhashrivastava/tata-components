import React from "react";
import "./Interiors.css";
import { FaPlus, FaRegLightbulb, FaCouch, FaPaintRoller, FaHome } from "react-icons/fa";

const Interiors = () => {
  const expenses = [
    { icon: <FaRegLightbulb />, title: "Lights from Dubai", amount: "₹27,800" },
    { icon: <FaCouch />, title: "Kitchen furnishing", amount: "₹11,17,800" },
    { icon: <FaPaintRoller />, title: "Bedroom painting", amount: "₹8,17,214" },
    { icon: <FaHome />, title: "Structure", amount: "₹27,800" },
  ];

  const materials = [
    { name: "Pravesh", desc: "Doors & windows" },
    { name: "Tiscon", desc: "Rods & suppliers" },
    { name: "Agrico", desc: "Tools & hand tools" },
    { name: "Wiron", desc: "Fencing wire & mesh" },
    { name: "Durashine", desc: "Roofing sheets" },
    { name: "Structura", desc: "Frames & Lattice" },
  ];

  const serviceProviders = [
    { name: "Dayalu Singh", rating: "4.8", location: "Yashwant Nagar" },
    { name: "Gajendra Prasad", rating: "4.8", location: "Yashwant Nagar" },
  ];

  return (
    <div className="Interiors">
      <div className="expenses-section">
        <h2>Interiors</h2>
        <div className="total-expenses">
          <span>Total expenses</span>
          <h3>₹20,00,000</h3>
          <button className="add-expense-btn">
            <FaPlus /> Add expense
          </button>
        </div>
        <div className="expenses-list">
          {expenses.map((expense, index) => (
            <div className="expense-item" key={index}>
              <span className="icon">{expense.icon}</span>
              <div className="expense-details">
                <h4>{expense.title}</h4>
                <p>Interiors | 20th Dec 2024</p>
              </div>
              <span className="expense-amount">{expense.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar">
        <div className="materials-section">
          <h3>Materials you may need</h3>
          <div className="materials-list">
            {materials.map((item, index) => (
              <div key={index} className="material-item">
                <span className="material-name">{item.name}</span>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="service-providers">
          <h3>Recommended service providers for you</h3>
          {serviceProviders.map((provider, index) => (
            <div key={index} className="provider-card">
              <div className="provider-info">
                <h4>{provider.name}</h4>
                <p>📍 {provider.location}</p>
                <span className="rating">⭐ {provider.rating}</span>
              </div>
              <button className="send-enquiry-btn">Send enquiry</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interiors;
