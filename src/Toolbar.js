import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ToolbarButtons from './ToolbarButtons';

function Toolbar({ toggleSideMenu }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    let ListenerFunction = (event) => {
      if (!menuRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', ListenerFunction);
    return () => {
      document.removeEventListener('mousedown', ListenerFunction);
    };
  });

  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.addEventListener('transitionend', () => {
      document.documentElement.classList.remove('mode-transition');
    });
  }, []);

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
        <Link to="/login" className="MenuItem">
          Log In
        </Link>
        <Link to="/register" className="MenuItem">
          Register
        </Link>
      </div>
    </header>
  );
}

export default Toolbar;
