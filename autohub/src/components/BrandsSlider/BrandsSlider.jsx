import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import {
  landRoverPng,
  landRoverWebp,
  bmwPng,
  bmwWebp,
  AudiPng,
  AudiWebp,
  porshePng,
  porsheWebp,
  mersedesPng,
  mersedesWebp,
  vwPng,
  vwWebp,
} from './images';

const brandsPng = [landRoverPng, bmwPng, AudiPng, porshePng, mersedesPng, vwPng];
const brandsWebp = [landRoverWebp, bmwWebp, AudiWebp, porsheWebp, mersedesWebp, vwWebp];

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
        <h2>Semantic text</h2>
        <div className="container">
          <Slider className="brands__slider" {...settings}>
            {brandsPng.map((brand, index) => (
              <div className="brands__slider--item" key={`${brand}_${index}`}>
                <picture>
                  <source srcSet={brand} type="image/webp" />
                  <img src={brandsWebp[index]} alt="landrover" />
                </picture>
              </div>
            ))}

            <div className="brands__slider--item">
              <picture>
                <source srcSet={landRoverWebp} type="image/webp" />
                <img src={landRoverPng} alt="landrover" />
              </picture>
            </div>
            <div className="brands__slider--item">
              <picture>
                <source srcSet={bmwWebp} type="image/webp" />
                <img src={bmwPng} alt="bmw" />
              </picture>
            </div>
            <div className="brands__slider--item">
              <picture>
                <source srcSet={AudiPng} type="image/webp" />
                <img src={AudiWebp} alt="audi" />
              </picture>
            </div>
            <div className="brands__slider--item">
              <picture>
                <source srcSet={porsheWebp} type="image/webp" />
                <img src={porshePng} alt="porshe" />
              </picture>
            </div>
            <div className="brands__slider--item">
              <picture>
                <source srcSet={mersedesWebp} type="image/webp" />
                <img src={mersedesPng} alt="mersedes" />
              </picture>
            </div>
            <div className="brands__slider--item">
              <picture>
                <source srcSet={vwWebp} type="image/webp" />
                <img src={vwPng} alt="vw" />
              </picture>
            </div>
          </Slider>
        </div>
      </section>
    );
  }
}

BrandsSlider.propTypes = {
  brandsPng: PropTypes.array,
  brandsWebp: PropTypes.array,
};

BrandsSlider.defaultProps = {
  brandsPng: [],
  brandsWebp: [],
};
