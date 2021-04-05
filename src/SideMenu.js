import { Link } from 'react-router-dom';
import SideMenuLinks from './SideMenuLinks';
import { useLocation } from 'react-router-dom';

function SideMenu() {
  const location = useLocation();

  return (
    <nav className="SideMenu" id="SideMenu">
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

export default SideMenu;
