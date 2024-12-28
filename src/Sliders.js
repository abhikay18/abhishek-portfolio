import React, { useState, useEffect, useRef } from "react";
import "./Slider.css";

const Sliders = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRef = useRef(null);

  // Auto-slide logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNextSlide();
    }, 30000); // Change slide every 10 seconds
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  // Auto vertical scroll logic for overflowing content
  useEffect(() => {
    if (contentRef.current) {
      const scrollElement = contentRef.current;
      let scrollPosition = 0;
      const scrollStep = 2; // Pixels to scroll per tick
      const scrollInterval = setInterval(() => {
        if (scrollPosition < scrollElement.scrollHeight - scrollElement.clientHeight) {
          scrollPosition += scrollStep;
          scrollElement.scrollTop = scrollPosition;
        } else {
          clearInterval(scrollInterval);
        }
      }, 60); // Smooth scrolling every 50ms
      return () => clearInterval(scrollInterval);
    }
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="sliders">
      <center>
      <h4>{slides[currentSlide].title}</h4>
      </center>
      <div className="slide-content" ref={contentRef}>
      <div className="slide">
        <img
          className="slide-image"
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
        />
          <p>{slides[currentSlide].content}</p>
        </div>
      </div>
      <div className="controls">
        <button onClick={handlePrevSlide} className="prev">
          ❮
        </button>
        <button onClick={handleNextSlide} className="next">
          ❯
        </button>
      </div>
    </div>
  );
};

export default Sliders;
