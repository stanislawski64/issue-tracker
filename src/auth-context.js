import * as React from 'react';
import * as auth from './auth-provider';
import { client } from './api-client';
import { useState } from 'react';
import { getToken } from './auth-provider';
import { Redirect } from 'react-router-dom';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const initialToken = getToken() || '';
  const [token, setToken] = useState(initialToken);

  const login = React.useCallback(
    (form) =>
      auth.login(form).then((authToken) => {
        setToken(authToken);
        window.location.href = 'http://localhost:3000/';
        return <Redirect to="/Board" />;
      }),
    [],
  );
  const register = React.useCallback(
    (form) => auth.register(form).then((user) => {}),
    [],
  );

  const logout = React.useCallback(() => {
    auth.logout();
  }, []);

  const value = React.useMemo(() => ({ token, login, register, logout }), [
    token,
    login,
    register,
    logout,
  ]);

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function useClient() {
  const { token } = useAuth();
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token],
  );
}

export { AuthProvider, useAuth, useClient };
