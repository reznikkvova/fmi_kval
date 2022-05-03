import React, { useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/actions/header-categories';
import { AuthContext } from './../../context/AuthContext';
import {
  logoPng,
  logoWebp,
  phoneBurgerPng,
  phoneBurgerWebp,
  menuBurgerPng,
  menuBurgerWebp,
  headerPhonePng,
  headerPhoneWebp,
} from './images';

const categoryNames = ['Головна', 'Запчастини', 'Про нас', 'Контакти'];

export default function Header() {
  const auth = useContext(AuthContext);

  const dispatch = useDispatch();
  const { totalCount } = useSelector(({ cart }) => cart);
  const { category } = useSelector(({ headerCategories }) => headerCategories);

  const [visibleBurger, setVisibleBuger] = useState(false);

  const toggleVisibleBurger = () => {
    setVisibleBuger(!visibleBurger);
  };

  const onSelectCategory = useCallback((index) => {
    setVisibleBuger(false);
    dispatch(setCategory(index));
    // eslint-disable-next-line
  }, []);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          <div className="header__logo">
            <picture>
              <source srcSet={logoWebp} type="image/webp" />
              <img src={logoPng} alt="logo" />
            </picture>
          </div>
          {window.innerWidth < 992 ? (
            <div className="header__adaptive">
              <Link to="/корзина" className="cart-icon">
                <i className="fas fa-shopping-cart"></i>
                {totalCount !== 0 ? <span className="cart-counter">{totalCount}</span> : ''}
              </Link>
              <div className="header__phoneburger">
                <a href="tel:12345678 ">
                  <picture>
                    <source srcSet={phoneBurgerWebp} type="image/webp" />
                    <img src={phoneBurgerPng} alt="burger-phone" />
                  </picture>
                </a>
              </div>
              <div
                className={visibleBurger ? 'header__burger active' : 'header__burger'}
                onClick={toggleVisibleBurger}>
                <picture>
                  <source srcSet={menuBurgerWebp} type="image/webp" />
                  <img src={menuBurgerPng} alt="burger" />
                </picture>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className={visibleBurger ? 'header__menu active' : 'header__menu'}>
            <nav className="header__nav">
              <ul className="header__list">
                {categoryNames &&
                  categoryNames.map((categoryName, index) => (
                    <li onClick={() => onSelectCategory(index)} key={`${categoryName}_${index}`}>
                      <Link
                        to={categoryName.toLowerCase()}
                        className={
                          category === index ? 'header__link link--active' : 'header__link'
                        }>
                        {categoryName}
                      </Link>
                    </li>
                  ))}

                <li className="header__list--phone">
                  <a
                    title="Зв'язатись по телефону"
                    href="tel:38 050 505 50 05"
                    className="header__link header__link-phone header-icon">
                    <picture>
                      <source srcSet={headerPhoneWebp} type="image/webp" />
                      <img src={headerPhonePng} alt="phone-logo" />
                    </picture>
                  </a>
                  <i
                    className="fas fa-sign-out-alt header-icon"
                    title="Вийти з аккаунту"
                    onClick={logoutHandler}></i>
                  <Link to="/корзина" onClick={() => onSelectCategory(null)} className="cart-icon">
                    <i className="fas fa-shopping-cart header-icon" title="Перейти до корзини"></i>
                    {totalCount !== 0 ? <span className="cart-counter">{totalCount}</span> : ''}
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
