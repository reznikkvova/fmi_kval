import React, { useEffect, useCallback, useState } from 'react';

import { fetchDetails } from '../redux/actions/items';

import { BreadCrumbs, SortPopup, Filter } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import ItemBlock from './../components/itemBlock/index';
import { setSortBy } from '../redux/actions/sortBy';


import leftPag from '../assets/img/paginationleft.png';
import rightPag from '../assets/img/paginationleft.png';
import Axios from "axios";

export default function Shop() {

  const itemsPerPage = 2;

  const sortItems = [
    {id: '1', name: 'Найновіші', type: 'year', order: 'desc' },
    {id: '2', name: 'Найстаріші', type: 'year', order: 'asc' },
    {id: '3', name: 'Найдешевші', type: 'price', order: 'desc' },
    {id: '4', name: 'Найдорожчі', type: 'price', order: 'asc' }
  ];

  const [visibleFilter, setVisibleFilter] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedSort, setSelectedSort] = useState(sortItems[3]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [itemsCountValue, setItemsCountValue] = useState(0);

  const [searchParams, setSearchParams] = useState({});

  const handleSetSearchParams = (params) => {
    setLoading(true);
    setSearchParams(params);
  }

  useEffect(() => {
    if(loading) {
      setLoading(false);

      const filteredObj = Object.entries(searchParams).reduce((acc, [key, value]) => {
        if (value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});

      if(Object.keys(filteredObj).length === 0) {
         setItemsCount(itemsCountValue);
      }

      Axios.get('/api/tire-crud/get-items-sorting', {
        params: {
          sortBy: selectedSort.type,
          sortOrder: selectedSort.order,
          skip: page * itemsPerPage,
          limit: itemsPerPage,
          search: JSON.stringify(filteredObj)
        }
      }).then((response) => {
        setItems(response.data);
        if(Object.keys(filteredObj).length === 0) {
          setItemsCount(itemsCountValue);
        } else {
          setItemsCount(response.data.count);
        }

      });


    }
  }, [selectedSort, page, searchParams]);

  useEffect(() => {
    Axios.get('/api/tire-crud/get-items').then((response) => {
      setItemsCount(response.data.count);
      setItemsCountValue(response.data.count);
    });
  }, [])


  const toggleVisibleFilter = () => {
    setVisibleFilter(!visibleFilter);
  };
  const handleAddItemToCart = (obj) => {

  };

  const handleSelectSort = (item) => {
    setSelectedSort(item);
    setLoading(true);
  }

  const handleChangePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  return (
    <main>
      <BreadCrumbs crumbs={[{ route: '/tires', label: 'Пошук шин'}]}/>
      <section className="items-selling">
        <div className="container">
          <div className="items-selling__body">
            <Filter visibleFilter={visibleFilter}  handleSetSearchParams={handleSetSearchParams}/>
            <div className="item-list__body">
              <div className="item-list__filter">
                <div className="item-list__filter--show">
                  <p>Список товарів - {itemsCount}</p>
                </div>
                <div
                  className="item-list__filter--filter--mobile filtermobile"
                  onClick={toggleVisibleFilter}>
                  <p>Фільтр</p>
                </div>
                <SortPopup
                  items={sortItems}
                  selectedSort={selectedSort}
                  handleSelectSort={handleSelectSort}
                />
              </div>

              <div className="item-list__wrapper fd-col">
                {items && items.data &&
                  // eslint-disable-next-line
                  items.data.map((obj) => {
                    if (1 + 1 === 2
                      /*obj.brand.toLowerCase().includes(filters.brand.toLowerCase()) &&
                      obj.model.toLowerCase().includes(filters.model.toLowerCase()) &&
                      obj.article.toLowerCase().includes(filters.article.toLowerCase()) &&
                      obj.volume.toLowerCase().includes(filters.engine_value.toLowerCase()) &&
                      obj.name.toLowerCase().includes(filters.item.toLowerCase())*/
                    ) {
                      return (
                        <ItemBlock key={obj.id} {...obj} onClickAddItem={handleAddItemToCart} />
                      );
                    }
                  })}
              </div>

              <div className="item-list__pagination">
                {Array(Math.ceil(itemsCount/itemsPerPage)).fill(1).map((el, i) =>
                    <div className={page === i ? 'active--pagination' : ''} onClick={() => handleChangePage(i)}>{i+1}</div>
                )}
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
