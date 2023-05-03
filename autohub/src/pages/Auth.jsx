import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import 'materialize-css';
import {useHistory} from "react-router-dom";

export default function AuthPage() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    if(error !== null) {
      alert(error);
    }
    clearError();
  }, [error, message, clearError]);
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      if(data.message !== null) {
        alert(data.message);
      }
      const _data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(_data.token, _data.userId);
      history.push('/');
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
      history.push('/');
    } catch (e) {}
  };
  return (
    <main className="row">
      <div className="col s6 offset-s3 auth-wrapper">
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Ваш Email"
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
                  placeholder="Ваш пароль"
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" onClick={loginHandler} disabled={loading}>
              Увійти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}>
              Зареєструватись
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
