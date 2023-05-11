import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ItemBlock({
     id, brand, diameter, width, height, construction, speedIndex, countAvailable, season, image, year, price, article, onClickAddItem,
}) {
  const onAdditem = () => {
    /*const obj = {
      id,
      name,
      imageUrl,
      brand,
      model,
      price,
      year,
      volume,
      article,
    };
    onClickAddItem(obj);
    setCartStatus(true);*/
  };
  const [cartStatus, setCartStatus] = useState(false);
  const [dollar, setDollar] = useState(36);
  useEffect(() => {
    axios
      .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then(({ data }) => {
        setDollar(data[24].rate);
      });
  }, []);

  return (
    <div className="item-list__item">
      <div className="item-list__item--img">
        <img src={image} alt="" />
      </div>
      <div className="item-list__item-wrapper">
        <div className="item-list__item--info default--info fdRow">
          <p className="item-list__item--name">{brand} {width}/{height}/{construction}{diameter}</p>
          <p className="item-list__item--price">
            {price} UAH <span>/ {Math.floor(price / dollar)} $</span>
          </p>
        </div>
        <div className="item-list__item--info special--info">
          <p className="item-list__item--descr">
            Індекс швидкості: {speedIndex}
          </p>
          <p className="item-list__item--descr">
            Сезонність: { season}
          </p>

          {cartStatus ? (
            <div className="item-list__item--button">
              <span>В корзині</span>
            </div>
          ) : (
            <div onClick={onAdditem} className="item-list__item--button cursor">
              <span>Купити</span>
            </div>
          )}
        </div>
        <div className="item-list__item--info special--info special--info">
          <p className="item-list__item--article">
            Рік виробництва: <span>{year}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

ItemBlock.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  imageUrl: PropTypes.string,
  brand: PropTypes.string,
  model: PropTypes.string,
  volume: PropTypes.string,
  article: PropTypes.string,
};

ItemBlock.defaultProps = {
  name: '---',
  price: '0',
  brand: '---',
  model: '---',
  volume: '---',
  article: '---',
};

export default ItemBlock;
