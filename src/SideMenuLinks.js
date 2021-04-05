import { useEffect } from 'react';
import SideMenuLink from './SideMenuLink';
import { ReactComponent as BoardIcon } from './BoardIcon.svg';
import { ReactComponent as BacklogIcon } from './BacklogIcon.svg';
import { ReactComponent as SettingsIcon } from './SettingsIcon.svg';
import { useLocation } from 'react-router-dom';
import Aux from './Auxiliary';

function SideMenuLinks() {
  useEffect(() => {
    const links = document
      .getElementById('SideMenu')
      .querySelectorAll('.ripple-span');
    links.forEach((link) => {
      link.addEventListener('mousedown', (event) => {
        let rippleParent = document.createElement('span');
        let x = event.clientX - link.getBoundingClientRect().left;
        let y = event.clientY - link.getBoundingClientRect().top;
        const r = Math.sqrt(
          Math.pow(Math.abs(x - 120) + 120, 2) +
            Math.pow(Math.abs(y - 24) + 24, 2),
        );
        rippleParent.style.height = 2 * r + 'px';
        rippleParent.style.width = 2 * r + 'px';
        rippleParent.style.left = x - r + 'px';
        rippleParent.style.top = y - r + 'px';
        let rippleChild = document.createElement('span');
        rippleParent.classList.add('ripple-parent');
        rippleParent.classList.add('ripple-parent-enter');
        rippleChild.classList.add('ripple-child');
        rippleChild.classList.add('ripple-child-side-menu-link');
        rippleParent.appendChild(rippleChild);
        link.appendChild(rippleParent);
        link.addEventListener('mouseleave', Exit);
        link.addEventListener('mouseup', Exit);
        link.addEventListener('dragleave', Exit);
        function Exit() {
          rippleChild.classList.add('ripple-child-exit');
          rippleChild.addEventListener('animationend', () => {
            rippleParent.remove();
          });
        }
      });
    });
  }, []);

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

  return <Aux>{SideMenuLinks}</Aux>;
}

export default SideMenuLinks;
