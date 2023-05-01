import React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import AuthPage from './pages/Auth';

export const useRoutes = (isAuthenticated) => {
    return (
      <Switch>
        <>
          <Header />
          <div className="content">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/запчастини">
              <Shop />
            </Route>
            <Route exact path="/про нас">
              <About />
            </Route>
            <Route exact path="/контакти">
              <Contact />
            </Route>
            <Route exact path="/корзина">
              <Cart />
            </Route>
              <Route path="/login" exact>
                  <AuthPage />
              </Route>
          </div>
          <Footer />
        </>
      </Switch>
    );
};
