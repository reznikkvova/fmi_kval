import React, {useState} from 'react';
import AdminCreate from "./AdminCreate";
import AdminList from "./AdminList";
import clsx from "clsx";

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
            </div>
            {tab === 0 ?
                <AdminList/>
            : ''}
            {tab === 1 ?
                <AdminCreate/>
                : ''}
        </main>

    )
}