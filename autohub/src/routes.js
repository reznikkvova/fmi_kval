import React, {useState} from 'react';
import { Switch, Redirect, Route } from 'react-router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import AuthPage from './pages/Auth';
import Account from "./pages/Account";
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminUpdateTire from "./pages/Admin/AdminUpdateTire";

export const useRoutes = (isAuthenticated, isAdmin) => {
    return (
      <Switch>
        <>
          <Header isAdmin={isAdmin}/>
          <div className="content">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/tires">
              <Shop />
            </Route>
            <Route exact path="/about-us">
              <About />
            </Route>
            <Route exact path="/contacts">
              <Contact />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
              <Route path="/login" exact>
                  <AuthPage />
              </Route>
              <Route exact path='/account'>
                  {!isAuthenticated ? <Redirect to="/login" /> : <Account/> }
              </Route>
            <Route exact path='/admin'>
             {/*{isAdmin ? <AdminPanel/> : <Redirect to="/"/> }*/}
              <AdminPanel/>
            </Route>
            <Route exact path='/admin/edit/:id'>
             {/*{isAdmin ? <AdminPanel/> : <Redirect to="/"/> }*/}
              <AdminUpdateTire/>
            </Route>
          </div>
          <Footer />
        </>
      </Switch>
    );
};
