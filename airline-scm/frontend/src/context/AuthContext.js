import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { authService } from '../services/authService';
import { storage } from '../utils/localStorage';

const AuthContext = createContext();

const initialState = {
  user: storage.getUser(),
  token: storage.getToken(),
  isAuthenticated: !!storage.getToken() && !!storage.getUser(),
  loading: !!storage.getToken()
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      storage.setToken(action.payload.token);
      storage.setUser(action.payload.user);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGOUT':
      storage.removeToken();
      storage.removeUser();
      return { ...state, user: null, token: null, isAuthenticated: false, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'RESTORE':
      // Use cached user without hitting API - avoids 401 loops
      return { ...state, isAuthenticated: true, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const token = storage.getToken();
    const cachedUser = storage.getUser();

    if (!token) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    // If we have cached user, restore immediately without API call
    if (cachedUser) {
      dispatch({ type: 'RESTORE' });
      // Then silently verify in background
      authService.getCurrentUser()
        .then(user => dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } }))
        .catch(() => {
          // Token expired - clear and redirect to login
          storage.removeToken();
          storage.removeUser();
          dispatch({ type: 'LOGOUT' });
        });
    } else {
      // No cached user, must verify
      authService.getCurrentUser()
        .then(user => dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } }))
        .catch(() => dispatch({ type: 'LOGOUT' }));
    }
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response });
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response });
    return response;
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};