import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NewItems, BrandsSlider } from '../../components/index';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetails } from '../../redux/actions/items';
import { setCategory } from '../../redux/actions/header-categories';
import { setFilter } from '../../redux/actions/filter';
import {
  truckPng,
  truckWebp,
  updatePng,
  updateWebp,
  headPhonesPng,
  headPhonesWebp,
  giftPng,
  giftWebp,
} from './images';

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputBrand, changeInputBrand] = useState('');
  const [inputModel, changeInputModel] = useState('');
  const [inputArticle, changeInputArticle] = useState('');
  const [inputEngineValue, changeInputEngineValue] = useState('');
  const { sortBy } = useSelector(({ sortBy }) => sortBy);
  const { items } = useSelector(({ details }) => {
    return {
      items: details.items,
    };
  });

  const filters = {
    brand: inputBrand,
    model: inputModel,
    article: inputArticle,
    engine_value: inputEngineValue,
    item: '',
  };

  useEffect(() => {
    dispatch(fetchDetails(sortBy));
    dispatch(setCategory(0));
    // eslint-disable-next-line
  }, [sortBy]);

  const onSearch = (e) => {
    e.preventDefault();
    history.push('/запчастини');
    dispatch(setFilter(filters));
  };
  return (
    <main>
      <section
        className="search"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/background-car.png'})`,
          backgroundPosition: 'center',
          backgroudSize: '100% 100%',
        }}>
        <div className="container">
          <div className="search__body">
            <form action="server.php" className="search__form">
              <h3 className="search__form--title">Пошук запчастин</h3>
              <input
                className="search__form--input"
                type="text"
                id="brand"
                data-brand
                placeholder="Марка"
                onChange={(event) => changeInputBrand(event.target.value)}
                value={inputBrand}
              />
              <input
                className="search__form--input"
                type="text"
                id="model"
                data-model
                placeholder="Модель"
                onChange={(event) => changeInputModel(event.target.value)}
                value={inputModel}
              />
              <input
                className="search__form--input"
                type="text"
                id="item"
                data-item
                placeholder="Об'єм двигуна"
                onChange={(event) => changeInputEngineValue(event.target.value)}
                value={inputEngineValue}
              />
              <input
                className="search__form--input"
                type="text"
                id="article"
                data-article
                placeholder="Артикул"
                onChange={(event) => changeInputArticle(event.target.value)}
                value={inputArticle}
              />
              <button className="search__form--button" onClick={(e) => onSearch(e)}>
                Пошук
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="information">
        <div className="container">
          <div className="information__body">
            <div className="information__title">
              <h2>Автомобільний транспорт</h2>
            </div>
            <div className="information__text">
              <p>
                Автомобіль винайшли ще в кінці дев'ятнадцятого століття і більш ста років даний
                транспортний засіб вдосконалювався, оснащуючись кращими технологічними досягненнями.
                З роками доступність і комфортність привели чотириколісний легковий транспорт до
                тієї ситуації, яку можна спостерігати зараз. Машини в сучасному світі - це найбільш
                популярний вид транспорту. У нашій країні на кожну тисячу жителів доводиться більше
                двох сотень автомобілів і ця цифра з кожним роком зростає. Природно, що в такій
                ситуації зростає попит на автомобільні деталі, адже машина - річ матеріальна, а тому
                поломки час від часу трапляються.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BrandsSlider />

      <section className="blog">
        <div className="container">
          <div className="blog__body">
            <div className="blog__title">
              <h2>блог</h2>
            </div>
            <div className="blog__items">
              <div className="blog__item">
                <h3 className="blog__item--title">Як злити бензин з бензобаку авто?</h3>
                <p className="blog__item--info">
                  Багато автолюбителів пам'ятають ситуацію, коли після суворого морозу взимку колеса
                  на машині не рухалися. Такі речі не завжди помічали. Водій міг ...
                </p>
                <a
                  rel="noreferrer"
                  href="https://amastercar.ru/blog/slivaem_benzin_s_avto.html"
                  className="blog__item--link"
                  target="_blank">
                  Читати повністю
                </a>
              </div>

              <div className="blog__item">
                <h3 className="blog__item--title">Погано гріє пічка в авто - причини</h3>
                <p className="blog__item--info">
                  Всі причини, за якими не гріє пічка в машині, діляться на дві групи: збої в роботі
                  системи опалення, і неполадки охолоджуючої системи. ...
                </p>
                <a
                  rel="noreferrer"
                  href="https://unit-car.com/diagnostika-i-remont/204-ploho-greet-pechka-v-mashine.html"
                  className="blog__item--link"
                  target="_blank">
                  Читати повністю
                </a>
              </div>

              <div className="blog__item">
                <h3 className="blog__item--title">Утеплюємо акумулятор автомобіля до зими</h3>
                <p className="blog__item--info">
                  Холод сприяє прискореної розрядці акумулятора в машині. Тому взимку зранку можна
                  побачити, як люди безуспішно намагаються завести авто, всю ніч ...
                </p>
                <a
                  rel="noreferrer"
                  href="https://amastercar.ru/blog/termo-akb.html"
                  className="blog__item--link"
                  target="_blank">
                  Читати повністю
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewItems newItems={items} />

      <section className="information">
        <div className="container">
          <div className="information__body">
            <div className="information__title">
              <h2>Безпека в мережі</h2>
            </div>
            <div className="information__text">
              <p>
                Раніше про інтернет-магазинах в Україні, де можна замовляти онлайн запчастини для
                авто, мало хто чув. Такі сайти не користувалися популярністю, тому що люди ще не
                звикли до інтернету і до його можливостей та гарантій. І не дивно, адже ще недавно
                безпеку залишалася головним питанням при покупках за допомогою мережі. але тепер,
                коли системи безпеки різних сайтів вдосконалилися, такі проблеми залишилися позаду.
                Звичайно, це не означає, що варто забути про обережність, але ймовірність
                наштовхнутися на ошуканців куди менше. Адже, якщо користувач став жертвою нечесного
                продавця, він завжди може залишити відгук про те, у кого проводилася покупка, або ж
                поскаржитися адміністрації сайту. Не факт, що гроші повернутися до користувача, але
                це дозволить застерегти інших користувачів від подібної помилки
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="service">
        <div className="container">
          <div className="service__body">
            <div className="service__items">
              <div className="service__item">
                <div className="service__item--logo">
                  <picture>
                    <source srcSet={truckWebp} type="image/webp" />
                    <img src={truckPng} alt="truck" />
                  </picture>
                </div>
                <div className="service__item--info">
                  <h3 className="service__item--title">Доставка по Україні</h3>
                  <p className="service__item--text">Нова Пошта, Justin, Meest Express</p>
                </div>
              </div>

              <div className="service__item">
                <div className="service__item--logo">
                  <picture>
                    <source srcSet={updateWebp} type="image/webp" />
                    <img src={updatePng} alt="update" />
                  </picture>
                </div>
                <div className="service__item--info">
                  <h3 className="service__item--title">Гарантия повернення</h3>
                  <p className="service__item--text">14 днів після замовлення</p>
                </div>
              </div>
            </div>

            <div className="service__items">
              <div className="service__item">
                <div className="service__item--logo">
                  <picture>
                    <source srcSet={headPhonesWebp} type="image/webp" />
                    <img src={headPhonesPng} alt="headphones" />
                  </picture>
                </div>
                <div className="service__item--info">
                  <h3 className="service__item--title">Підбір запчастин</h3>
                  <p className="service__item--text">Для будь-якої моделі авто</p>
                </div>
              </div>

              <div className="service__item">
                <div className="service__item--logo">
                  <picture>
                    <source srcSet={giftWebp} type="image/webp" />
                    <img src={giftPng} alt="gift" />
                  </picture>
                </div>
                <div className="service__item--info">
                  <h3 className="service__item--title">Подарунки клієнтам</h3>
                  <p className="service__item--text">Призи та знижки для постійних клієнтів.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
