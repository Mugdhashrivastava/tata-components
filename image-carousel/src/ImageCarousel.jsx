import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "./ImageCarousel.css"; 

const images = [
  "/path-to-image1.jpg",
  "/path-to-image2.jpg",
  "/path-to-image3.jpg",
  "/path-to-image4.jpg",
  "/path-to-image5.jpg",
];

export default function ImageCarousel({ isOpen, setIsOpen }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="modal-overlay">
      <div className="modal-content">
        <button onClick={() => setIsOpen(false)} className="close-btn">
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Reference photos/bill</h2>
        <div className="image-container">
          <button onClick={prevImage} className="nav-btn left">
            <ChevronLeft />
          </button>
          <img src={images[currentIndex]} alt="Reference" />
          <button onClick={nextImage} className="nav-btn right">
            <ChevronRight />
          </button>
        </div>
        <div className="thumbnail-container">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              className={`thumbnail ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </Dialog>
  );
}
