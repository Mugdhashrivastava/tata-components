import { useState } from "react";
import ImageCarousel from "./ImageCarousel";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Open Image Carousel
      </button>

      {isOpen && <ImageCarousel isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default App;
