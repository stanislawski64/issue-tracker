import { useEffect } from 'react';
import Aux from './Auxiliary';
import ToolbarButton from './ToolbarButton';
import { ReactComponent as MenuIcon } from './MenuIcon.svg';
import { ReactComponent as AccountIcon } from './AccountIcon.svg';
import { ReactComponent as NightModeIcon } from './NightModeIcon.svg';

function ToolbarButtons({ toggleSideMenu, toggleNightMode, setOpen }) {
  useEffect(() => {
    const buttons = document
      .getElementById('Toolbar')
      .querySelectorAll('.ToolbarButton');
    buttons.forEach((button) => {
      button.addEventListener('mousedown', () => {
        let rippleParent = document.createElement('span');
        let rippleChild = document.createElement('span');
        rippleParent.classList.add('ripple-parent');
        rippleParent.classList.add('ripple-parent-enter');
        rippleChild.classList.add('ripple-child');
        rippleParent.appendChild(rippleChild);
        button.appendChild(rippleParent);
        button.addEventListener('mouseleave', Exit);
        button.addEventListener('mouseup', Exit);
        function Exit() {
          rippleChild.classList.add('ripple-child-exit');
          rippleChild.addEventListener('animationend', () => {
            rippleParent.remove();
          });
        }
      });
    });
  }, []);

  const ToolbarButtonsArray = [
    {
      onClick: () => toggleSideMenu(),
      id: 'MenuButton',
      className: 'ToolbarButton',
      icon: MenuIcon,
    },
    {
      onClick: () => toggleNightMode(),
      id: 'NightModeButton',
      className: 'ToolbarButton',
      icon: NightModeIcon,
    },
    {
      onClick: () => setOpen(true),
      id: 'AccountButton',
      className: 'ToolbarButton',
      icon: AccountIcon,
    },
  ];

  const ToolbarButtons = ToolbarButtonsArray.map((item) => (
    <ToolbarButton
      key={item.id}
      onClick={item.onClick}
      id={item.id}
      className={item.className}
    >
      <item.icon fill="white" />
    </ToolbarButton>
  ));

  return <Aux>{ToolbarButtons}</Aux>;
}

export default ToolbarButtons;
