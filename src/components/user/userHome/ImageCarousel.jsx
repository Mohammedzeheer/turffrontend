// ImageCarousel.js

import React, { useState, useEffect } from "react";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="carousel-container relative">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Turf Booking Banner ${index}`}
          className={`w-full h-auto object-cover ${
            index === currentIndex ? "opacity-100" : "opacity-0 absolute"
          } transition-opacity duration-500`}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
