 import React from "react";
import CalView from "./CalView";
 import Calendar from "./Calendar";
import ExpenseList from "./ExpenseList";

 const App = () => {
   return (
   <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
       <Calendar />
     <ExpenseList /> 
{/* <CalView /> */}
     </div>
   );
 };

export default App;




