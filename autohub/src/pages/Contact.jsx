import React, { useEffect, useState } from 'react';
import { BreadCrumbs } from '../components';
import { useDispatch } from 'react-redux';
import { setCategory } from '../redux/actions/header-categories';

export default function Contact() {
  const dispatch = useDispatch();
  const [inputName, changeInputName] = useState('');
  const [inputPhone, changeInputPhone] = useState('');
  const [inputEmail, changeInputEmail] = useState('');
  const [inputTheme, changeInputTheme] = useState('');
  const [inputText, changeInputText] = useState('');
  useEffect(() => {
    dispatch(setCategory(3));
    // eslint-disable-next-line
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    alert(
      `Шановний ${inputName}, дякуємо Вам за зворотній зв'язок. Ваше повідомлення за темою ${inputTheme},
  буде опрацьовано найближчим часом.
  Очікуйте відповідь на email ${inputEmail}`,
    );
  };
  return (
    <main>
      <BreadCrumbs />
      <section className="contact">
        <div className="container">
          <div className="contact__body">
            <div className="contact__title">
              <h2>Звязатись з нами</h2>
            </div>
            <div className="contact__descr">
              <p>
                Якщо у вас є питання іншого характеру, будь ласка, заповніть наступну форму, щоб
                зв'язатися з нами.
              </p>
              <p>Дякуємо.</p>
            </div>
            <div className="contact__wrapper">
              <form action="server.php" className="contact__form">
                <div className="contact__form--input">
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="Ім'я"
                    onChange={(event) => changeInputName(event.target.value)}
                    value={inputName}
                  />
                </div>

                <div className="contact__form--input">
                  <input
                    type="text"
                    id="contact-phone"
                    placeholder="Телефон"
                    onChange={(event) => changeInputPhone(event.target.value)}
                    value={inputPhone}
                  />
                </div>

                <div className="contact__form--input">
                  <input
                    type="text"
                    id="contact-theme"
                    placeholder="Тема"
                    onChange={(event) => changeInputTheme(event.target.value)}
                    value={inputTheme}
                  />
                </div>

                <div className="contact__form--input">
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="E-mail"
                    onChange={(event) => changeInputEmail(event.target.value)}
                    value={inputEmail}
                  />
                </div>
                <div className="contact__form--input textarea--input">
                  <input
                    type="text"
                    id="textarea"
                    placeholder="Повідомлення"
                    onChange={(event) => changeInputText(event.target.value)}
                    value={inputText}
                  />
                </div>
                <div className="contact__form--button">
                  <button onClick={(event) => onSubmit(event)}>Надіслати повідомлення </button>
                </div>
              </form>

              <div className="contact__contacts">
                <div className="contact__contacts--adress">
                  <i className="fas fa-map-marker-alt"></i>
                  <span> Адреса</span>
                  <p>м. Чернівці</p>
                  <p>вул. Чорноморська 4а</p>
                </div>

                <div className="contact__contacts--phones">
                  <i className="fas fa-phone-alt"></i> <span>Телефони</span>
                  <br />
                  <a href="tel:+380973155050">
                    + 38 097 315 50 50 <i className="fab fa-telegram"></i>
                    <i className="fab fa-viber"></i>
                  </a>
                  <br />
                  <a href="tel:+380973155050">
                    + 38 093 315 50 50 <i className="fab fa-telegram"></i>
                    <i className="fab fa-viber"></i>
                  </a>
                </div>
                <div className="contact__contacts--email">
                  <i className="fab fa-telegram-plane"></i> <span>Електронна пошта</span>
                  <br />
                  <a href="info@autohub.com">info@autohub.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
