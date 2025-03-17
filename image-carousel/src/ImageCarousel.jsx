import { useState } from "react";
import { X } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";

import img1 from "./assets/images/img.jpg";
import img2 from "./assets/images/img2.jpg";
import img3 from "./assets/images/img.jpg";

const images = [img1, img2, img3];

export default function ImageCarousel({ isOpen, setIsOpen }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, newIndex) => setCurrentIndex(newIndex),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    return <div className="slick-next" onClick={props.onClick}></div>;
  }

  function SamplePrevArrow(props) {
    return <div className="slick-prev" onClick={props.onClick}></div>;
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={() => setIsOpen(false)} className="close-btn">
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Reference photos/bill</h2>
        <Slider {...settings} className="image-container">
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt="Reference" className="carousel-image" />
            </div>
          ))}
        </Slider>
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
