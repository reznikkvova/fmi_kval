import React, { useState, useEffect } from 'react';
import 'materialize-css';
import {useHistory} from "react-router-dom";

const admin = {
    login: 'root',
    password: '1234'
}

export default function AdminLogin({login}) {
    const history = useHistory();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    const loginHandler = async () => {
        if(form.email === admin.login && form.password === admin.password) {
            alert('Auth success')
            localStorage.setItem('isAdmin', 'true');
            login();
            history.push('/admin');
        } else {
            alert('Admin auth error')
        }
    };
    return (
        <main className="row">
            <div className="col s6 offset-s3 auth-wrapper">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизація в адмін панель</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" onClick={loginHandler}>
                            Увійти
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
