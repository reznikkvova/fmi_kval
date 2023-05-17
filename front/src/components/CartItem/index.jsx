import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Axios from "axios";

function CartItem({ userId, id, quantity, brand, diameter, width, height, construction, speedIndex, countAvailable, season, image, year, price, dollar, handleUpdate, onRemove }) {

  const [count, setCount] = useState(quantity);
  const handleChangeCount = (e) => {
    setCount(e.target.value);
  }

  const handleChangeCountInDB = () => {
    Axios.post(`/api/cart/update/`,{
      userId: userId,
      productId: id,
      quantity: count
    }).then((response) => {
      handleUpdate();
    });
  }

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

            <div className="item-list__item--button cursor" onClick={() => onRemove(id)}>
                <span>Видалити</span>
            </div>

            <div className="item-list-counter">
              <input type="number" onBlur={handleChangeCountInDB} onChange={handleChangeCount} value={count}/>
            </div>
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
