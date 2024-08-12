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
    <div className="relative w-full max-w-full mx-auto mt-4">
      <button
        className="absolute left-0 z-10 p-2 text-white transform -translate-y-1/2 bg-gray-700 top-1/2"
        onClick={scrollLeft}
        style={{ marginLeft: "-1rem" }}
      >
        ❮
      </button>
      <div
        ref={carouselRef}
        className="flex p-2 space-x-2 overflow-x-scroll scroll-smooth snap-x snap-mandatory"
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-1/5 snap-center">
            <Image
              src={image}
              layout="responsive"
              width={80}
              height={80}
              alt={`Slide ${index + 1}`}
              className="m-1"
            />
          </div>
        ))}
      </div>
      <button
        className="absolute right-0 z-10 p-2 text-white transform -translate-y-1/2 bg-gray-700 top-1/2"
        onClick={scrollRight}
        style={{ marginRight: "-1rem" }}
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
