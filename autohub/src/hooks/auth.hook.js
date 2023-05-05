import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback((jwtToken, id, admin) => {
    setToken(jwtToken);
    setUserId(id);
    setIsAdmin(admin);

    localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken, isAdmin: admin }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setIsAdmin(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId, Boolean(data.isAdmin));
    }
  }, [login]);

  return { login, logout, token, userId, isAdmin };
};
