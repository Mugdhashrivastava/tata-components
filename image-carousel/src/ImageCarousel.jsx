import { useState } from "react";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./ImageCarousel.css";

import img1 from "./assets/images/img.jpg";
import img2 from "./assets/images/img2.jpg";
import img3 from "./assets/images/img.jpg";

const images = [img1, img2, img3, img1, img2];

export default function ImageCarousel({ isOpen, setIsOpen }) {
  if (!isOpen) return null;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={() => setIsOpen(false)} className="close-btn">
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Reference photos/bill</h2>

        {/* Main Image Slider */}
        <Swiper
          loop = {true}
          modules={[Navigation, Thumbs]}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={10}
          className="main-swiper"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt="Reference" className="carousel-image" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail List */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          className="thumb-swiper"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt="Thumbnail" className="thumbnail" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
