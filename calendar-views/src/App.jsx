import React, { useState } from "react";
import Calendar from "./Calendar";
import ExpenseList from "./ExpenseList";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <div className="app-container">
      {/* Tab navigation */}
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

      {/* Component display */}
      <div className="component-container">
        {/* Mobile view*/}
        <div className="mobile-view">
          {activeTab === "calendar" ? (
            <>
              <Calendar />
              <ExpenseList />
            </>
          ) : (
            <ExpenseList />
          )}
        </div>
        {/* Desktop view*/}
        <div className="desktop-view">
          <Calendar />
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

export default App;