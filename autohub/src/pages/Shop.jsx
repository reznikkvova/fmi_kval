import React, { useEffect, useCallback, useState } from 'react';

import { fetchDetails } from '../redux/actions/items';

import { BreadCrumbs, SortPopup, Filter } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import ItemBlock from './../components/itemBlock/index';
import { setSortBy } from '../redux/actions/sortBy';


import leftPag from '../assets/img/paginationleft.png';
import rightPag from '../assets/img/paginationleft.png';

export default function Shop() {
  const dispatch = useDispatch();
  const items = useSelector(({ details }) => details.items);
  const filters = useSelector(({ search }) => search.filters);
  const { sortBy } = useSelector(({ sortBy }) => sortBy);
  const sortItems = [
    { name: 'Найновіші', type: 'year', order: 'desc' },
    { name: 'По маркам', type: 'brand', order: 'asc' },
    { name: 'Найдешевші', type: 'price', order: 'asc' },
  ];

  useEffect(() => {
    dispatch(fetchDetails(sortBy));
    // eslint-disable-next-line
  }, [sortBy]);

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
    // eslint-disable-next-line
  }, []);

  const [visibleFilter, setVisibleFilter] = useState(false);

  const toggleVisibleFilter = () => {
    setVisibleFilter(!visibleFilter);
  };
  const handleAddItemToCart = (obj) => {
    dispatch({
      type: 'ADD_ITEM_CART',
      payload: obj,
    });
  };

  return (
    <main>
      <BreadCrumbs crumbs={[{ route: '/tires', label: 'Пошук шин'}]}/>
      <section className="items-selling">
        <div className="container">
          <div className="items-selling__body">
            <Filter visibleFilter={visibleFilter} />
            <div className="item-list__body">
              <div className="item-list__filter">
                <div className="item-list__filter--show">
                  <p>Доступні запчастини</p>
                </div>
                <div
                  className="item-list__filter--filter--mobile filtermobile"
                  onClick={toggleVisibleFilter}>
                  <p>Фільтр</p>
                </div>
                <SortPopup
                  items={sortItems}
                  activeSortType={sortBy.type}
                  onClickSortPopup={onSelectSortType}
                />
              </div>

              <div className="item-list__wrapper fd-col">
                {items &&
                  // eslint-disable-next-line
                  items.map((obj) => {
                    if (
                      obj.brand.toLowerCase().includes(filters.brand.toLowerCase()) &&
                      obj.model.toLowerCase().includes(filters.model.toLowerCase()) &&
                      obj.article.toLowerCase().includes(filters.article.toLowerCase()) &&
                      obj.volume.toLowerCase().includes(filters.engine_value.toLowerCase()) &&
                      obj.name.toLowerCase().includes(filters.item.toLowerCase())
                    ) {
                      return (
                        <ItemBlock key={obj.id} {...obj} onClickAddItem={handleAddItemToCart} />
                      );
                    }
                  })}
              </div>

              <div className="item-list__pagination">
                <a href="/">
                  <img src={leftPag} alt="" />
                </a>
                <a href="/1" className="active--pagination">
                  1
                </a>
                <a href="/2">2</a>
                <a href="/3">3</a>
                <a href="/4">4</a>
                <a href="/5">5</a>
                <a href="/6">6</a>
                <a href="/7">7</a>
                <a href="/">
                  <img src={rightPag} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="information items-seo">
        <div className="container">
          <div className="information__body">
            <div className="information__title">
              <h2>Як підібрати потрібну запчастину?</h2>
            </div>
            <div className="information__text">
              <p>
                1. Підбір запчастин по VIN-коду - один з найточніших способів. Все що Вам потрібно -
                це знати ідентифікаційний номер вашого авто, який вказаний в техпаспорті. Введіть
                VIN-код в спеціальне поле і вибирайте потрібну автозапчастин, користуючись
                оригінальними каталогами.
                <br />
                2. Підбір автозапчастин по моделі авто. Вкажіть марку, модель, рік випуску і
                модифікацію двигуна. Вам будуть запропоновані запчастини для Вашого автомобіля.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
