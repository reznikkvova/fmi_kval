import React, {useState} from 'react';
import Axios from 'axios';

import noImage from '../../assets/img/no_img.jpg'

export default function AdminCreateBrand() {

    const [form, setForm] = useState({
       id: Date.now(),
       name: '',
       country: ''
    });

    const onResetForm = () => {
        setForm({
            id: Date.now(),
            name: '',
            country: ''
        })
    }


    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const onAddBrand =  () => {
        Axios.post('/api/brand-crud/create',{...form});
        onResetForm();
    }

    return (
        <div className="admin-menu admin-create">
            <h1 className='admin-menu-title'>Додати нового виробника</h1>
            <div className="admin-menu-form admin-create-form">
                <label htmlFor="name" className='admin-menu-label'>
                    Назва виробника:
                    <input required={true} value={form.name} type="text" id='name' name='name' placeholder='Назва виробника' onChange={changeHandler}/>
                </label>
                <label htmlFor="country" className='admin-menu-label'>
                    Країна виробник:
                    <input required={true} value={form.country} type="text" id='country' name='country' placeholder='Країна виробник' onChange={changeHandler}/>
                </label>
                <div className="admin-menu-button admin-create-button" onClick={() => onAddBrand()}> Додати виробника</div>
            </div>
        </div>
    )
}