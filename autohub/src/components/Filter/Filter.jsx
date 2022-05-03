import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/actions/filter';
import line from '../../assets/img/line.png';
import axios from 'axios';

const Filter = React.memo(({ visibleFilter }) => {
  const [carModels, setCarModels] = useState([]);
  const [carDetails, setCarDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`https://sheet.best/api/sheets/0f57ec51-d10e-4bb4-9c37-5efdb0a37a5a`)
      .then(({ data }) => {
        let modelsArray = [];
        data.forEach((item) => {
          if (modelsArray.indexOf(item.brand) === -1) {
            modelsArray.push(item.brand);
          }
        });

        setCarModels(modelsArray);
        setCarDetails(data.map((item) => item.name));
      });
  }, []);

  const dispatch = useDispatch();
  const [inputBrand, changeInputBrand] = useState('');
  const [inputModel, changeInputModel] = useState('');
  const [inputArticle, changeInputArticle] = useState('');
  const [inputEngineValue, changeInputEngineValue] = useState('');
  const [itemValue, changeItemValue] = useState('');
  const [advanced, changeAdvanced] = useState(false);
  const filter = useSelector(({ search }) => search.filters);
  useEffect(() => {
    changeInputBrand(filter.brand);
    changeInputModel(filter.model);
    changeInputArticle(filter.article);
    changeInputEngineValue(filter.engine_value);
    changeItemValue(filter.item);
  }, [filter.article, filter.brand, filter.engine_value, filter.item, filter.model, advanced]);

  const filters = {
    brand: inputBrand,
    model: inputModel,
    article: inputArticle,
    engine_value: inputEngineValue,
    item: itemValue,
  };

  const onSubmit = () => {
    dispatch(setFilter(filters));
  };
  const onClear = () => {
    const filtersClear = {
      brand: '',
      model: '',
      article: '',
      engine_value: '',
      item: '',
    };
    changeInputBrand('');
    changeInputModel('');
    changeInputArticle('');
    changeInputEngineValue('');
    changeItemValue('');
    dispatch(setFilter(filtersClear));
  };

  const onChangeItemValue = (value) => {
    changeAdvanced(true);
    changeItemValue(value);
  };

  return (
    <div className={!visibleFilter ? 'filter__body ' : 'filter__body active'}>
      <div className="filter__title">
        <h3>Підбір запчастин</h3>
      </div>
      <form className="filter__form">
        <p className="filter__input--name">Марка</p>
        <input
          className="filter__input--value"
          type="text"
          id="search-brand"
          onChange={(event) => changeInputBrand(event.target.value)}
          value={inputBrand}
        />
        <p className="filter__input--name">Модель</p>
        <input
          className="filter__input--value"
          type="text"
          id="search-model"
          onChange={(event) => changeInputModel(event.target.value)}
          value={inputModel}
        />
        <p className="filter__input--name">Артикул</p>
        <input
          className="filter__input--value"
          type="text"
          id="search-article"
          onChange={(event) => changeInputArticle(event.target.value)}
          value={inputArticle}
        />
        <p className="filter__input--name">Об'єм двигуна</p>
        <input
          className="filter__input--value"
          type="text"
          id="search-oem"
          onChange={(event) => changeInputEngineValue(event.target.value)}
          value={inputEngineValue}
        />
        <div id="search" className="search--button" onClick={() => onSubmit()}>
          Шукати
        </div>
        <div id="reset" className="reset--button" onClick={() => onClear()}>
          Очистити
        </div>

        <div className="line">
          <img src={line} alt="" />
        </div>

        <div className="carmodels">
          <h4 className="carmodels--title">Марки авто</h4>
          <div className="carmodels__list">
            {carModels.map((model) => (
              <div className="carmodels__list--item" key={model}>
                <span onClick={() => changeInputBrand(model)}>{model}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="line">
          <img src={line} alt="" />
        </div>
        <div className="carmodels">
          <h4 className="carmodels--title custom--title">Запчастини</h4>
          <div className="carmodels__list">
            {carDetails.map((item) => (
              <div className="carmodels__list--item" key={item}>
                <span onClick={() => onChangeItemValue(item)}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
});

export default Filter;
