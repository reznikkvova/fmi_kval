import React from 'react';
import { useRoutes } from './routes';
import './assets/css/style.min.css';
import './assets/css/admin.css';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

function App() {
  const { token, login, logout, userId, isAdmin } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated, Boolean(isAdmin));

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
        isAdmin: Boolean(isAdmin)
      }}>
      {routes}
    </AuthContext.Provider>
  );
}

export default App;
