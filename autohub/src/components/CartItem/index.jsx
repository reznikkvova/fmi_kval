import React from 'react';
import PropTypes from 'prop-types';

function CartItem({ id, name, imageUrl, brand, model, price, year, volume, article, onRemove }) {
  const handleRemoveClick = () => {
    onRemove(id);
  };
  return (
    <div className="item-list__item">
      <div className="item-list__item--img">
        <img src={imageUrl} alt="" />
      </div>
      <div className="item-list__item-wrapper">
        <div className="item-list__item--info default--info fdRow">
          <p className="item-list__item--name">{name}</p>
          <p className="item-list__item--price">
            {price} UAH <span>/ {Math.floor(price / 28)} $</span>
          </p>
        </div>
        <div className="item-list__item--info special--info">
          <p className="item-list__item--descr">
            {brand}, {model}, {year}, {volume}
          </p>
          <div onClick={handleRemoveClick} className="item-list__item--button">
            <span>Видалити</span>
          </div>
        </div>
        <div className="item-list__item--info special--info special--info">
          <p className="item-list__item--article">
            Артикул: <span>{article}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  imageUrl: PropTypes.string,
  brand: PropTypes.string,
  model: PropTypes.string,
  volume: PropTypes.string,
  article: PropTypes.string,
};

CartItem.defaultProps = {
  name: '---',
  price: '0',
  brand: '---',
  model: '---',
  volume: '---',
  article: '---',
};

export default CartItem;
