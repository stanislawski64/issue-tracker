import ToolbarButtons from './ToolbarButtons';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './auth-context';

function Toolbar({ toggleSideMenu }) {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  const menuRef = useRef();

  useEffect(() => {
    function ListenerFunction(event) {
      if (!menuRef.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener('mousedown', ListenerFunction);
    return () => {
      document.removeEventListener('mousedown', ListenerFunction);
    };
  }, [open]);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const timeout = useRef();

  useEffect(() => {
    function disableTransition() {
      document.documentElement.classList.remove('mode-transition');
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(disableTransition, 750);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleNightMode() {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('mode-transition');
    } else {
      setTheme('light');
      document.documentElement.classList.add('mode-transition');
    }
  }

  return (
    <header className="Toolbar" id="Toolbar">
      <ToolbarButtons
        toggleSideMenu={toggleSideMenu}
        toggleNightMode={toggleNightMode}
        setOpen={setOpen}
      />
      <div
        className="Menu"
        ref={menuRef}
        style={!open ? { display: 'none' } : null}
      >
        {user ? (
          <>
            <div className="MenuItem">Hi, {user.name}</div>
            <Link
              to={{ pathname: '/login', loggedOut: true }}
              className="MenuItem"
              onClick={logout}
            >
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="MenuItem">
              Log In
            </Link>
            <Link to="/register" className="MenuItem">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Toolbar;
