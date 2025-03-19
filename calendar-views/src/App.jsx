import React, { useState } from "react";
import Calendar from "./Calendar";
import ExpenseList from "./ExpenseList";
import "./App.css"; 

const App = () => {
  const [activeTab, setActiveTab] = useState("calendar"); 

  return (
    <div className="app-container">
      {/* Tab navigation - visible only in mobile view via CSS */}
      <div className="tab-nav">
        <button
          className={activeTab === "calendar" ? "tab-active" : "tab"}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar View
        </button>
        <button
          className={activeTab === "list" ? "tab-active" : "tab"}
          onClick={() => setActiveTab("list")}
        >
          List View
        </button>
      </div>

      
      <div className="component-container">
        {/* Mobile vieww */}
        <div className="mobile-view">
          {activeTab === "calendar" ? <Calendar />  : <ExpenseList />}
        </div>
        {/* Desktop view */}
        <div className="desktop-view">
          <Calendar />
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

export default App;