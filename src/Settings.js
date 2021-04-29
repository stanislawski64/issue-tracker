import { useAuth } from './auth-context';

function Settings() {
  const auth = useAuth()
  console.log("auth = useAuth()", auth);
  return <main className="MainContent">SETTINGS</main>;
}

export default Settings;
