import React, { useRef } from "react";
import Image from "next/image";

const Carousel = ({ images }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      <button
        className="absolute left-0 z-10 p-2 text-white transform -translate-y-1/2 bg-gray-700 top-1/2"
        onClick={scrollLeft}
      >
        ❮
      </button>
      <div
        ref={carouselRef}
        className="flex p-4 space-x-4 overflow-x-scroll carousel scroll-smooth snap-x snap-mandatory"
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-1/4 snap-center">
            <Image
              src={image}
              layout="responsive"
              width={400} // 원하는 너비 조정
              height={400} // 원하는 높이 조정
              alt={`Slide ${index + 1}`}
              className="m-2"
            />
          </div>
        ))}
      </div>
      <button
        className="absolute right-0 z-10 p-2 text-white transform -translate-y-1/2 bg-gray-700 top-1/2"
        onClick={scrollRight}
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
