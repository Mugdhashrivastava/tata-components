import { useState } from "react";
import Slider from "react-slick";
import { X } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";

import img1 from "./assets/images/img.jpg";
import img2 from "./assets/images/img2.jpg";
import img3 from "./assets/images/img.jpg";

const images = [img1, img2, img3];

export default function ImageCarousel({ isOpen, setIsOpen }) {
  if (!isOpen) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={() => setIsOpen(false)} className="close-btn">
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Reference photos/bill</h2>

        <Slider {...settings} className="image-slider">
          {images.map((img, index) => (
            <div key={index} className="slide">
              <img src={img} alt="Reference" className="carousel-image" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
