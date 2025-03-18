import React from "react";
import Calendar from "./Calendar";
import ExpenseList from "./ExpenseList";

const App = () => {
  return (
    <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
      <Calendar />
      <ExpenseList />
    </div>
  );
};

export default App;
