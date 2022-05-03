import React from 'react';
import { useRoutes } from './routes';
import './assets/css/style.min.css';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}>
      {routes}
    </AuthContext.Provider>
  );
}

export default App;
