import React, {useCallback, useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import logoPng from '../../assets/img/logo.png';

const categories = [{route: '/', label: 'Головна'}, {route: '/tires', label: 'Пошук шин'}, {route: '/contacts', label: 'Контакти'}, {route: '/about-us', label: 'Про нас'}];

export default function Header({isAdmin, itemsInCart}) {
  const auth = useContext(AuthContext);

  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);


  const [visibleBurger, setVisibleBurger] = useState(false);

  const toggleVisibleBurger = () => {
    setVisibleBurger(!visibleBurger);
  };

  const onSelectCategory = useCallback((index) => {
    setVisibleBurger(false);
    // eslint-disable-next-line
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          {isAdmin ?
              <Link to='/admin' className="header__logo">
                <img src={logoPng} alt="logo" />
              </Link>
              : <div className="header__logo">
              <img src={logoPng} alt="logo" />
          </div> }
          {window.innerWidth < 992 ?
            <div className="header__list--actions mobile">
              <Link to="/cart" onClick={() => onSelectCategory(null)} className="cart-icon">
                <i className="fas fa-shopping-cart header-icon" title="Перейти до корзини"></i>
                {itemsInCart !== 0 ? <span className="cart-counter">{itemsInCart}</span> : ''}
              </Link>
              <div
                className={visibleBurger ? 'header__burger active' : 'header__burger'}
                onClick={toggleVisibleBurger}>
                  <div></div>
              </div>
            </div>:
            ''}
          <div className={visibleBurger ? 'header__menu active' : 'header__menu'}>
            <nav className="header__nav">
              <ul className="header__list">
                {categories &&
                    categories.map((category, index) => (
                    <li onClick={() => onSelectCategory(index)} key={`${category.route}_${index}`}>
                      <Link
                        to={category.route}
                        className={
                          url === category.route ? 'header__link link--active' : 'header__link'
                        }>
                        {category.label}
                      </Link>
                    </li>
                  ))}

                <li className="header__list--actions">
                  {auth.isAuthenticated ? <Link to="/account" onClick={() => onSelectCategory(null)}
                                                className={
                                                  url === '/account' ? 'header__link link--active' : 'header__link'
                                                }>
                        Аккаунт
                      </Link> :
                      <Link to="/login" onClick={() => onSelectCategory(null)} className={
                        url === '/login' ? 'header__link link--active' : 'header__link'
                      }>
                        Увійти
                      </Link>
                  }

                  <Link to="/cart" onClick={() => onSelectCategory(null)} className="cart-icon">
                    <i className="fas fa-shopping-cart header-icon" title="Перейти до корзини"></i>
                    {itemsInCart !== 0 ? <span className="cart-counter">{itemsInCart}</span> : ''}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  categoryNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func,
};

Header.defaultProps = {
  categoryNames: [],
};
