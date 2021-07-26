import SideMenuLinks from './SideMenuLinks';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function SideMenu(props, ref) {
  const location = useLocation();

  return (
    <nav className="SideMenu" id="SideMenu" ref={ref}>
      <div className="SiteNameDiv">
        <Link
          to="/"
          className={
            'SiteName ' + (location.pathname === '/' && 'SideMenuSpanActive')
          }
        >
          GIRA
        </Link>
      </div>
      <hr className="Divider" />
      <SideMenuLinks />
    </nav>
  );
}

export default React.forwardRef(SideMenu);
