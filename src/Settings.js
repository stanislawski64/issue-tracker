import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './auth-context';

function Settings() {
  const { user, token } = useAuth();

  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/login', { notLoggedIn: true });
    }
  }, [token, history]);

  console.log('user', user);

  let date = new Date(user.createdAt).toLocaleDateString();

  return (
    <main className="MainContent">
      <div className="SettingsContainer">
        <h1 className="SettingsInfo" style={{ fontSize: '30px' }}>
          User data:
        </h1>
        <p className="SettingsInfo">E-mail: {user.email}</p>
        <p className="SettingsInfo">Username: {user.name}</p>
        <p className="SettingsInfo">Creation Date: {date}</p>
      </div>
    </main>
  );
}

export default Settings;
