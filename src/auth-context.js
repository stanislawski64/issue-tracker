import * as React from 'react';
import * as auth from './auth-provider';
import { useState } from 'react';
import { getToken, getUser } from './auth-provider';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const initialToken = getToken() || '';
  const initialUser = getUser() || '';
  const [token, setToken] = useState(initialToken);

  const [user, setUser] = useState(initialUser);

  const history = useHistory();

  const login = React.useCallback(
    (form) =>
      auth.login(form).then(({ authToken, user }) => {
        setToken(authToken);
        setUser(user);
        history.push('/board');
      }),
    [history],
  );
  const register = React.useCallback(
    (form) =>
      auth.register(form).then((user) => {
        history.push('/board');
      }),
    [history],
  );

  const logout = React.useCallback(() => {
    setToken(null);
    setUser(null);
    auth.logout();
  }, []);

  const value = React.useMemo(
    () => ({ token, login, register, logout, user }),
    [token, login, register, logout, user],
  );

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
