import React, { useState, useEffect } from "react";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    "/image/realistic-soccer-or-football-in-net-with-free-vector.jpg",
    "/image/Turf2.jpg",
    "/image/soccer-ball-on-grass-in-front-of-goal-vector.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="carousel-container relative">
      <div className="image-wrapper ">
        {images.map((image, index) => (
          <img 
            key={index}
            src={image}
            alt={`Turf Booking Banner ${index}`}
            className={`w-full h-[15rem] sm:h-[40rem] object-cover ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } transition-opacity duration-800 absolute`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;




// const ImageCarousel = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images]);

//   return (
//     <div className="carousel-container relative">
//       {images.map((image, index) => (
//         <img
//           key={index}
//           src={image}
//           alt={`Turf Booking Banner ${index}`}
//           className={`w-full h-[15rem] object-cover ${
//             index === currentIndex ? "opacity-100" : "opacity-0 absolute"
//           } transition-opacity duration-300`} // Adjusted transition duration
//         />
//       ))}
//     </div>
//   );
// };