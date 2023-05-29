import Image from "next/image";
import React, { useState } from "react";

interface CarouselProps {
  slides: {
    photoAnimal: string;
    id: number;
  }[];
}

const Carousel = ({ slides }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative">
      {/* Slide atual em destaque */}
      <Image
        src={slides[currentSlide].photoAnimal}
        alt={`Slide ${slides[currentSlide].id} small`}
        className="w-full object-cover h-[300px] rounded-2xl"
        blurDataURL={slides[currentSlide].photoAnimal}
        width={300}
        height={300}
        quality={100}
         
      />

      {/* Miniaturas dos slides */}
      <div className="flex justify-start mt-4">
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`h-20 w-20 mx-1 rounded-full focus:outline-none ${
              index === currentSlide ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => handleSlideChange(index)}
          >
            <Image
              width={80}
              height={80}
              src={slide.photoAnimal}
              alt={`Slide ${slide.id}`}
              className="h-20 w-20 object-cover rounded-2xl"
              loading="eager" 
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
