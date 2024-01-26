import { createContext, useContext, useState } from 'react';

import { googleLogout } from '@react-oauth/google';
import axios from 'axios';

import { USER_ROUTES } from '@/constants/routes';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const {
    storedValue: user,
    setValue: setUser,
    removeValue: removeUser,
  } = useLocalStorage('user', {});
  const navigate = useNavigate();
  const [authError, setAuthError] = useState({});
  const {
    storedValue: isAuthenticated,
    setValue: setIsAuthenticated,
    removeValue: removeIsAuthenticated,
  } = useLocalStorage('isAuthenticated', false);

  const API_BASE_URL = 'http://localhost:8080/api/v1/auth';
  const API_BASE_URL_DEPLOY = 'http://t-ubuntu02.qi.local:31934/api/v1/auth';

  const login = async (credentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const tokenId = credentialResponse.credential;

        const authResponse = await authenticateWithGoogle(tokenId);

        saveUserInfo(authResponse);

        return true;
      }
    } catch (error) {
      setAuthError('No puede acceder a este sitio');
    }
  };

  const authenticateWithGoogle = async (tokenId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/google?tokenId=${tokenId}`);
      return response.data;
    } catch (error) {
      console.error('Authentication API Error:', error.message);
      throw new Error(error.message);
    }
  };

  const saveUserInfo = (authResponse) => {
    if (authResponse != null) {
      if (authResponse.role === 'ADMIN') {
        const { token } = authResponse;
        localStorage.setItem('token', token);
        setUser(authResponse);
        setIsAuthenticated(true);
      }
    }
  };

  // Cierra la sesión y elimina la información del usuario del estado.
  const logout = async () => {
    if (user) {
      await axios.post(`${API_BASE_URL}/logout`);
      googleLogout();
      localStorage.clear();
      removeUser();
      removeIsAuthenticated(false);
      navigate(USER_ROUTES.HOME);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, authError, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
