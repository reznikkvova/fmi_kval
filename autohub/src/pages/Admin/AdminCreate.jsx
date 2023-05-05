import React, {useState} from 'react';
import Axios from 'axios';

import noImage from '../../assets/img/no_img.jpg'

export default function AdminCreate() {

    const [form, setForm] = useState({
        id: Date.now(),
        brand: '',
        diameter: '',
        width: '',
        height: '',
        construction: '',
        speedIndex: '',
        countAvailable: '',
        season: '',
        image: null
    });

    const onResetForm = () => {
        setForm({
            id: Date.now(),
            brand: '',
            diameter: '',
            width: '',
            height: '',
            construction: '',
            speedIndex: '',
            countAvailable: '',
            season: '',
            image: null
        })
    }


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

    const onAddTire =  () => {
        Axios.post('/api/crud/create',{...form});
        onResetForm();
    }

    return (
        <div className="admin-menu admin-create">
            <h1 className='admin-menu-title'>Додати новий товар</h1>

            <div className="admin-menu-form admin-create-form">
                <input type="hidden" name='id' onChange={changeHandler}/>
                <label htmlFor="input-image" className='admin-menu-label admin-image-label'>
                    Image:
                    <input type="file" id='input-image' name='image' accept='image/*' onChange={changeHandler}/>
                    <img src={form.image !== '' && form.image !== null ? form.image : noImage} alt=""/>
                </label>
                <label htmlFor="input-brand" className='admin-menu-label'>
                    Виробник:
                    <input required={true} value={form.brand} type="text" id='brand' name='brand' placeholder='Виробник' onChange={changeHandler}/>
                </label>
                <label htmlFor="input-diameter" className='admin-menu-label'>
                    Діаметр:
                    <input required={true} value={form.diameter} type="text" id='diameter' name='diameter' placeholder='Діаметр' onChange={changeHandler}/>
                </label>
                <label htmlFor="input-width" className='admin-menu-label'>
                    Ширина профілю:
                    <input required={true} value={form.width} type="text" id='width' name='width' placeholder='Ширина профілю' onChange={changeHandler}/>
                </label>
                <label htmlFor="input-height" className='admin-menu-label'>
                    Висота профілю:
                    <input required={true} value={form.height} type="text" id='height' name='height' placeholder='Висота профілю' onChange={changeHandler}/>
                </label>
                <label htmlFor="input-construction" className='admin-menu-label'>
                    Тип конструкції:
                    <input required={true} value={form.construction} type="text" id='construction' name='construction' placeholder='Тип конструкції' onChange={changeHandler}/>
                </label>
                <label htmlFor="input-speedIndex" className='admin-menu-label'>
                    Індекс швидкості:
                    <input required={true} value={form.speedIndex} type="text" id='speedIndex' name='speedIndex' placeholder='Індекс швидкості' onChange={changeHandler}/>
                </label>
                <label htmlFor="input-countAvailable" className='admin-menu-label'>
                    Кількість в наявності
                    <input type="text" value={form.countAvailable} id='countAvailable' name='countAvailable' placeholder='Кількість в наявності' onChange={changeHandler}/>
                </label>
                <label htmlFor="input-season" className='admin-menu-label'>
                    Сезонність:
                    <input type="text" value={form.season} id='season' name='season' placeholder='Сезонність' onChange={changeHandler}/>
                </label>
                <div className="admin-menu-button admin-create-button" onClick={() => onAddTire()}> Додати </div>
            </div>
        </div>
    )
}