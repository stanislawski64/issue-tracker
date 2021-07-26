import SideMenuLink from './SideMenuLink';
import { useLocation } from 'react-router-dom';
import { ReactComponent as BoardIcon } from './icons/BoardIcon.svg';
import { ReactComponent as BacklogIcon } from './icons/BacklogIcon.svg';
import { ReactComponent as SettingsIcon } from './icons/SettingsIcon.svg';

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
