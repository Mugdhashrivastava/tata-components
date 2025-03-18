import { useState } from "react";
import { X } from "lucide-react";
import "./ImageCarousel.css";

import img1 from "./assets/images/img.jpg";
import img2 from "./assets/images/img2.jpg";
import img3 from "./assets/images/img.jpg";

const images = [img1, img2, img3];

export default function ImageCarousel({ isOpen, setIsOpen }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={() => setIsOpen(false)} className="close-btn">
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Reference photos/bill</h2>

        <div className="image-container">
          <button className="prev-btn" onClick={prevSlide}>‹</button>
          <img src={images[currentIndex]} alt="Reference" className="carousel-image" />
          <button className="next-btn" onClick={nextSlide}>›</button>
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
    </div>
  );
}
