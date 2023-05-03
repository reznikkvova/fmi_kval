import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export default function Account() {

    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push('/login');
    };

    useEffect(() => {
        return () => {
            console.log(auth)
        };
    }, []);

    return (
        <section className='account-page'>
            <button onClick={logoutHandler}>logout</button>
        </section>
    )
}