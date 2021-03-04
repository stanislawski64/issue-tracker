import { ReactComponent as BoardIcon } from './BoardIcon.svg';
import { ReactComponent as BacklogIcon } from './BacklogIcon.svg';
import { ReactComponent as SettingsIcon } from './SettingsIcon.svg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function SideMenu() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav className="SideMenu">
      <div className="SiteNameDiv">
        <Link
          to="/"
          className="SiteName"
          style={
            location.pathname === '/' ? { color: '#0052cc' } : { color: null }
          }
        >
          𝔊ℑℜ𝔄
        </Link>
      </div>
      <hr className="Divider" />
      <div className="SideMenuDiv">
        <Link
          to="/backlog"
          className="SideMenuLink"
          style={
            location.pathname === '/backlog'
              ? { backgroundColor: 'rgba(0,0,0,0.08)' }
              : { backgroundColor: null }
          }
        >
          <div className="SideMenuIconContainer">
            <BoardIcon
              alt="Backlog"
              style={
                location.pathname === '/backlog'
                  ? { fill: '#0052cc' }
                  : { fill: 'black' }
              }
            />
          </div>
          <span
            className="SideMenuSpan"
            style={
              location.pathname === '/backlog'
                ? { color: '#0052cc' }
                : { color: 'black' }
            }
          >
            Backlog
          </span>
        </Link>
      </div>
      <div className="SideMenuDiv">
        <Link
          to="/board"
          className="SideMenuLink"
          style={
            location.pathname === '/board'
              ? { backgroundColor: 'rgba(0,0,0,0.08)' }
              : { backgroundColor: null }
          }
        >
          <div className="SideMenuIconContainer">
            <BacklogIcon
              alt="Board"
              style={
                location.pathname === '/board'
                  ? { fill: '#0052cc' }
                  : { fill: 'black' }
              }
            />
          </div>
          <span
            className="SideMenuSpan"
            style={
              location.pathname === '/board'
                ? { color: '#0052cc' }
                : { color: 'black' }
            }
          >
            Board
          </span>
        </Link>
      </div>
      <div className="SideMenuDiv">
        <Link
          to="/settings"
          className="SideMenuLink"
          style={
            location.pathname === '/settings'
              ? { backgroundColor: 'rgba(0,0,0,0.08)' }
              : { backgroundColor: null }
          }
        >
          <div className="SideMenuIconContainer">
            <SettingsIcon
              alt="Settings"
              style={
                location.pathname === '/settings'
                  ? { fill: '#0052cc' }
                  : { fill: 'black' }
              }
            />
          </div>
          <span
            className="SideMenuSpan"
            style={
              location.pathname === '/settings'
                ? { color: '#0052cc' }
                : { color: 'black' }
            }
          >
            Settings
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default SideMenu;
