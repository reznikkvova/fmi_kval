import React, {useEffect, useState} from 'react';
import Axios from 'axios';

import noImage from '../../assets/img/no_img.jpg'
import Select from 'react-select'

import {diameter, width, height, season, speedIndex, construction} from '../../variables';
import {useParams} from "react-router-dom";
import { useHistory } from 'react-router-dom';

export default function AdminUpdateTire() {

    const { id } = useParams()
    const history = useHistory();

    const [form, setForm] = useState({
        id: '',
        brand: '',
        diameter: '',
        width: '',
        height: '',
        construction: '',
        speedIndex: '',
        countAvailable: '',
        season: '',
        image: null,
        price: '',
        year: ''
    });

    const [brands, setBrands] = useState([]);


    const changeHandler = (event) => {
        if(event.target.name === 'image') {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                setForm({ ...form, [event.target.name]: reader.result });
            }
            reader.onerror = error => {
                console.log(error);
            }

        } else {
            setForm({ ...form, [event.target.name]: event.target.value });
        }
    };

    const onUpdateTire =  () => {
        Axios.put(`/api/tire-crud/update/${id}`,{...form}).then((response) => {
            alert(response.data.message);
            history.push('/admin');
        }, (error) => {
            alert(error.data.message);
        });
    }

    const changeHandlerSelect = (res, item) => {
        let formCopy = Object.assign({}, form);
        formCopy[item.name] = res.value;
        setForm(formCopy);
    }

    useEffect(() => {
        Axios.get(`/api/tire-crud/get/${id}`).then((response) => {
           const fields = response.data.data;
           setForm({
                id: fields.id,
                brand: fields.brand,
                diameter: fields.diameter,
                width: fields.width,
                height: fields.height,
                construction: fields.construction,
                speedIndex: fields.speedIndex,
                countAvailable: fields.countAvailable,
                season: fields.season,
                image: fields.image,
                price: fields.price,
                year: fields.year
            });
        });
        Axios.get('/api/brand-crud/get-items').then((response) => {
            const api = response.data.data.map(item => {
                return {
                    label: item.name,
                    value: item.name
                };
            });

            setBrands(api);
        });
    }, []);


    return (
        <main className="admin-panel">
        <div className="admin-menu admin-create">
            <h1 className='admin-menu-title'>Додати новий товар</h1>

            <div className="admin-menu-form admin-create-form">
                <label htmlFor="image" className='admin-menu-label admin-image-label'>
                    Image:
                    <input type="file" id='image' name='image' accept='image/*' onChange={changeHandler}/>
                    <img src={form.image !== '' && form.image !== null ? form.image : noImage} alt=""/>
                </label>
                <label htmlFor="brand" className='admin-menu-label'>
                    Виробник:
                    <Select value={{label: form.brand, value: form.brand}} options={brands} name={'brand'}  placeholder={'Виробник'} onChange={changeHandlerSelect}/>
                </label>
                <label htmlFor="diameter" className='admin-menu-label'>
                    Діаметр:
                    <Select value={{label: form.diameter, value: form.diameter}} options={diameter} name={'diameter'}  placeholder={'Діаметр'} onChange={changeHandlerSelect}/>
                </label>
                <label htmlFor="width" className='admin-menu-label'>
                    Ширина профілю:
                    <Select value={{label: form.width, value: form.width}} options={width} name={'width'}  placeholder={'Ширина профілю'} onChange={changeHandlerSelect}/>
                </label>
                <label htmlFor="height" className='admin-menu-label'>
                    Висота профілю:
                    <Select value={{label: form.height, value: form.height}} options={height} name={'height'}  placeholder={'Висота профілю'} onChange={changeHandlerSelect}/>
                </label>
                <label htmlFor="construction" className='admin-menu-label'>
                    Тип конструкції:
                    <Select value={{label: form.construction, value: form.construction}} options={construction} name={'construction'}  placeholder={'Тип конструкції'} onChange={changeHandlerSelect}/>
                </label>
                <label htmlFor="speedIndex" className='admin-menu-label'>
                    Індекс швидкості:
                    <Select value={{label: form.speedIndex, value: form.speedIndex}} options={speedIndex} name={'speedIndex'}  placeholder={'Індекс швидкості'} onChange={changeHandlerSelect}/>
                </label>
                <label htmlFor="countAvailable" className='admin-menu-label'>
                    Кількість в наявності
                    <input type="text" value={form.countAvailable} id='countAvailable' name='countAvailable' placeholder='Кількість в наявності' onChange={changeHandler}/>
                </label>
                <label htmlFor="season" className='admin-menu-label'>
                    Сезонність:
                    <Select value={{label: form.season, value: form.season}} options={season} name={'season'}  placeholder={'Сезонність'} onChange={changeHandlerSelect}/>
                </label>
                <label htmlFor="year" className='admin-menu-label'>
                    Рік виробництва:
                    <input type="number" value={form.year} id='year' name='year' placeholder='Рік виробництва' onChange={changeHandler}/>
                </label>
                <label htmlFor="price" className='admin-menu-label'>
                    Ціна:
                    <input type="number" value={form.price} id='price' name='price' placeholder='Ціна' onChange={changeHandler}/>
                </label>
                <div className="admin-menu-button admin-create-button" onClick={() => onUpdateTire()}> Зберегти </div>
            </div>
        </div>
        </main>
    )
}