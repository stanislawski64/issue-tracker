import { useState } from 'react';
import { ReactComponent as MenuIcon } from './MenuIcon.svg';
import { ReactComponent as AccountIcon } from './AccountIcon.svg';

function Toolbar({ renderSideMenuButton }) {
  const [open, setOpen] = useState(false);

  const showMenu = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const hide = (e) => {
    if (e && e.relatedTarget) {
      e.relatedTarget.click();
    }
    console.log(e);
    setOpen(false);
  };

  return (
    <header className="Toolbar">
      <button
        id="AccountButton"
        onBlur={(e) => hide(e)}
        onClick={(e) => showMenu(e)}
        className="ToolbarButton"
      >
        <AccountIcon fill="white" />
      </button>
      {renderSideMenuButton && (
        <button id="MenuButton" className="ToolbarButton">
          <MenuIcon fill="white" />
        </button>
      )}

      {open && (
        <div className="Menu">
          <a href="#" className="MenuItem">
            Log In
          </a>
          <a href="#" className="MenuItem">
            Register
          </a>
        </div>
      )}
    </header>
  );
}

export default Toolbar;
