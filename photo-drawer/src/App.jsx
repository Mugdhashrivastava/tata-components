import React, { useState } from "react";
import PhotoDrawer from "./PhotoDrawer";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsDrawerOpen(true)}>Open Drawer</button>
      <PhotoDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}

export default App;
