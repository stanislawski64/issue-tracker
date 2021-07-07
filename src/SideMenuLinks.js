import SideMenuLink from './SideMenuLink';
import { ReactComponent as BoardIcon } from './BoardIcon.svg';
import { ReactComponent as BacklogIcon } from './BacklogIcon.svg';
import { ReactComponent as SettingsIcon } from './SettingsIcon.svg';
import { useLocation } from 'react-router-dom';

function SideMenuLinks() {
  const location = useLocation();

  const SideMenuLinksArray = [
    { pathname: '/backlog', icon: BacklogIcon, name: 'Backlog' },
    { pathname: '/board', icon: BoardIcon, name: 'Board' },
    { pathname: '/settings', icon: SettingsIcon, name: 'Settings' },
  ];

  const SideMenuLinks = SideMenuLinksArray.map((item) => (
    <SideMenuLink
      key={item.name}
      currentPathname={location.pathname}
      linkPathname={item.pathname}
      name={item.name}
    >
      <item.icon
        alt={item.name}
        className={
          location.pathname === item.pathname
            ? 'SideMenuIconActive'
            : 'SideMenuIcon'
        }
      />
    </SideMenuLink>
  ));

  return <>{SideMenuLinks}</>;
}

export default SideMenuLinks;
