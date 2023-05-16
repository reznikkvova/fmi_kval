import React, { useEffect, useState } from 'react';
import { BreadCrumbs } from '../components';
import sendMessage from "../utils/sendTG";


export default function Contact() {
  const [inputName, changeInputName] = useState('');
  const [inputPhone, changeInputPhone] = useState('');
  const [inputEmail, changeInputEmail] = useState('');
  const [inputTheme, changeInputTheme] = useState('');
  const [inputText, changeInputText] = useState('');


  const onSubmit = (event) => {
    event.preventDefault();
    const d = new Date();

    sendMessage(`** Повідомлення з сайту **\n\nІм'я: ${inputName}\nТема: ${inputTheme}\nПошта: ${inputEmail}\nТелефон: ${inputPhone}\nОпис: ${inputText}\n Залишено об: ${d.getDate()}.0${d.getMonth()+1}.${d.getFullYear()}----${d.getHours()}:${d.getMinutes()}\n\n`);
  };
  return (
    <main>
      <BreadCrumbs crumbs={[{route: '/contacts', label: 'Контакти'}]}/>
      <section className="contact">
        <div className="container">
          <div className="contact__body">
            <div className="contact__title">
              <h2>Звязатись з нами</h2>
            </div>
            <div className="contact__descr">
              <p>
                Якщо у вас є питання, будь ласка, заповніть наступну форму, щоб
                зв'язатися з нами.
              </p>
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
                  <textarea
                    id="textarea"
                    placeholder="Повідомлення"
                    onChange={(event) => changeInputText(event.target.value)}
                    value={inputText}
                  ></textarea>
                </div>
                <div className="contact__form--button">
                  <button onClick={(event) => onSubmit(event)}>Надіслати</button>
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
                  <a href="tel:+380662163639">
                    + 38 066 216 36 39 <i className="fab fa-telegram"></i>
                    <i className="fab fa-viber"></i>
                  </a>
                  <br />
                  <a href="tel:+380502507676">
                    + 38 050 250 76 76 <i className="fab fa-telegram"></i>
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
