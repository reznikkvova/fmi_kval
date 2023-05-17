import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import _uniqueId from 'lodash/uniqueId';

import noImage from '../../assets/img/no_img.jpg'
import axios from "axios";
import {useHistory} from "react-router-dom";
import clsx from "clsx";


export default function AdminListTire() {
    const history = useHistory();

    const [items, setItems] = useState([]);
    const [update, setUpdate] = useState(false);
    const [dollar, setDollar] = useState(37);
    const [searchValue ,setSearchValue] = useState('');

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    }



    const onLoadItems = () => {
        Axios.get('/api/tire-crud/get-items').then((response) => {
            setItems(response.data);
        });
    }

    const onDeleteItem = (id) => {
            if(window.confirm('Ви впевнені, що хочете видалити товар?')) {
                Axios.delete(`/api/tire-crud/delete/${id}`);
                setUpdate(true);
            }
    }

    const onEditItem = (id) => {
            history.push(`/admin/edit/${id}`)
    }

    useEffect(() => {
        onLoadItems();
        Axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then(({ data }) => {
                setDollar(data[24].rate);
            });
    }, []);

    useEffect(() => {
        if(update) {
            onLoadItems();
            setUpdate(false)
        }
    }, [update]);


    return (
        <div className="admin-menu admin-create">
            <h1 className='admin-menu-title'>Список товарів ({items.count})</h1>
            <input type="text" placeholder='Пошук' className='admin-search-list' onChange={handleChange}/>
            {items && items.count > 0 ?
                <div className="admin-menu-list">
                    {items.data.map(item => (
                        <div className={clsx('admin-menu-item', (
                            item.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
                            item.width.toLowerCase().includes(searchValue.toLowerCase()) ||
                            item.height.toLowerCase().includes(searchValue.toLowerCase()) ||
                            item.diameter.toLowerCase().includes(searchValue.toLowerCase()) ||
                            item.speedIndex.toLowerCase().includes(searchValue.toLowerCase()) ||
                            item.season.toLowerCase().includes(searchValue.toLowerCase()) ||
                            item.price.toLowerCase().includes(searchValue.toLowerCase()) ||
                            item.year.toLowerCase().includes(searchValue.toLowerCase()) ||
                            item.construction.toLowerCase().includes(searchValue.toLowerCase())
                        ) ? '' : 'hidden' )}>
                            <div className="admin-menu-item-image">
                                <img src={item.image !== '' && item.image !== null ? item.image : noImage} alt="item.id"/>
                            </div>
                            <div className="admin-menu-item-content">
                                <div className="title">{item.brand} {item.width}/{item.height}/{item.construction}{item.diameter}</div>
                                <div className="speed-index">Індекс швидкості: {item.speedIndex}</div>
                                <div className="season">Сезонність: {item.season}</div>
                                <div className="year">Рік виробництва: {item.year}</div>
                                <div className="price">Ціна: {item.price} грн / {Math.floor(item.price / dollar)} $</div>
                                <div className="delete-button" onClick={() => onDeleteItem(item._id)}>
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </div>
                                <div className="edit-button" onClick={() => onEditItem(item._id)}>
                                    <i className="fa fa-edit" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                : ''}
        </div>
    )
}