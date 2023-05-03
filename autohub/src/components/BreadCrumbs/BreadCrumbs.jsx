import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

import breadCrumbsPng from '../../assets/img/bread-crumbs.png';

export default function BreadCrumbs({crumbs}) {

  return (
    <section className="breadcrumbs">
      <div className="container">
        <div className="breadcrumbs__body">
          <Link to='/'>Головна</Link>
          {!!crumbs.length && crumbs.map(item =>
                <Link to={item.route} className='breadcrumbs__item'>
                  <img src={breadCrumbsPng} alt="breadcrumbs" />
                  <h2>{item.label}</h2>
                </Link>
              )}
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
