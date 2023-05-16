import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {useAuth} from "../hooks/auth.hook";

import Axios from "axios";

export default function Account({handleRequest}) {

    const auth = useContext(AuthContext);
    const history = useHistory();
    const {  userId } = useAuth();

    const [form, setForm] = useState({
        userId: userId,
        email: '',
        phone: '',
        deliveryCity: '',
        deliveryAddress: ''
    })
    const handleLogout = () => {
        auth.logout();
        history.push('/login');
        handleRequest();
    };

    const onLoadUserInfo = () => {
        Axios.get('/api/user-crud/get-user', {
            params: {
                userId: userId
            }
        }).then((response) => {
            let _form = Object.assign({}, form);
            const { email, phone, deliveryCity, deliveryAddress } = response.data.user;
            _form.userId = userId;
            _form.email = email;
            _form.phone = phone;
            _form.deliveryCity = deliveryCity;
            _form.deliveryAddress = deliveryAddress;
            setForm(_form);
        });
    }

    const changeHandler = (event) => {
            setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSaveAccountDetails = () => {
        Axios.put(`/api/user-crud/update/${userId}`,{...form}).then((response) => {
            alert(response.data.message);
        }, (error) => {
            alert(error.data.message);
        });
    }

    useEffect(() => {
        if(userId !== null)  {
            onLoadUserInfo();
        }
    }, [userId])


    return (
        <div className="container">
            <div className="admin-menu admin-create account-page">
                <h1 className='admin-menu-title'>Профіль</h1>
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
                <div className="admin-menu-button admin-create-button" onClick={() => handleSaveAccountDetails()}> Зберегти зміни </div>
                <div className="admin-menu-button admin-create-button" onClick={() => handleLogout()}> Вийти з акаунту </div>
            </div>
        </div>
    )
}