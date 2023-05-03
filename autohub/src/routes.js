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
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminPanel from "./pages/Admin/AdminPanel";

export const useRoutes = (isAuthenticated) => {
  const [admin, setAdmin] = useState(false);
  const loginAdmin = () => {
    setAdmin(true);
  }
  const logoutAdmin = () => {
    setAdmin(false);
  }
    return (
      <Switch>
        <>
          <Header isAdmin={admin}/>
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
              {!admin ? <Redirect to="/admin-login"/> : <AdminPanel/>}
            </Route>
            <Route exact path='/admin-login'>
                <AdminLogin login={loginAdmin}/>
            </Route>
          </div>
          <Footer />
        </>
      </Switch>
    );
};
