import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Slider from 'react-slick';

export default class newItems extends Component {
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
      slidesToShow: 4,
      autoplay: true,
      autoPlaySpeed: 8000,
      infinite: true,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1045,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
      prevArrow: <Prev />,
      nextArrow: <Next />,
    };
    return (
      <section className="items">
        <div className="container">
          <div className="items__body">
            <div className="items__title">
              <h2>Нові надходження</h2>
            </div>
            <Slider
              className="items__slider"
              {...settings}
              style={{
                position: 'relative',
              }}>
              {this.props.newItems &&
                this.props.newItems.map(
                  (elem, index) =>
                    elem.isNew && (
                      <div className="items__slider--item" key={`${elem}_${index}`}>
                        <img src={elem.imageUrl} alt="ruchka" />
                        <p className="items__slider--info">{elem.name}</p>
                        <p className="items__slider--price">
                          {elem.price} UAH <span>/ {Math.floor(elem.price / 28)}$</span>
                        </p>
                      </div>
                    ),
                )}
            </Slider>
          </div>
        </div>
      </section>
    );
  }
}

newItems.propTypes = {
  brandsPng: PropTypes.array,
  brandsWebp: PropTypes.array,
};

newItems.defaultProps = {
  brandsPng: [],
  brandsWebp: [],
};
