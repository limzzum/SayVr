import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from "react";

import HomeVideo from "../../assets/MainPageAssets/video/Home.gif";
import TalkVideo from "../../assets/MainPageAssets/video/Talk.gif";
import "./style.css";

const ImageSlider = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="imageSlider-container">
      <Slider className="imageSlider" {...settings}>
        <img className="imageSlider-item" src={HomeVideo} alt="Image 1" />
        <img className="imageSlider-item" src={TalkVideo} alt="Image 1" />
      </Slider>
    </div>
  );
};

export default ImageSlider;
