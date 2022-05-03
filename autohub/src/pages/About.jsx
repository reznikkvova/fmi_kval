import React, { useEffect } from 'react';
import { BreadCrumbs } from '../components';
import { useDispatch } from 'react-redux';
import { setCategory } from '../redux/actions/header-categories';

export default function About() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCategory(2));
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <BreadCrumbs />
      <section className="about">
        <div className="container">
          <div className="about__body">
            <div className="about__title">
              <h2>Про нас</h2>
            </div>
            <div className="about__info">
              <p>
                Сайт компанії представляє не тільки найширший спектр автомобільних товарів -
                запчастини для всіх вузлів і всіх марок автомобілів, моторні масла, автохімію та
                аксесуари, але і містить найбільший каталог підбору запчастин, як по марці
                автомобіля, так і найбільш точний підбір по VIN-коду автомобіля. За десять років
                роботи сайт компанії став одним з найбільш відвідуваних українських запчастних
                ресурсів. У команді AutoHub працюють фахівці автомобільного ринку з великим досвідом
                роботи в дистриб'юторських компаніях, на СТО і роздрібних магазинах по продажу
                автозапчастин.
              </p>
            </div>
            <div className="about__lists">
              <div className="about__lists--title">
                <h3>
                  нтернет-магазин AutoHub - гіпермаркет автомобільних товарів. сайт допоможе
                  підібрати і купити запчастини і моторні масла для вашого автомобіля:
                </h3>
              </div>
              <ul className="about__lists--list first--list">
                <li className="about__lists--item">
                  Автозапчастини для всіх марок легкових автомобілів. У нашому асортименті Ви
                  знайдете все - від амортизаторів підвіски, акумуляторів, фільтрів до комплекту
                  зчеплення, поршнів двигуна і деталей рульового управління.
                </li>
                <li className="about__lists--item">
                  Масла моторні, масла трансмісійні, антифризи, гальмівні рідини. В каталозі на
                  сайті Ви зможете зручно підібрати за параметрами і вигідно купити масло моторне,
                  мастило і всі типи технічних рідин для автомобіля, підібрати якісну автохімію.
                </li>
                <li className="about__lists--item">
                  Товари, необхідні для технічного обслуговування (ТО) автомобіля. фільтри,
                  гальмівні колодки, двірники і свічки запалювання - в цьому розділі знайдеться все,
                  що часто вимагає заміни під час ТО.
                </li>
              </ul>
            </div>
            <div className="about__lists">
              <div className="about__lists--title">
                <h3>Ваші переваги роботи з AutoHub:</h3>
              </div>
              <ul className="about__lists--list second--list">
                <li className="about__lists--item">Ми не накручуємо ціни!</li>
                <li className="about__lists--item">
                  Ми не намагаємося продати клієнтові не потрібну йому автозапчастин!
                </li>
                <li className="about__lists--item">
                  Ми намагаємося зробити ВСЕ МОЖЛИВЕ для захисту наших Клієнтів від покупки
                  підроблених і неякісних запчастин, якими сьогодні просто завалений ринок України.
                </li>
                <li className="about__lists--item">
                  Компанія має сертифікати якості на всю продукцію.
                </li>
                <li className="about__lists--item">
                  Своєчасна і максимально швидка відправка в регіони «день в день».
                </li>
                <li className="about__lists--item">
                  Можливість індивідуального підходу і гнучких умов роботи з кожним клієнтом.
                </li>
                <li className="about__lists--item">Передові технології в інтернетe!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
