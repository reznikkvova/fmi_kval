import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import CartItem from './../components/CartItem/index';
import cartEmptyImage from './../assets/img/empty-cart.png';
import Axios from "axios";
import {useAuth} from "../hooks/auth.hook";
import sendMessage from "../utils/sendTG";

export default function Cart({handleRequest}) {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [dollar, setDollar] = useState(37);
    const [totalPrice, setTotalPrice] = useState(0);
    const [update, setUpdate] = useState(false);
    const [modal, setModal] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const [form, setForm] = useState({
        email: '',
        phone: '',
        deliveryCity: '',
        deliveryAddress: ''
    })
    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleUpdate = () => {
        setUpdate(true);
    }

    const { userId } = useAuth();
    const onClearCart = (shouldConfirm = true) => {
        const makeRequest = () => {
            Axios.post('/api/cart/delete-all', {
                userId: userId,
            }).then((response) => {
                setUpdate(true);
                handleRequest();
            });
        }
        if(shouldConfirm) {
            if(window.confirm('Ви впевнені, що хочете видалити всі товари з корзини?')) {
                makeRequest();
            }
        } else {
            makeRequest();
        }
    };

    const onRemoveItem = (id) => {
        if(window.confirm('Ви впевнені, що хочете видалити цей товар?')) {
            Axios.post('/api/cart/delete', {
                userId: userId,
                productId: id
            }).then((response) => {
                setUpdate(true);
                handleRequest();
            });
        }
    };

    const handleOpenModalOrder = () => {
        setModal(true);
    };
    const handleCloseModalOrder = (e) => {
        if(e.target.className === 'order-modal') {
            setModal(false);
        }
    };

    const handleOrder = () => {
        const d = new Date();
        let orderedItems = [];

        items.forEach(item => {
            orderedItems.push({
                article: item.article,
                quantity: cart.products.find(_item => _item.productId == item.id).quantity
            })
        });
        sendMessage(`** Замовлення з сайту **\n\nEmail: ${form.email}\nНомер телефону: ${form.phone}\nМісто доставки: ${form.deliveryCity}\nАдреса доставки: ${form.deliveryAddress}\nАртиклі та кількість:\n\n ${orderedItems.map(item => `${item.article} - ${item.quantity}`).join(', ')}\n\n Залишено об: ${d.getDate()}.0${d.getMonth()+1}.${d.getFullYear()}----${d.getHours()}:${d.getMinutes()}\n\n`);
        setModal(false);
        onClearCart(false);

    }

    useEffect(() => {
        if(userId !== null) {
            Axios.get('/api/cart/get-items', {
                params: {
                    userId: userId
                }
            }).then((response) => {
                const _cart = response.data.cart;
                const _items = response.data.items
                setCart(_cart);
                setItems(_items);


                if(_cart.products.length > 0 ) {
                    let sum = 0;
                    _cart.products.forEach(item => {

                        sum += Number(item.price) * Number(item.quantity);
                    })
                    setTotalPrice(sum);
                }
            });

            Axios.get('/api/user-crud/get-user', {
                params: {
                    userId: userId
                }
            }).then((response) => {
                const { email, phone, deliveryCity, deliveryAddress } = response.data.user;

                setForm({
                    email,
                    phone,
                    deliveryCity,
                    deliveryAddress
                })
            });
        }
    }, [userId]);

    useEffect(() => {
        if(update && userId !== null) {
            setUpdate(false);

            Axios.get('/api/cart/get-items', {
                params: {
                    userId: userId
                }
            }).then((response) => {
                const _cart = response.data.cart;
                const _items = response.data.items
                setCart(_cart);
                setItems(_items);

                if(_cart.products.length > 0 ) {
                    let sum = 0;
                    _cart.products.forEach(item => {
                        sum += Number(item.price) * Number(item.quantity);
                    })
                    setTotalPrice(sum);
                }
            });
        }


    }, [update])

    useEffect(() => {
        Axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then(({ data }) => {
                setDollar(data[24].rate);
            });
    }, [])



    return (
        <>
            {items.length !== 0 ? (
                <div className="cart">

                    {modal ?
                            <div className="order-modal" onClick={(e) => handleCloseModalOrder(e)}>
                                <div className="order-modal-body">
                                    <div className="order-modal-title">Дані доставки</div>
                                    <label htmlFor="email" className='admin-menu-label'>
                                        Email:
                                        <input type="text" disabled={true} value={form.email} id='email' name='email' placeholder='Email' />
                                    </label>
                                    <label htmlFor="phone" className='admin-menu-label'>
                                        Телефон:
                                        <input type="text" value={form.phone} id='phone' name='phone' placeholder='Телефон' onChange={changeHandler}/>
                                    </label>
                                    <label htmlFor="deliveryCity" className='admin-menu-label'>
                                        Місто доставки:
                                        <input type="text" value={form.deliveryCity} id='deliveryCity' name='deliveryCity' placeholder='Місто доставки' onChange={changeHandler}/>
                                    </label>
                                    <label htmlFor="deliveryAddress" className='admin-menu-label'>
                                        Адреса доставки:
                                        <input type="text " value={form.deliveryAddress} id='deliveryAddress' name='deliveryAddress' placeholder='Адреса доставки' onChange={changeHandler}/>
                                    </label>
                                    <div className="admin-menu-button admin-create-button" onClick={() => handleOrder()}> Підтвердити </div>
                                </div>
                            </div>
                        : ''}

                    <div className="container">
                        <div className="cart__top">
                            <h2 className="content__title">
                                Кошик
                            </h2>
                            <div className="cart__clear" onClick={() => onClearCart()}>
                                Очистити кошик
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.5 5H4.16667H17.5"
                                        stroke="#303030"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                                        stroke="#303030"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8.33337 9.16667V14.1667"
                                        stroke="#303030"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M11.6666 9.16667V14.1667"
                                        stroke="#303030"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="content__items">
                            {items.map((obj) => (
                                <CartItem handleUpdate={handleUpdate} userId={userId} key={obj.id} {...obj} quantity={cart.products.find(item => item.productId == obj.id) !== undefined ? cart.products.find(item => item.productId == obj.id).quantity : 0} dollar={dollar} onRemove={onRemoveItem} />
                            ))}
                        </div>
                        <div className="cart__bottom">
                            <div className="cart__bottom-details">
                                <span>
                                    Всього товарів: <b>{cart.products.reduce((total, amount) => total + amount.quantity, 0) } шт.</b>
                                </span>
                                <span>
                                    Сума замовлення: <b>{totalPrice} гривень</b>
                                </span>
                            </div>
                            <div className="cart__bottom-buttons">
                                <Link to="/" className="button button--outline button--add go-back-btn">
                                    <span>Пошук шин</span>
                                </Link>
                                <div onClick={() => handleOpenModalOrder()} className="pay-btn">
                                    <span>Замовити</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container container--cart">
                    <div className="cart cart--empty">
                        <h2>
                            Кошик пустий <i>😕</i>
                        </h2>
                        <p>
                            Ви ще не додали в кошик жодну шину.
                            <br />
                            Щоб обрати товари, перейдіть на сторінку 'Пошук шин'.
                        </p>
                        <img src={cartEmptyImage} alt="Empty cart" />
                        <Link to="/tires" className="button button--black">
                            <span>Перейти до покупок</span>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}