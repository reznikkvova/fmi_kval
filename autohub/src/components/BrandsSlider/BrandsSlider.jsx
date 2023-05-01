import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import {
  bridgestonePng,
  continentalPng,
  debicaPng,
  goodyearPng,
  hankookPng,
  michelinPng,
} from './images';

const brandsPng = [bridgestonePng, continentalPng, debicaPng, goodyearPng, hankookPng, michelinPng];

export default class BrandsSlider extends Component {
  render() {
    const Prev = (props) => (
      <button
        onClick={props.onClick}
        className={'slick-arrow slick-prev'}
        type="button"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/slider-arrow.png'})`,
          backgroundColor: 'white',
        }}>
        Prev
      </button>
    );

    const Next = (props) => (
      <button
        className={'slick-arrow slick-next'}
        onClick={props.onClick}
        type="button"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/slider-arrow-right.png'})`,
          backgroundColor: 'white',
        }}>
        Next
      </button>
    );
    const settings = {
      arrows: true,
      slidesToShow: 6,
      autoplay: true,
      autoPlaySpeed: 8000,
      infinite: true,
      prevArrow: <Prev />,
      nextArrow: <Next />,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 1045,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
    return (
      <section className="brands">
        <div className="container">
          <Slider className="brands__slider" {...settings}>
            {brandsPng.concat(brandsPng).map((brand, index) => (
              <div className="brands__slider--item" key={`${brand}_${index}`}>
                  <img src={brand} alt={brand} />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }
}

BrandsSlider.propTypes = {
  brandsPng: PropTypes.array,
};

BrandsSlider.defaultProps = {
  brandsPng: [],
};
