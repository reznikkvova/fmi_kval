import React, {useState} from 'react';
import AdminCreateTire from "./AdminCreateTire";
import AdminListTire from "./AdminListTire";
import clsx from "clsx";
import AdminCreateBrand from "./AdminCreateBrand";

export default function AdminPanel() {
    const [tab, setTab] = useState(0);
    const handleSetTab = (index) => {
        setTab(index);
    }

    return (
        <main className="admin-panel">
            <div className="admin-tabs">
                <div className={clsx("admin-tab", tab === 0 ? 'active' : '')} onClick={() => handleSetTab(0)}>Список товарів</div>
                <div className={clsx("admin-tab", tab === 1 ? 'active' : '')} onClick={() => handleSetTab(1)}>Створення товару</div>
                <div className={clsx("admin-tab", tab === 2 ? 'active' : '')} onClick={() => handleSetTab(2)}>Створення виробника</div>
            </div>
            {tab === 0 ?
                <AdminListTire/>
            : ''}
            {tab === 1 ?
                <AdminCreateTire/>
                : ''}
            {tab === 2 ?
                <AdminCreateBrand/>
                : ''}
        </main>

    )
}