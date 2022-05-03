import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { breadCrumbsPng, breadCrumbsWebp } from './images';

const categoryNames = ['Головна', 'Запчастини', 'Про нас', 'Контакти'];

export default function BreadCrumbs() {
  const { category } = useSelector(({ headerCategories }) => headerCategories);
  return (
    <section className="breadcrumbs">
      <div className="container">
        <div className="breadcrumbs__body">
          <Link to="/">Головна</Link>
          <picture>
            <source srcSet={breadCrumbsWebp} type="image/webp" />
            <img src={breadCrumbsPng} alt="breadcrumbs" />
          </picture>
          <h2>{categoryNames[category]}</h2>
        </div>
      </div>
    </section>
  );
}

BreadCrumbs.propTypes = {
  categoryNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func,
};

BreadCrumbs.defaultProps = {
  categoryNames: [],
};
