import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Open Expense Form</button>

      {showForm && (
        <div className="modal">
          <ExpenseForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default App;
