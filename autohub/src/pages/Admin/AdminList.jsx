import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import _uniqueId from 'lodash/uniqueId';

import noImage from '../../assets/img/no_img.jpg'

export default function AdminList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
            Axios.get('/api/crud/get-items').then((response) => {
                setItems(response.data);
            })
    }, []);


    return (
        <div className="admin-menu admin-create">
            <h1 className='admin-menu-title'>Список товарів ({items.count})</h1>
            {items && items.count > 0 ?
                <div className="admin-menu-list">
                    {items.data.map(item => (
                        <div className='admin-menu-item'>
                            <div className="admin-menu-item-image">
                                <img src={item.image !== '' && item.image !== null ? item.image : noImage} alt="item.id"/>
                            </div>
                            <div className="admin-menu-item-content">
                                <div className="title">{item.brand} {item.width}/{item.height}/{item.construction}{item.diameter}</div>
                                <div className="speed-index">Індекс швидкості: {item.speedIndex}</div>
                                <div className="season">Сезонність: {item.season}</div>
                            </div>
                        </div>
                    ))}
                </div>
                : ''}
        </div>
    )
}