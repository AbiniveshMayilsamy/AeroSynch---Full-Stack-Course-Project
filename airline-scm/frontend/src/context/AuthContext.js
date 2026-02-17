import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';
import { storage } from '../utils/localStorage';

const AuthContext = createContext();

const initialState = {
  user: storage.getUser(),
  token: storage.getToken(),
  isAuthenticated: !!storage.getToken(),
  loading: true
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
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const user = await authService.getCurrentUser();
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token: state.token }
          });
        } catch (error) {
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadUser();
  }, [state.token]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response
    });
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response
    });
    return response;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};