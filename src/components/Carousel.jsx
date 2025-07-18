import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight} from 'lucide-react';
import img1 from "./../../assets/svgs/sangillenceBanner2.svg"
import img2 from "./../../assets/svgs/sangillenceBanner1.svg"

const carouselItems = [
  {
    image:img1,
    button:false,
    url:""
  },
  {
    image:img2,
    button:true,
    url:"/olympiad"
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setDirection(-1); // Moving left
      setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div className="relative h-[200px] md:h-[500px] w-full overflow-hidden">
      {/* Carousel Items */}
      <div
        className="relative h-full w-full"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 h-full w-full"
            style={{ left: `${index * 100}%` }}
          >
            <div
              className="relative h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-white px-4">
                <h2 className="text-5xl font-bold mb-4 text-center">{item.title}</h2>
                <p className="text-xl text-center max-w-2xl">{item.description}</p>
                {item.button &&

                <Link
                  to={item.url}
                  className="inline-flex items-center gap-2 max-md:hidden md:px-6 md:py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Explore More
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-green-500/50 hover:bg-blue-500/30 rounded-full p-2 backdrop-blur-sm transition-all"
        disabled={isTransitioning}
      >
        <ChevronLeft className="h-3 w-3 md:h-6 md:w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-green-500/50 hover:bg-blue-500/30 rounded-full p-2 backdrop-blur-sm transition-all"
        disabled={isTransitioning}
      >
        <ChevronRight className="h-3 w-3 md:h-6 md:w-6 text-white" />
      </button>
     
      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index ? "bg-blue-500 w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
