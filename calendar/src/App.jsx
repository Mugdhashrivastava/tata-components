import React from 'react';
import Calendar from './Calendar';


function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <Calendar />
      </main>
    </div>
  );
}

export default App;