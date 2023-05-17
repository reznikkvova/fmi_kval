import React, { useState, useEffect } from 'react';
import line from '../../assets/img/line.png';
import Axios from 'axios';

const Filter = React.memo(({ visibleFilter, handleSetSearchParams, searchParams }) => {
  const [brands, setBrands] = useState([]);

  const [form, setForm] = useState({
    diameter: searchParams.diameter ? searchParams.diameter : '',
    height:  searchParams.height ? searchParams.diameter : '',
    width:  searchParams.width ? searchParams.width : '',
    season: '',
    brand: ''
  })


  const onSubmit = () => {
    handleSetSearchParams(form);
  };
  const onClear = () => {
    setForm({
      diameter: '',
      height: '',
      width: '',
      season: '',
      brand: ''
    });
    handleSetSearchParams(form);
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const changeSelectedBrand = (brand) => {
    let _cp = Object.assign({}, form);
    if(_cp.brand === brand) {
      _cp.brand = ''
    } else {
      _cp.brand = brand;
    }
    setForm(_cp);
  }

  useEffect(() => {
    Axios.get('/api/brand-crud/get-items').then((response) => {
      setBrands(response.data.data);
    });
  }, [])

  return (
    <div className={!visibleFilter ? 'filter__body ' : 'filter__body active'}>
      <div className="filter__title">
        <h3>Пошук шин</h3>
      </div>
      <form className="filter__form">
        <p className="filter__input--name">Діаметр</p>
        <input
          className="filter__input--value"
          type="number"
          id="search-brand"
          onChange={changeHandler}
          value={form.diameter}
          name={'diameter'}
        />
        <p className="filter__input--name">Ширина профілю</p>
        <input
          className="filter__input--value"
          type="text"
          id="search-model"
          onChange={changeHandler}
          value={form.width}
          name={'width'}
        />
        <p className="filter__input--name">Висота профілю</p>
        <input
          className="filter__input--value"
          type="text"
          id="search-article"
          onChange={changeHandler}
          value={form.height}
          name={'height'}
        />

        <div id="search" className="search--button" onClick={() => onSubmit()}>
          Шукати
        </div>
        <div id="reset" className="reset--button" onClick={() => onClear()}>
          Очистити
        </div>

        <div className="carmodels">
          <h4 className="carmodels--title">Бренди шин</h4>
          <div className="carmodels__list">
            {brands && brands.map((brand) => (
              <div className="carmodels__list--item" key={brand.id}>
                <span className={form.brand === brand.name ? 'active' : ''} onClick={() => changeSelectedBrand(brand.name)}>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
});

export default Filter;
