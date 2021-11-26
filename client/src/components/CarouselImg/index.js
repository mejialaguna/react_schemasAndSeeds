import React from "react";
import InfiniteCarousel from "react-leaf-carousel";
import img1 from "../../img/img-1.jpg";
import img2 from "../../img/img-2.jpg";
import img3 from "../../img/img-3.jpg";
import img4 from "../../img/img-4.jpg";
import img5 from "../../img/img5.jpg";
import img6 from "../../img/img6.jpg";
import img7 from "../../img/img7.jpg";

const display = {
  size: {
    height: 200,
	},
	text: {
	textAlign: "center",
    marginBottom: 70
	}
};

const Carousel = () => {
  return (
    <div>
      <h3 style={display.text}>Trendy Products</h3>
      <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
        ]}
        dots={true}
        showSides={true}
        sidesOpacity={0.5}
        sideSize={0.1}
        slidesToScroll={1}
        slidesToShow={4}
        scrollOnDevice={true}
      >
        <div>
          <img style={display.size} alt="new-products" src={img1} />
        </div>
        <div>
          <img style={display.size} alt="new-products" src={img2} />
        </div>
        <div>
          <img style={display.size} alt="new-products" src={img3} />
        </div>
        <div>
          <img style={display.size} alt="new-products" src={img4} />
        </div>
        <div>
          <img style={display.size} alt="new-products" src={img5} />
        </div>
        <div>
          <img style={display.size} alt="new-products" src={img6} />
        </div>
        <div>
          <img style={display.size} alt="new-products" src={img7} />
        </div>
      </InfiniteCarousel>
    </div>
  );
};

export default Carousel;
